const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
}).single('image'); // 'image' should match the field name in your form

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Handle image uploads
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Failed to upload image.' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });
});

// Define a route for model predictions (you need to implement this)
app.post('/predict', (req, res) => {
  // Handle model predictions here using your PyTorch model
  // Send back the prediction result as JSON
  const predictionResult = {
    class: 1, // Replace with your actual prediction
    confidence: 0.95, // Replace with your actual confidence score
  };

  res.json(predictionResult);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
