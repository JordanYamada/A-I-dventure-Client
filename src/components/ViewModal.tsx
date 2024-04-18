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
      

      <Modal show={showStory} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
