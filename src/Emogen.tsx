import React, { useState } from 'react';
import './Emogen.css';
import axios from './axiosInstance';

function Emogen() {
    const [showInput, setShowInput] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null); // Add this line
    const [showPredict, setShowPredict] = useState(false);
    // const [predictions, setPredictions] = useState(null);

    const handleClick = () => {
        setShowInput(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setFile(URL.createObjectURL(file));
        setFileName(file.name); // Add this line
        setShowInput(false);
        setShowPredict(true);
    };

    const handleTitleClick = () => {
        window.location.reload();
    };

    const handleReupload = () => {
        setFile(null);
        setFileName(null);
        setShowInput(true);
        setShowPredict(false);
    };

    const handleGenerate = async () => {
        // Call your API to get the predictions here
        // For example:
        // const response = await fetch('/api/predict', { method: 'POST', body: file });
        // const predictions = await response.json();
        // setPredictions(predictions);
    };

    return (
        <>
            <div className="video-background">
                <video autoPlay loop muted className="fullscreen-video">
                    <source src="/videoback.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='title' onClick={handleTitleClick}>
                <img src="/apptitle.png" alt="Title" className="title-image" />
            </div>
            <div className='container'>
                {!showInput && !file &&
                    <button className='buttoninput' onClick={handleClick}>
                        <img src="/inputfileicon.png" alt="Upload Icon" />
                    </button>}
                {showInput &&
                    <div className='transparent-box'>
                        <div className="message1">
                            Audio File Here...
                        </div>
                        <div className="centerBox">
                            <div className="subBox">
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    UPLOAD
                                </label>
                                <input id="file-upload" type='file' accept='.wav' onChange={handleFileChange} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                }
                {file &&
                    <div className='transparent-box'>
                        <div className='message1'>
                            File Uploaded Successfully !!!
                        </div>
                        <div className='audio-container'><audio controls>
                            <source src={file} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        </div>
                        <div className='centerBox2'>
                            <div className='subBox2'>
                                <p>{fileName}</p>
                            </div>
                        </div>
                    </div>}
            </div>
            <div className='buttoncontainer'>
                {showPredict &&
                    <>
                        <button className='buttonreupload' onClick={handleReupload}>RE-UPLOAD</button>&nbsp;&nbsp;&nbsp;
                        <button className='buttongenerate' onClick={handleGenerate}>GENERATE</button>
                    </>
                }
            </div>
        </>
    );
}

export default Emogen;
