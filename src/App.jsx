import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className='w-full h-full'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  )
}

export default App

