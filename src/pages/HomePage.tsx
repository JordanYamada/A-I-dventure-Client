import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import StartModal from '../components/StartModal';

const HomePage: React.FC = () => {
  // const [showStart, setShowStart] = useState(false);

  // const handleShowStart = () => setShowStart(!showStart);

  return (
    <>
      <h1>Welcome</h1>
      {/* <StartModal
        showStart={showStart}
        handleShowStart={handleShowStart}
      /> */}
      <Link to="/adventure/">Adventure</Link>
      <Link to="/library/">Library</Link>
    </>
  )
}

export default HomePage;
