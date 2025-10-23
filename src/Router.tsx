import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from "@/pages/LandingPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
