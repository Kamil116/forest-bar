import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {LandingPage} from "@/pages/LandingPage";
import Registration from "@/pages/Registration";
import Login from "@/pages/Login";
import VendorsPage from "@/pages/VendorsPage";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LandingPage/>,
            index: true, // ✅ ensures "/" maps correctly
        },
        {
            path: '/registration',
            element: <Registration/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
    ],
    {
        basename: '/forest-bar',
    }
);

export function Router() {
    return <RouterProvider router={router}/>;
}
