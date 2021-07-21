import base64
import os
import json
import numpy as np
import keras
import cv2

def predictCharacter(b64string):
    image_string = b64string
    img_data = base64.b64decode(image_string)
    nparr = np.fromstring(img_data, np.uint8)
    # TODO: Resize array with cv2.resize here
    img_np = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)

    im = img_np.flatten()
    im = np.array([im])

    projectDir = os.path.dirname(os.path.dirname(__file__))

    model = keras.models.load_model(projectDir+"/470model")

    yPred = model.predict(im)

    #sorts from indices least to most likely
    predictions = np.argsort(yPred[0])

    results = [None,None,None,None]
    accuracy = [None,None,None,None]

    #values under 10 are numbers, over 10 are letters and need to be converted
    for i in range(1,5):
        predIndex = predictions[-i]
        accuracy[i-1] = yPred[0][predIndex]*100
        results[i-1] = str(predIndex) if predIndex<10 else chr(predIndex+55)


    data = {
        "character": results[0],
        "accuracy": accuracy[0],
        "alt_characters": [
            {
                "character": results[1],
                "accuracy": accuracy[1]
            },
            {
               "character": results[2],
                "accuracy": accuracy[2]
            },
            {
               "character": results[3],
                "accuracy": accuracy[3]
            }
        ]
    }

    return json.dumps(data)
