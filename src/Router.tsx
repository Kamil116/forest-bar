import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from "@/pages/LandingPage";
import Registration from "@/pages/Registration/Registration";
import Login from "@/pages/Login/Login";
import Catalog from '@/pages/Catalog/Catalog';

// Admin imports
import AdminLayout from '@/components/Admin/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import ProductsManagement from '@/pages/Admin/ProductsManagement';
import VendorsManagement from '@/pages/Admin/VendorsManagement';
import EmployeesManagement from '@/pages/Admin/EmployeesManagement';
import VacanciesManagement from '@/pages/Admin/VacanciesManagement';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LandingPage />,
            index: true, // ✅ ensures "/" maps correctly
        },
        {
            path: '/registration',
            element: <Registration />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/catalog',
            element: <Catalog />,
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: 'products',
                    element: <ProductsManagement />,
                },
                {
                    path: 'vendors',
                    element: <VendorsManagement />,
                },
                {
                    path: 'employees',
                    element: <EmployeesManagement />,
                },
                {
                    path: 'vacancies',
                    element: <VacanciesManagement />,
                },
            ],
        },
    ],
    {
        basename: '/forest-bar',
    }
);

export function Router() {
    return <RouterProvider router={router} />;
}
