import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import LibraryPage from '../pages/LibraryPage';
import LogIn from '../pages/Login';
import SignUp from '../pages/SignUp';
import { userConfirmation } from '../utilities/utilities';
import AdventurePage from '../pages/AdventurePage';
import MemoriesPage from '../pages/MemoriesPage';

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
      {
        path: '/memories/',
        element: <MemoriesPage />,
      },
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;