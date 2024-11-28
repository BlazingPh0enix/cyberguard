# CyberGuard

A cyberbullying detection and prevention browser extension that helps create safer online spaces.

## Overview

CyberGuard is a Chrome extension designed to identify and prevent cyberbullying through advanced text analysis and machine learning techniques. It provides real-time monitoring of Reddit comments and automatically censors potentially harmful content.

## Features

- Real-time comment analysis
- Automatic censoring of harmful content
- Support for Reddit comments
- Privacy-focused design
- Fast parallel processing
- Dynamic content detection

## Model Training

### Prerequisites

- Python 3.6 or higher
- Jupyter Notebook
- Required Python packages: `requirements.txt`

### Training Steps

1. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

2. Open the Training Notebook:
   - Navigate to the project directory
   - Open `train.ipynb` in Jupyter Notebook or Jupyter Lab
   ```bash
   jupyter notebook train.ipynb
   ```

3. Dataset Preparation:
   - The notebook uses a cyberbullying dataset
   - Ensure the dataset is in the correct path as specified in the notebook
   - The data should contain text samples and their corresponding labels

4. Run the Notebook:
   - Execute each cell in sequence
   - The notebook will:
     - Load and preprocess the data
     - Train the model
     - Save the trained model
     - Deploy to ModelBit

5. ModelBit Deployment:
   - Create a ModelBit account if you don't have one
   - Follow the notebook instructions to deploy your model
   - Save the API endpoint URL for use in the extension

## Installation

### Prerequisites

- Google Chrome browser
- Internet connection (for API access)

### Installing the Extension

1. Clone the repository
```bash
git clone https://github.com/BlazingPh0enix/cyberguard
```

2. Open Chrome and go to the Extensions page
   - Type `chrome://extensions` in the address bar, or
   - Click the three dots menu → More Tools → Extensions

3. Enable Developer Mode
   - Toggle the "Developer mode" switch in the top right corner

4. Load the Extension
   - Click "Load unpacked"
   - Navigate to the CyberGuard directory
   - Select the folder containing `manifest.json`

The extension icon should now appear in your Chrome toolbar.

## Usage

1. Visit any Reddit page
2. The extension will automatically:
   - Monitor comments as they load
   - Analyze them for harmful content
   - Censor potentially harmful comments with asterisks (*)

### How it Works

- Comments are analyzed using a machine learning model via ModelBit API
- If a comment's toxicity probability is above 50%, it will be censored
- Censored text is replaced with asterisks matching the original length
- New comments are processed automatically as they load

### Troubleshooting

If the extension isn't working:
1. Check that it's enabled in Chrome Extensions
2. Ensure you have an active internet connection
3. Try refreshing the Reddit page
4. If problems persist, try disabling and re-enabling the extension

## Development

### Project Structure

- `manifest.json`: Extension configuration
- `content.js`: Main extension logic
- `icon.png`: Extension icon
- `train.ipynb`: Model training notebook

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/BlazingPh0enix/cyberguard/blob/main/LICENSE) file for details.