import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import { api, User } from '../utilities/utilities';

const App: React.FC = () => {
  // Get the loader data and perform type assertion to specify the expected type
  const loadedUserData = useLoaderData() as User | null;

  const [user, setUser] = useState<User | null>(loadedUserData);
  const navigate = useNavigate();
  const location = useLocation();

  const testConnection = async () => {
    const response = await api.get('stories/');
    console.log(response);
  };

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    const nullUserUrls = ['/login/', '/signup/']; // should redirect to homepage if logged in

    // check if current url is one that might need to redirect
    const isAllowed = nullUserUrls.includes(location.pathname);
    console.log('isallowed ', isAllowed);

    // redirect to homepage when
    // logged user tries to go to signup, etc
    if (user && isAllowed) {
      console.log('redirect to homepage');
      navigate('/');
    }

    // not logged in user tries to go anywhere BUT signup or login
    // we redirect because the user needs to log in before they do anything else
    else if (!user && !isAllowed) {
      navigate('/');
    }

    console.log('user updated', user);
  }, [user, location.pathname, navigate]);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
      <Footer />
    </>
  );
}

export default App;
