import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { api } from "../utilities/utilities";

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

interface Memory {
  image: string;
  dialogue: string;
  title: string;
}

interface MemoryData {
  memories: Memory[];
}

interface OutletContext {
  libraryBook: Story
  memories: MemoryData;
  showStory: boolean;
  setMemories: (memories:MemoryData) => void;
  bookId: number;
  setBookId: (bookId:number) => void; 
}

const PageCarousel: React.FC = () => {
  const { libraryBook, setMemories, memories }: OutletContext = useOutletContext();
  // const { stories }: { stories: Story[] } = storyData;


  const pages:Progress[] = libraryBook.progress

  const saveMemory = async (page:Progress) => {
    try {
      let dialogue:string | null = null;
      if (page.epilogue){
        dialogue = page.epilogue;
      } else {
        dialogue = page.dialogue;
      }
      const newPage:{
        image:string,
        dialogue:string,
        title:string
      } = {
        image:page.image,
        dialogue:dialogue,
        title:page.title
      }
      console.log("NEWPAGE:",newPage)
      await api.post(`memories/`, newPage );
      const response = await api.get(`memories/`)
      setMemories(response.data); 
      console.log("Memory Saved:", memories)
      alert("Memory Saved!")
    } catch (error) {
      console.error("Error fetching unfinished stories:", error);
    } 
  }

  const book = pages.map( page => (
    <Carousel.Item className="Carousels" key={page.id}>
      <div>
      <img
        className="carouselImage h-10rem d-block img-fluid"
        src={page.image}
        alt={page.title}
      />
      </div>
      <div>
        {page.epilogue
      ?
      <p>{page.epilogue}</p>
      :
      <p>{page.dialogue}</p>
      }
        
      </div>
      <div className="Carousels">
      <Button onClick={() =>saveMemory(page)}>Save</Button>
      </div>
      
    </Carousel.Item>
  ));


  return (
    <>
      <h2>View Your Collection</h2>
      
        
          <Carousel className="Carousels">{book}</Carousel>
        
    </>)

}

export default PageCarousel;