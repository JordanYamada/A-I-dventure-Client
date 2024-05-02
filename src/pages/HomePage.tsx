import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { User } from '../utilities/utilities';


interface OutletContext {
  user: User;
}


const HomePage: React.FC = () => {

  const { user }: OutletContext = useOutletContext();


  return (
    <>
      <h1>Welcome</h1>
      {user
        ?
        <>
          <br />
          <div>
            Embark on an...
            <Link to="/adventure/">Adventure</Link>
          </div>
          <br />
          <div>
            Browse through the...
            <Link to="/library/">Library</Link>
          </div>
          <br />
          <div>
            Delve through your...
            <Link to="/memories/">Memories</Link>
          </div>
        </>
        :
        <>
          <br />
          <h2>Please <Link to="/signup/">Sign Up</Link> or <Link to="/login/">Log In</Link> to Continue</h2>
        </>
      }
    </>
  )
}

export default HomePage;
