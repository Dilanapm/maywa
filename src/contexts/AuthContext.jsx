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
        console.log('🔍 Auth state change:', { event, hasSession: !!session });
        
        if (session?.user) {
          setUser(session.user)
          setLoading(true) // Mantener loading mientras carga el perfil
          
          try {
            // Timeout para evitar loading infinito (máximo 5 segundos)
            const profilePromise = loadUserProfile(session.user.id, session.user.email);
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Profile loading timeout')), 5000)
            );
            
            await Promise.race([profilePromise, timeoutPromise]);
          } catch (error) {
            console.error('❌ Profile loading failed or timeout:', error);
            // Crear perfil básico si falla
            const basicProfile = {
              id: session.user.id,
              role: 'cliente',
              full_name: session.user.email?.split('@')[0] || 'Usuario',
              email: session.user.email || ''
            };
            setProfile(basicProfile);
          } finally {
            setLoading(false);
          }
        } else {
          setUser(null)
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const getInitialSession = async () => {
    try {
      console.log('🔍 Getting initial session...');
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        console.log('✅ Initial session found for user:', session.user.id);
        setUser(session.user)
        
        try {
          // Timeout para evitar loading infinito
          const profilePromise = loadUserProfile(session.user.id, session.user.email);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Initial profile loading timeout')), 5000)
          );
          
          await Promise.race([profilePromise, timeoutPromise]);
        } catch (profileError) {
          console.error('❌ Initial profile loading failed:', profileError);
          // Crear perfil básico como fallback
          const basicProfile = {
            id: session.user.id,
            role: 'cliente',
            full_name: session.user.email?.split('@')[0] || 'Usuario',
            email: session.user.email || ''
          };
          setProfile(basicProfile);
        }
      } else {
        console.log('ℹ️ No initial session found');
      }
    } catch (error) {
      console.error('❌ Error getting initial session:', error);
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId, userEmail = null) => {
    try {
      console.log('🔍 Loading profile for user:', userId);
      const { data, error } = await profiles.getProfile(userId)
      
      if (error) {
        console.error('❌ Error loading profile:', error);
        // En caso de error, crear un perfil básico para evitar que se quede colgado
        const basicProfile = {
          id: userId,
          role: 'cliente', // Rol por defecto
          full_name: userEmail?.split('@')[0] || 'Usuario',
          email: userEmail || ''
        };
        console.log('🔧 Using basic profile as fallback:', basicProfile);
        setProfile(basicProfile);
      } else if (data) {
        console.log('✅ Profile loaded successfully:', data);
        setProfile(data);
      } else {
        console.log('⚠️ No profile data found, using basic profile');
        // Crear perfil básico si no hay datos
        const basicProfile = {
          id: userId,
          role: 'cliente',
          full_name: userEmail?.split('@')[0] || 'Usuario',
          email: userEmail || ''
        };
        setProfile(basicProfile);
      }
    } catch (err) {
      console.error('❌ Exception loading profile:', err);
      // Crear perfil básico como último recurso
      const basicProfile = {
        id: userId,
        role: 'cliente',
        full_name: userEmail?.split('@')[0] || 'Usuario',
        email: userEmail || ''
      };
      console.log('🔧 Using fallback profile after exception:', basicProfile);
      setProfile(basicProfile);
    }
  }

  const signUp = async (email, password, fullName, phone, address, businessType = 'particular', role = 'cliente') => {
    const { data, error } = role === 'administrador' 
      ? await auth.signUpAdmin(email, password, fullName)
      : await auth.signUpClient(email, password, fullName, phone, address, businessType)
    
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await auth.signIn(email, password)
    
    if (data?.user && !error) {
      // Cargar perfil del usuario para verificar el rol
      await loadUserProfile(data.user.id, data.user.email)
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
    return profile?.role === 'administrador';
  }

  const isClient = () => {
    return profile?.role === 'cliente';
  }

  const value = {
    user,
    profile,
    userProfile: profile, // Alias para compatibilidad
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