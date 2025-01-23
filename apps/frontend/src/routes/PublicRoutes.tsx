import { PublicLayout } from '@/layout';
import MainView from '@/views/MainView';
import { Navigate } from 'react-router-dom';

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/',
        element: <MainView />,
      },
    ],
  },
];

export default PUBLIC_ROUTES;
