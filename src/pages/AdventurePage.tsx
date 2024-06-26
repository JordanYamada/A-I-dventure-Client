/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { api } from '../utilities/utilities.tsx';
import StartModal from '../components/StartModal.tsx';
import ResumeModal from '../components/ResumeModal.tsx';
import { Button, Spinner } from 'react-bootstrap';


interface FormData {
  theme: string;
  role: string
}

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

interface ResumeResponse {
  story: Story[];
  progress: Progress[] | Progress;
}


interface OutletContext {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  showStory: boolean;
  setShowStory: (showStory: boolean) => void;
  setStoryData: (data: StoryData) => void;
}


const AdventurePage: React.FC = () => {

  const [id, setId] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [dialogue, setDialogue] = useState<string>("");
  const [epilogue, setEpilogue] = useState<string>("");
  const [choiceOne, setChoiceOne] = useState<string>("");
  const [choiceTwo, setChoiceTwo] = useState<string>("");
  const [choiceThree, setChoiceThree] = useState<string>("");
  const [showStart, setShowStart] = useState(false);
  const { clicked, setClicked, showStory, setShowStory, setStoryData }: OutletContext = useOutletContext()



  const handleShowStart = () => setShowStart(!showStart);
  const handleShowResume = () => setShowStory(!showStory);


  useEffect(() => {
    getUnfinishedStories();
  }, [dialogue,showStory]);


  const getUnfinishedStories = async () => {

    try {
      const response = await api.get('stories/completed/false/');
      const { data } = response;
      if (data) {
        setStoryData(data);
      }
    } catch (error) {
      console.error("Error fetching unfinished stories:", error);
    }

  };


  const handleResponse = (responseData: AxiosResponse) => {
    const id: number = responseData.data.progress.story;
    const title: string = responseData.data.progress.title;
    const image: string = responseData.data.progress.image;
    if (responseData.data.progress.epilogue) {
      const epilogue: string = responseData.data.progress.epilogue;
      setEpilogue(epilogue);
    } else {
      const dialogue: string = responseData.data.progress.dialogue;
      const choiceOne: string = responseData.data.progress.choice_one;
      const choiceTwo: string = responseData.data.progress.choice_two;
      const choiceThree: string = responseData.data.progress.choice_three;
      setDialogue(dialogue);
      setChoiceOne(choiceOne);
      setChoiceTwo(choiceTwo);
      setChoiceThree(choiceThree);
      // console.log("choices", choiceOne, "choice2:", choiceTwo, "choice3", choiceThree, "dialogue", dialogue)
    }
    console.log("id:", id, "title:", title, "image:", image)
    console.log('Response: ', responseData.data)
    setId(id);
    setTitle(title);
    setImage(image);
  }

  const beginStory = async (formData: FormData) => {
    try {
      setClicked(true);
      const { theme, role } = formData;
      const response: AxiosResponse = await api.post("stories/", {
        theme,
        role
      })
      handleResponse(response);
      setClicked(false);
    } catch (error) {
      setClicked(false);
      alert("Couldn't start an adventure this time. Try again?")
      console.log("Error:", error);
    }
  }

  const continueStory = async (choice: string) => {
    try {
      setClicked(true);
      const response: AxiosResponse = await api.post(`stories/${id}/`, {
        choice
      })
      handleResponse(response);
      setClicked(false);
    } catch (error) {
      setClicked(false);
      alert("Couldn't make an image this time. Try again?")
      console.log("Error:", error);
    }
  }

  const resumeUnfinishedStory = async (id: number | null) => {
    try {
      const response: AxiosResponse<ResumeResponse> = await api.get<ResumeResponse>(`stories/${id}/`);
      const { story, progress } = response.data;
      const lastProgressArray = progress as Progress[];
      const lastProgress = lastProgressArray[lastProgressArray.length - 1];

      const responseData: AxiosResponse<ResumeResponse> = {
        data: {
          progress: lastProgress,
          story: story
        },
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config
      };
      console.log("ResumeUnfinishedStory:", responseData.data)

      handleResponse(responseData);
    } catch (error) {
      console.log("Error:", error);
    }
  }


  return (
    <div className="DivContainer">

      {image
        ?
        <h2>Title: {title}</h2>
        :
        <h2>Let's Start An Adventure</h2>}

      <div>
        {image
          ?
          <div>
            <div>
            <img className='CarouselImage' src={image} />
            </div>

            {epilogue || dialogue}
          </div>
          :
          <h2>Try It Out!</h2>
        }
        {clicked
        ?
        <>
        <Button className='CarouselButton2' variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
      <Button className='CarouselButton2' variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
      <Button className='CarouselButton2' variant="secondary" disabled>
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
      {image && epilogue === ""
          ?
          <>
          <div>
            <Button className='CarouselButton2' variant="secondary outline-secondary" onClick={() => continueStory(choiceOne)}>{choiceOne}</Button>
            </div>
            <div>
            <Button className='CarouselButton2' variant="secondary outline-secondary" onClick={() => continueStory(choiceTwo)}>{choiceTwo}</Button>
            </div>
            <div>
            <Button className='CarouselButton2' variant="secondary outline-secondary" onClick={() => continueStory(choiceThree)}>{choiceThree}</Button>
            </div>
          </>
          :
          <>
            <StartModal
              clicked={clicked}
              showStart={showStart}
              handleShowStart={handleShowStart}
              beginStory={beginStory}
            />
            <ResumeModal
              showStory={showStory}
              handleShowResume={handleShowResume}
              resumeUnfinishedStory={resumeUnfinishedStory}
            />
          </>}
      </>
      }
        
      </div>


    </div>
  );
}


export default AdventurePage;