import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { api } from "../utilities/utilities";



interface Memory {
  id: number;
  image: string;
  dialogue: string;
  title: string;
}

interface MemoryData {
  memoryData: Memory[];
}

interface OutletContext {
  memories: MemoryData
  setMemories: (memories:MemoryData) => void;
}

const MemoryCarousel: React.FC = () => {
  const { memories, setMemories }: OutletContext = useOutletContext();

  const { memoryData }: { memoryData: Memory[] } = memories;
 


  const forgetMemory = async (id:number) => {
    try {
      await api.delete(`memories/${id}/`);
      const response = await api.get(`memories/`)
      setMemories(response.data); 
      alert("Adventure Forgotten!")
    } catch (error) {
      console.error("Error: This memory just doesn't want to be forgotten...:", error);
    } 
  }

  const memoryCollection = memoryData.map(memory => (
    <Carousel.Item className="Carousels" key={memory.id}>
      <div>
      <img
        className="carouselImage h-5rem d-block img-fluid"
        src={memory.image}
        alt={memory.title}
      />
      </div>
      <div className="Carousels">
      <Button onClick={() =>forgetMemory(memory.id)}>Forget</Button>
      </div>
      
    </Carousel.Item>
  ));


  return (
    <>
      <h2>Enjoy browsing</h2>
      
        
          <Carousel className="Carousels">{memoryCollection}</Carousel>
        
    </>)

}

export default MemoryCarousel;