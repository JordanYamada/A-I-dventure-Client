import React from 'react';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {


  return (
    <>
      <h1>Welcome</h1>
      <Link to="/adventure/">Adventure</Link>
      <Link to="/library/">Library</Link>
      <Link to="/memories/">Memories</Link>
    </>
  )
}

export default HomePage;
