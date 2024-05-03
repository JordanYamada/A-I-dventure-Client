import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import StoryCarousel from './StoryCarousel';



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
}

interface StoryData {
  stories: Story[];
}

interface ResumeModalProps {
  showStory: boolean;
  handleShowResume: () => void;
  resumeUnfinishedStory: (id: number | null ) => void;
}




const ResumeModal: React.FC<ResumeModalProps> = ({ showStory, handleShowResume, resumeUnfinishedStory }) => {
  const { storyData }: { storyData: StoryData } = useOutletContext();



  const handleResume = (storyId:number | null) => {
    const id = storyId;
    resumeUnfinishedStory(id)
    handleShowResume()
  };


  return (
    <>
      <Button variant="secondary outline-secondary" onClick={handleShowResume}>
        Resume a story
      </Button>

      <Modal className='hidden' show={showStory} onHide={handleShowResume}>
        <Modal.Header className='DivContainer' closeButton>
          <Modal.Title>Choose Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className='DivContainer'>
          <div className="mb-3">

            <StoryCarousel
            handleFirstButton={handleResume}
            storyData={storyData}            
            />

          </div>
        
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResumeModal;
