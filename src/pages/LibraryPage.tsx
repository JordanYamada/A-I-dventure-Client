import React from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import StoryCarousel from '../components/StoryCarousel';
import ViewModal from '../components/ViewModal';
import { api } from '../utilities/utilities';

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
  bookId: number;
  setLibraryBook: (story: Story | null) => void;
}

interface ViewResponse {
  story: Story;
  progress: Progress;
}


const LibraryPage: React.FC = () => {
  const { bookData, showStory, setShowStory, setLibraryBook }: OutletContext = useOutletContext();

  const handleShowView = async (id:number | null) => {
    await viewABook(id)
    setShowStory(!showStory);
  }

  const handleShowModal = () => {
    setShowStory(!showStory);
  }


  const viewABook = async (id: number | null) => {
    try {
      const response: AxiosResponse<ViewResponse> = await api.get<ViewResponse>(`stories/${id}/`);
      const { story, progress } = response.data;
      const lastProgress = progress;

      const responseData: AxiosResponse<ViewResponse> = {
        data: {
          progress: lastProgress,
          story: story
        },
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config
      };
      console.log("Viewing Story:", responseData.data.story)

      setLibraryBook(responseData.data.story);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <>
      <h1>Welcome to the Library</h1>
      {bookData ? <>
        <StoryCarousel
            handleFirstButton={handleShowView}
            storyData={bookData}            
            />
        <ViewModal
        handleShowModal={handleShowModal}
        showStory={showStory}
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
