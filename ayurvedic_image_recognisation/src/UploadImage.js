import React, { useState } from 'react';
import axios from 'axios';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleUpload = async () => {
        if (image) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', image);

            try {
                
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                setUploadedImageUrl(response.data.imageUrl);
                setMessage('Image uploaded successfully!');
                setMessageType('success');

                // Send the uploaded image to your Python backend for prediction
                const predictionResponse = await axios.post('http://localhost:5001/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                console.log(predictionResponse.data);
                // Update your UI based on the prediction response

            } catch (error) {
                console.error("Error uploading file:", error);
                setMessage('Failed to upload image. Please try again.');
                setMessageType('error');
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("Please select an image first!");
        }
    };

    const removePreview = () => {
        setImage(null);
        setUploadedImageUrl(null);
    };

    return (
        <div style={uploadContainer}>
            <input type="file" onChange={handleImageChange} style={inputStyle} />
            {isLoading ? <p style={loadingStyle}>Uploading...</p> : <button data-tip="Click to upload the selected image" onClick={handleUpload} style={buttonStyle}>Upload</button>}
            {message && <p style={messageType === 'success' ? successMessageStyle : errorMessageStyle}>{message}</p>}
            {uploadedImageUrl ? (
                <div>
                    <img src={`http://localhost:5000${uploadedImageUrl}`} alt="Uploaded preview" style={{maxWidth: "300px", marginTop: "20px"}} />
                    <button onClick={removePreview} style={{ ...buttonStyle, backgroundColor: 'red', marginLeft: '10px' }}>Remove</button>
                </div>
            ) : null}
            <ReactTooltip />
        </div>
    );
}

const uploadContainer = {
    padding: '40px',
    border: '2px solid #ddd',
    borderRadius: '15px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '50px auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
};

const inputStyle = {
    display: 'block',
    margin: '20px auto',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)'
};

const loadingStyle = {
    marginTop: '20px',
    fontSize: '16px'
};

const successMessageStyle = {
    color: 'green',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold'
};

const errorMessageStyle = {
    color: 'red',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold'
};

export default UploadImage;
