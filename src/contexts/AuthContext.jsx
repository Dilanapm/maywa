import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, auth, profiles } from '../config/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    getInitialSession()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const getInitialSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setUser(session.user)
      await loadUserProfile(session.user.id)
    }
    setLoading(false)
  }

  const loadUserProfile = async (userId) => {
    const { data, error } = await profiles.getProfile(userId)
    if (data && !error) {
      setProfile(data)
    }
  }

  const signUp = async (email, password, fullName, phone, businessType = 'particular', role = 'cliente') => {
    const { data, error } = role === 'administrador' 
      ? await auth.signUpAdmin(email, password, fullName)
      : await auth.signUpClient(email, password, fullName, phone, businessType)
    
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await auth.signIn(email, password)
    
    if (data?.user && !error) {
      // Cargar perfil del usuario para verificar el rol
      await loadUserProfile(data.user.id)
    }
    
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await auth.signOut()
    if (!error) {
      setUser(null)
      setProfile(null)
    }
    return { error }
  }

  const isAdmin = () => {
    return profile?.role === 'administrador'
  }

  const isClient = () => {
    return profile?.role === 'cliente'
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
    isClient,
    loadUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}