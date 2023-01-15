import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import AddReviewBox from './add-review-box';

export default function AddReview(props) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className='add-review-box'>
                <button className='add-review-button' onClick={togglePopup}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    Submit a review</button>
            </div>
            {isOpen && <AddReviewBox handleClose={togglePopup} code={props.code} />}
        </>
    )
}