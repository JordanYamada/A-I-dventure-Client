import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { User, userLogout } from '../utilities/utilities';

interface HeaderProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Define setUser type
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

  return (
    <Navbar expand="lg" className="DivContainer">
      <Container className='HeaderContainer'>
        <Navbar.Brand as={Link} to="/">
          {user ? `User: ${user.client}` : "Home"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='HeaderContainer' id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/signup/">
              Sign Up
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/login/">
                Log In
              </Nav.Link>
            )}
            {user && (
              <Button onClick={() => handleUserLogout()} variant="secondary outline-secondary">
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  );
};

export default Header;
