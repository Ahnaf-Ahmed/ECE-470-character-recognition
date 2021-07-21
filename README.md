# ECE470: Optical Character Recognition AI
*By Ahnaf Ahmed, Annie Zhou, and Nilay Sondagar*

**UVic - July 2021**
## Overview
This project is an OCR AI application, consisting of a backend machine learning model, an identification and analysis API, and a frontend web app built for mobile. Using the web app, you can draw a character that is then submitted to the machine learning model via the API. The result is then shown to the user, who can then mark whether the identified character was correct or not. The statistics of how many identifications were accurate is also visible through the web app.

## Technologies and Libraries
This project is separated into a "frontend" and a "backend", both of which are usable independently. The backend uses the following to expose an API, perform an ML identification, and store data in a cloud database:
- Python 3
- Numpy
- Keras
- Pandas
- OpenCV
- SKLearn
- Flask (and Flask-Cors)
- FaunaDB
- Base64 Image Decoding

The frontend uses the following to expose the user interface to end users and submit API requests:
- NPM
- Sass
- HTML5 / CSS3 / JavaScript (ES7)
- SVG
- ReactJS
- React Router 5
- `fetch` API for sending requests
- `react-canvas-draw`
- Base64 Image Encoding

## Installation & Development
As this project consists of two smaller projects, it does require a somewhat lengthy set up. It is recommended to use a Python virtual environment with `venv` to prevent package conflicts and installation errors. Follow the below instructions to run both the frontend and backend:
1. Clone the Git repository.
2. Navigate into the repository from the command line:
    ```sh
    cd ECE-470-character-recognition
    ```
3. Ensure you are using Python 3 by running:
    ```sh
    python -V
    ```
4. Install the Python modules required for `ocr_engine` to run:
    ```sh
    pip3 install -r ./ocr_engine/requirements.txt
    ```
5. Export the necessary Flask environment variables:
    ```sh
    export FLASK_APP=ocr_engine/app
    export FLASK_ENV=development
    ```
6. Run the backend and API through Flask:
    ```sh
    flask run
    ```
7. A development server should now have begin. This needs to remain open and running to ensure the API receives requests. It is accessible via `http://127.0.0.1:5000`
8. Open a new terminal window.
9. Navigate to the frontend application:
    ```sh
    cd ocr_frontend
    ```
10. Ensure you have NPM installed by running:
    ```sh
    npm help
    ```
11. Install the necessary modules required by the frontend:
    ```sh
    npm install
    ```
    If you receive any undecipherable installation errors, try deleting the `package-lock.json` file and try running the above command again.
12. Start the frontend application in development mode:
    ```sh
    npm start
    ```
13. The frontend should now be running, accessible via `localhost:3000`. It should open in a new browser tab automatically. This application is optimized for mobile, so it is recommended to set the simulated screen size to the equivalent of **iPhone X / 8 Plus / 12 Pro** in your browser's developer tools.

The entire application should now be usable! The following functions are available at the following paths:
- `/` - The homepage. You can navigate to other pages from this page.
- `/identify` - The character identifier. Here you can identify a drawn character and mark it as correct or incorrect.
- `/stats` - The statistics page. Here you can see how many character identifications were accurate, inaccurate, or unmarked.

## Machine Learning Details
The details of how the model was created and functions is detailed in our associated ECE470 Final Project Report. The model has been saved in order to prevent API requests from taking too long, and can be found at `/470model` in this repository.

The dataset used for training the model was retrieved from Kaggle, available [here](https://www.kaggle.com/sachinpatel21/az-handwritten-alphabets-in-csv-format).
