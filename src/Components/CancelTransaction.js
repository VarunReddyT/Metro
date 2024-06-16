import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Cancel.css'

export default function CancelTransaction() {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    }
    const handleConfirm = () => {
        setOpenModal(false);
        navigate('/');
    }
    const handleBack = () => {
        setOpenModal(true);
    }

  return (
    <div>
        <div className='mt-3'>
            <button className='btn btn-danger back-button' onClick={handleBack}>Back</button>
        </div>
        {openModal && <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to cancel the transaction?</h4>
                    </div>
                    <div className='d-flex justify-content-evenly align-items-center'>
                        <button className='btn btn-danger' onClick={handleConfirm}>Confirm</button>
                        <button className='btn btn-primary' onClick={closeModal}>Close</button>
                    </div>
        </div>
        </div>}
    </div>
  )
}
