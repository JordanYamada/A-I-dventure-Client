import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
// import { api } from '../utilities/utilities';
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
  // Other properties as needed
}

interface StoryData {
  stories: Story[];
}

interface ResumeModalProps {
  showStory: boolean;
  handleShowResume: () => void;
  resumeUnfinishedStory: (id: number | null ) => void;
}




const ViewModal: React.FC<ResumeModalProps> = ({ showStory, handleShowResume, resumeUnfinishedStory }) => {
  // const [storyData, setStoryData] = useState<StoryData | null>(null);
  const { storyData }: { storyData: StoryData } = useOutletContext();



  const handleResume = (storyId:number | null) => {
    console.log("handleResume:", storyId);
    const id = storyId;
    resumeUnfinishedStory(id)
    handleShowResume()
  };


  return (
    <>
      <Button variant="primary" onClick={handleShowResume}>
        Resume a story
      </Button>

      <Modal show={showStory} onHide={handleShowResume}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">

            <StoryCarousel
            handleFirstButton={handleResume}
            storyData={storyData}            
            />

          </div>
        
        </Modal.Body>
        <Modal.Footer>
        {/* <Button variant="primary" onClick={handleResume}>
            Begin
          </Button>
          <Button variant="secondary" onClick={handleRandom}>
            Random
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewModal;
