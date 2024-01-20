import React, { useState } from 'react';
import { addToQueue } from './functions';



function Modal({ tokenValue, isModalOpen, setModalOpen }: { tokenValue: string | null, isModalOpen: boolean, setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [input, setinput] = useState<string | URL>()

    const toggleModal = () => {
        console.log('toggleModal');
        setModalOpen(!isModalOpen);
    };


    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            if (input) {
                const URI = new URL(input)
                const videoId = URI.searchParams.get("v")
                if (tokenValue && videoId) {
                    addToQueue(tokenValue, videoId).then((data) => alert(data)).then(() => {
                        setinput("")
                        setModalOpen(false)
                    })
                }
            }

        } catch (error) {
            console.log(error)
            alert("Invalid URL")
        }
    }
    const modalContainerClass = `modal-container ${isModalOpen ? '' : 'hide-modal'}`;
    const modalClass = `modal ${isModalOpen ? 'flex' : 'hide-modal'}`;

    return (
        <>
            <div className={modalContainerClass} onClick={toggleModal}></div>
            <div className={modalClass}>
                <div className='modal-content'>
                    <h1>Add Video Here</h1>
                    <p>Past youtube video link here</p>
                    <form onSubmit={onFormSubmit}>
                        <input type="text" onChange={(e) => setinput(e.target.value)} placeholder="https://www.youtube.com/watch?v=XXXXX" className="modal-input" value={input instanceof URL ? input.href : input} required />
                        <input type="submit" value="Add" className="modal-button" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal;
