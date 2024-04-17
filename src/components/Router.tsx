import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import LibraryPage from '../pages/LibraryPage';
import LogIn from '../pages/Login';
import SignUp from '../pages/SignUp';
AdventurePage
import { userConfirmation } from '../utilities/utilities';
import AdventurePage from '../pages/AdventurePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/signup/',
        element: <SignUp />,
      },
      {
        path: '/login/',
        element: <LogIn />,
      },
      {
        path: '/adventure/',
        element: <AdventurePage />,
      },
      {
        path: '/library/',
        element: <LibraryPage />,
      },
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;