import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PUBLIC_ROUTES from './PublicRoutes';

const routesPublic = createBrowserRouter(PUBLIC_ROUTES);

/**
 * Renders routes depending on Authenticated or Anonymous users
 * @component Routes
 */
const Routes = () => {
  return <RouterProvider router={routesPublic} />;
};
export default Routes;
