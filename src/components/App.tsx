import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import { api, User } from '../utilities/utilities';

interface Progress {
  id: number;
  title: string;
  image: string;
  decision: string;
  result: string;
  dialogue: string | null;
  epilogue: string | null;
  choice_one: string | null;
  danger_one: string | null;
  choice_two: string | null;
  danger_two: string | null;
  choice_three: string | null;
  danger_three: string | null;
  story: number;
}

interface Story {
  id: number;
  progress: Progress[];
  theme: string;
  role: string;
  title: string;
  completed: boolean;
  client: number;
  // Other properties as needed
}

interface StoryData {
  stories: Story[];
  // Add other properties as needed
}

const App: React.FC = () => {
  // Get the loader data and perform type assertion to specify the expected type
  const loadedUserData = useLoaderData() as User | null;

  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [bookData, setBookData] = useState<StoryData | null>(null);
  const [showStory, setShowStory] = useState(false);
  const [user, setUser] = useState<User | null>(loadedUserData);
  const navigate = useNavigate();
  const location = useLocation();


  

  const deleteStory = async (id:number) => {
    try {
      await api.delete(`stories/${id}/`);
      setShowStory(false); 
      alert("Adventure Forgotten!")
    } catch (error) {
      console.error("Error fetching unfinished stories:", error);
    } 
    

  }

  const contextObject = {
    user,
    setUser,
    showStory,
    setShowStory,
    storyData,
    setStoryData,
    bookData,
    setBookData,
    deleteStory
}


  useEffect(() => {
    getStories(false);
    getStories(true); 
}, [showStory]);


const getStories = async (bool:boolean) => {
  try {
    const response = await api.get(`stories/completed/${bool}/`);
    const { data } = response;
    console.log("UseEffect - resume",data);
    if (data) {
      if (bool === false){
      setStoryData(data);
    } else {
      setBookData(data);
    }
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  } 
};




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
      <Outlet context={contextObject} />
      <Footer />
    </>
  );
}

export default App;
