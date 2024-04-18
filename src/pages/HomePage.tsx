import React from 'react';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {


  return (
    <>
      <h1>Welcome</h1>
      <br/>
      <div>
        Embark on an...
      <Link to="/adventure/">Adventure</Link>
      </div>
      <br/>
      <div>
        Browse through the...
      <Link to="/library/">Library</Link>
      </div>
      <br/>
      <div>
        Delve through your...
      <Link to="/memories/">Memories</Link>
      </div>
    </>
  )
}

export default HomePage;
