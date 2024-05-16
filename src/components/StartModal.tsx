import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

interface StartModalProps {
  clicked: boolean;
  showStart: boolean;
  handleShowStart: () => void;
  beginStory: (formData: { theme: string; role: string }) => void;
}

const StartModal: React.FC<StartModalProps> = ({ clicked, showStart, handleShowStart, beginStory }) => {
  const [theme, setTheme] = useState('epic adventure');
  const [role, setRole] = useState('warrior');



  const handleBegin = () => {
    beginStory({ theme, role })
    handleShowStart()
  };

  const handleRandom = () => {
    const randomThemeRoll = Math.floor(Math.random() * 2);
    const randomTheme = (randomThemeRoll === 0) ? 'epic adventure' : 'space adventure';

    const randomRole = randomTheme === 'epic adventure'
      ? ['brave warrior', 'cunning rogue', 'wise wizard', 'veteran archer'][Math.floor(Math.random() * 4)]
      : ['space fleet captain', 'researcher of alien life and planets', 'bold space pirate', 'wandering, inquisitive explorer'][Math.floor(Math.random() * 4)];

    setTheme(randomTheme);
    setRole(randomRole);

    beginStory({
      theme: randomTheme,
      role: randomRole
    })

    handleShowStart()

  };

  return (
    <>
      <Button variant="secondary outline-secondary" onClick={handleShowStart}>
        Begin a new story
      </Button>

      <Modal className='hidden' show={showStart} onHide={handleShowStart}>
        <Modal.Header className='DivContainer' closeButton>
          <Modal.Title>Begin Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className='DivContainer'>
          <div className="mb-3">
            <label htmlFor="themeSelect" className="form-label">Select Theme:</label>
            <select className="form-select" id="themeSelect" required value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="epic adventure">Fantasy</option>
              <option value="space adventure">Cosmic</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="roleSelect" className="form-label">Select Role:</label>
            <select className="form-select" id="roleSelect" required value={role} onChange={(e) => setRole(e.target.value)}>
              {theme === "epic adventure" ?
                <>
                  <option value="brave warrior">Warrior</option>
                  <option value="cunning rogue">Rogue</option>
                  <option value="wise wizard">Wizard</option>
                  <option value="veteran archer">Archer</option>
                </>
                :
                <>
                  <option value="space fleet captain">Captain</option>
                  <option value="researcher of alien life and planets">Scientist</option>
                  <option value="bold space pirate">Pirate</option>
                  <option value="wandering, inquisitive explorer">Explorer</option>
                </>
              }
            </select>
          </div>
          {clicked
          ?
        <>
        <Button className='CarouselButton' variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
      <Button className='CarouselButton' variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
        </>
        :
        <>
        <Button className='CarouselButton' variant="secondary outline-secondary" onClick={handleRandom}>
            Random
          </Button>
          <Button className='CarouselButton' variant="secondary outline-secondary" onClick={handleBegin}>
            Begin
          </Button>
        </>
        }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StartModal;
