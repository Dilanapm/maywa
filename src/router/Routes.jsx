import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import AuthLayout from '../layout/AuthLayout';
import DashboardLayout from '../layout/DashboardLayout';
import Home from '../components/Home/Home';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AdminLoginForm from '../components/auth/AdminLoginForm';
import ClientDashboard from '../components/Dashboard/ClientDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import { ClientRoute, AdminRoute } from '../components/ProtectedRoutes';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginForm />
            },
            {
                path: "/register", 
                element: <RegisterForm />
            },
            {
                path: "/admin-login",
                element: <AdminLoginForm />
            }
        ]
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: (
                    <ClientRoute>
                        <ClientDashboard />
                    </ClientRoute>
                )
            },
            {
                path: "/admin",
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                )
            }
        ]
    }
]);

export default router;