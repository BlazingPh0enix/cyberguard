# from flask import Flask, request, render_template, jsonify
# import requests

# app = Flask(__name__)

# # Replace this URL with the endpoint of your cloud-based model
# MODEL_ENDPOINT = "https://your-cloud-model-endpoint.com/predict"

# @app.route('/', methods=['GET', 'POST'])
# def home():
#     if request.method == 'POST':
#         # Get the input text from the form
#         input_text = request.form['text']

#         # Send the text to the cloud model for prediction
#         try:
#             response = requests.post(MODEL_ENDPOINT, json={'text': input_text})
#             response.raise_for_status()
#             prediction = response.json().get('prediction', 'No prediction found')
#         except requests.exceptions.RequestException as e:
#             prediction = f"Error connecting to model: {e}"

#         # Return the result to the web page
#         return render_template('index.html', prediction=prediction, input_text=input_text)
#     return render_template('index.html')

from flask import Flask, request, render_template, jsonify
import tensorflow as tf  # Use joblib for scikit-learn, or replace with your framework's load function
import pickle


app = Flask(__name__)

# Load the model once when the app starts
# Replace with the correct path and loading function for your model
MODEL_PATH = 'C://Users//Kanishk//Downloads//final_trained_modeL_v2.keras'
model = tf.keras.models.load_model(MODEL_PATH)  # Adjust if you're using a TensorFlow, PyTorch, or other model

# Load tokenizer
with open('C://Users//Kanishk//Downloads//tokenizer_v2.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Function to predict on new text
def predict_cyberbullying(text, max_length):
    sequence = tokenizer.texts_to_sequences([text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(sequence, maxlen=max_length, padding='post', truncating='post')
    prediction = model.predict(padded)[0][0]
    return "Cyberbullying" if prediction > 0.5 else "Not Cyberbullying"

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Get the input text from the form
        input_text = request.form['text']
        
        # Predict using the local model
        prediction = predict_cyberbullying(input_text, 100)  # Adjust for your model's input format

        # Return the result to the web page
        return render_template('index.html', prediction=prediction, input_text=input_text)
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    # Replace text with asterisks (or any other processing)
    original_text = data['text']
    if predict_cyberbullying(original_text, 100) == "Cyberbullying":
        processed_text = '*' * len(original_text)
    else:
        processed_text = original_text

    return jsonify({'processed_text': processed_text})

if __name__ == '__main__':
    app.run(debug=True)
