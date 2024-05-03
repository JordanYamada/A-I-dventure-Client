import React from 'react';
import {  Modal } from 'react-bootstrap';

import PageCarousel from './PageCarousel';





interface ViewModalProps {
  showStory: boolean;
  handleShowModal: () => void;
}




const ViewModal: React.FC<ViewModalProps> = ({ showStory, handleShowModal}) => {



  return (
    <>
      

      <Modal className='hidden' show={showStory} onHide={handleShowModal}>
        <Modal.Header className='DivContainer' closeButton>
          <Modal.Title>Choose Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className='DivContainer'>
          <div className="mb-3">

            <PageCarousel />

          </div>
        
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewModal;
