import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import LogIn from '../pages/Login';
import SignUp from '../pages/SignUp';
import { userConfirmation } from '../utilities/utilities';

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
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;