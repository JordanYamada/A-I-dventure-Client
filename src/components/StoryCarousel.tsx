import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";

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

interface StoryCarouselProps {
  storyData: StoryData;
  handleFirstButton: (id:number | null) => void;
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({ storyData, handleFirstButton }) => {
  const { deleteStory } = useOutletContext();
  const { stories }: { stories: Story[] } = storyData;




  const storyCollection = stories.map( story => (
    <Carousel.Item key={story.id}>
      <img
        className="carouselImage h-10rem d-block img-fluid"
        src={story.progress.length > 0 ? story.progress[0].image : ""}
        alt={story.title}
      />

      <Carousel.Caption className="carouselCaption">
        <h3>{story.title}</h3>
        {/* You can uncomment this line when you have a description in your data */}
        {/* <p>{story.description}</p> */}
      </Carousel.Caption>
      <div>{story.completed? 
      <Button onClick={() => handleFirstButton(story.id)}>View</Button>
      :
      <Button onClick={() => handleFirstButton(story.id)}>Continue</Button>
}
      <Button onClick={() => deleteStory(story.id)}>Delete</Button>
      </div>
    </Carousel.Item>
  ));


  return (
    <>
      <h2>View Your Collection</h2>

      {/* ternary to display either a <Carousel> (if there are images) or an error message */}
      {stories && stories.length > 0
        ?
        (
          <Carousel>{storyCollection}</Carousel>
        )
        :
        (
          <h3>No Stories Ventures Yet!</h3>
        )}
    </>)

}

export default StoryCarousel;