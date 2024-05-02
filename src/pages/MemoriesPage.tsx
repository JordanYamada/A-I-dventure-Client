import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import MemoryCarousel from '../components/MemoryCarousel';


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



const MemoriesPage: React.FC = () => {
  const { memories }: OutletContext = useOutletContext();




  return (
    <div className="DivContainer">
    {memories ?
    <>
      <h1>View your collection of favorite memories</h1>
      
        <MemoryCarousel/>
        </>
      :
      <>
      <h1>Your collection is empty</h1>
<div>
  <p>How about browing through your</p><Link to="/library/">Library?</Link></div>
  </>
    }
    </div>
  )
}

export default MemoriesPage;
