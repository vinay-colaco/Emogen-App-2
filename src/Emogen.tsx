import React, { useState } from 'react';
import './Emogen.css';
import axios from './axiosInstance';

function Emogen() {
    const [showInput, setShowInput] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null); // Add this line
    const [showPredict, setShowPredict] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [postFile, setFileForPost] = useState(null)

    const handleClick = () => {
        setShowInput(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setFile(URL.createObjectURL(file));
        setFileName(file.name); 
        setShowInput(false);
        setShowPredict(true);
        setFileForPost(file)
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
        const formData = new FormData();
        formData.append("file", postFile);
        console.log(formData);

      
        axios.post("/upload", formData)
          .then((response) => {
            setPredictions(response.data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
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
                {file && !predictions &&
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
                {showPredict && !predictions &&
                    <>
                        <button className='buttonreupload' onClick={handleReupload}>RE-UPLOAD</button>&nbsp;&nbsp;&nbsp;
                        <button className='buttongenerate' onClick={handleGenerate}>GENERATE</button>
                    </>
                }
            </div>
            {predictions &&
                <div className='transparent-box'>
                    <div>Predicted Gender: {predictions.genderPrediction[0].predictedGender}</div>
                     <div>Confidence Scores:</div>
                    <ul>
                        <li>Male: {predictions.genderPrediction[0].confidenceScores.Male}</li>
                        <li>Female: {predictions.genderPrediction[0].confidenceScores.Female}</li>
                        <li>Predicted Emotion: {predictions.emotionPrediction.predictedEmotion}</li>
                        <li>Confidence Score: {predictions.emotionPrediction.confidenceScore}</li>
                    </ul>
                </div>

            }
        </>
    );
}

export default Emogen;
