import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from "@/pages/LandingPage";
import Registration from "@/pages/Registration/Registration";
import Login from "@/pages/Login/Login";
import Catalog from '@/pages/Catalog/Catalog';

// Admin imports
import AdminLayout from '@/components/Admin/AdminLayout';
import ProductsManagement from '@/pages/Admin/ProductsManagement';
import VendorsManagement from '@/pages/Admin/VendorsManagement';
import VacanciesManagement from '@/pages/Admin/VacanciesManagement';
import AdvantagesManagement from '@/pages/Admin/AdvantagesManagement';

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
                    path: 'vacancies',
                    element: <VacanciesManagement />,
                },
                {
                    path: 'advantages',
                    element: <AdvantagesManagement />,
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
