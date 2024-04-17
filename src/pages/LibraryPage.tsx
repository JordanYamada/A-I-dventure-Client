import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import StoryCarousel from '../components/StoryCarousel';
// import { Button } from 'react-bootstrap';
// import StartModal from '../components/StartModal';


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

interface OutletContext {
  bookData: StoryData;
  showStory: boolean;
  setShowStory: (showStory: boolean) => void;
}


const LibraryPage: React.FC = () => {
  const { bookData, showStory, setShowStory }: OutletContext = useOutletContext();

  const handleShowView = () => setShowStory(!showStory);

  return (
    <>
      <h1>Welcome to the Library</h1>
      {bookData ? <>
        <StoryCarousel
            handleFirstButton={handleShowView}
            storyData={bookData}            
            />
      </>:
      <>
      <h2>Looks like you haven't finished any adventures yet.</h2>
<div>
  <p>How about starting a new</p><Link to="/adventure/">Adventure?</Link></div>
  </>
    }
    </>
  )
}

export default LibraryPage;
