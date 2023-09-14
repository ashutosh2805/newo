from flask import Flask, request, jsonify
import torch
import torchvision.transforms as transforms
from PIL import Image
import io

app = Flask(__name__)

# Load your PyTorch model here (replace 'your_model.pth' with your model file)
model = torch.load('your_model.pth')
model.eval()

# Define a transform to preprocess incoming images
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['image']
        image = Image.open(io.BytesIO(file.read()))
        image = preprocess(image).unsqueeze(0)

        # Perform inference with your PyTorch model
        with torch.no_grad():
            output = model(image)

        # Process the model's output as needed
        # For example, convert it to JSON
        result = {
            "class": torch.argmax(output).item(),
            "confidence": torch.max(output).item()
        }

        return jsonify(result)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Adjust the port as needed
