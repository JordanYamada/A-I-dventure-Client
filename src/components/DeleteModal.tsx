import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Modal} from 'react-bootstrap';

interface OutletContext {
  deleteStory: (id: number) => void;
}

interface DeleteModalProps {
  showDelete: boolean;
  setShowDelete: (showDelete:boolean) => void;
  storyId: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ showDelete, setShowDelete, storyId }) => {
  const { deleteStory }: OutletContext = useOutletContext();


  const handleDelete = ():void => {
    deleteStory(storyId);
    setShowDelete(false)
    alert("Adventure has been forgotten.")
  }


  const handleShowDelete = () => {
    setShowDelete(false);
  }
  

  return (
    <>

      <Modal className='hidden' show={showDelete} onHide={handleShowDelete}>
        <Modal.Header className='DivContainer' closeButton>
          <Modal.Title>You choosing to Forget this Adventure</Modal.Title>
        </Modal.Header>
        <Modal.Body className='DivContainer'>
          <h2>Are you sure you wish to Forget this Adventure?</h2>
          <br/>
          <br/>
          <Button className='CarouselButton' variant="secondary outline-secondary" onClick={handleDelete}>
            Forget
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
