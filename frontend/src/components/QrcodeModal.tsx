import React from 'react'

function QrcodeModal({ tokenValue, isModalOpen, setModalOpen }: { tokenValue: string | null, isModalOpen: boolean, setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    const modalContainerClass = `modal-container ${isModalOpen ? '' : 'hide-modal'}`;
    const modalClass = `modal ${isModalOpen ? 'flex' : 'hide-modal'}`;
    return (
        <>
            <div className={modalContainerClass} onClick={toggleModal}></div>
            <div className={modalClass}>
                <img src={`https://youtubeq.s3.eu-north-1.amazonaws.com/qrcodes/${tokenValue}.png`} alt="YoutubeQ QrCode"  />
            </div>
        </>
    );
}

export default QrcodeModal