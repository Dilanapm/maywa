import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'

function App() {
  return (
    <div className='w-full h-full'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

