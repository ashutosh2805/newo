import React from 'react';
import './App.css'; // Import your CSS file
import UploadImage from './UploadImage';

function App() {
  return (
    <div className="App" style={appStyle}>
      <header style={headerStyle}>
        <h1>Avurvedic leaf Image Recognisation </h1>
      </header>
      <UploadImage />
    </div>
  );
}

const appStyle = {
  backgroundImage: 'url("https://www.medlounges.com/images/leaf.svg")', // Set the path to your background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundRepeat: 'no-repeat', // No repeating
  backgroundPosition: 'center center', // Center the image
  minHeight: '100vh', // Ensure the background covers the entire viewport height
};

const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  textAlign: 'center',
  padding: '20px 10px',
  borderRadius: '10px',
};

export default App;
