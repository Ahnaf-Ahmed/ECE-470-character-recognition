import numpy as np
import random
np.random.seed(1337)
random.seed(1337)



# Standard libraries
import pandas as pd
import sklearn as sk
import keras
from keras.models import Sequential
from keras.layers import Dense
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import cv2
import os



parentDir = os.path.dirname(__file__)
lettersDir = os.path.join(parentDir, 'letters')

print(lettersDir)

X_data = []
y_data = []

test = None
#loading the letters dataset
for dir in os.listdir(lettersDir):
    if dir.startswith("."):
        continue
    else:
        currentLetterPath = os.path.join(lettersDir,dir)
        print(currentLetterPath)
        yToInt = ord(dir)-55
        for filename in os.listdir(currentLetterPath):
            image = cv2.imread(os.path.join(currentLetterPath,filename), 0)
            X_data.append(image.flatten())
            y_data.append(yToInt)
              

XINT = np.array(X_data)
yINT = np.array(y_data)


#Taking the numbers dataset
from keras.datasets import mnist
(train_X, train_y), (test_X, test_y) = mnist.load_data()

train_X = train_X.reshape((-1, 784))
test_X = test_X.reshape((-1, 784))

xMnistCombined = np.append(train_X, test_X, axis=0)
yMnistCombined = np.append(train_y, test_y)


#Combining both Datasets
yINT = np.append(yINT, yMnistCombined)
XINT = np.append(XINT, xMnistCombined, axis=0)




X_train, X_test, y_train, y_test = train_test_split(XINT, yINT, test_size=0.33)

model = Sequential(name='470model')
model.add(Dense(128, input_shape=(784,), activation='sigmoid'))
model.add(Dense(36, activation='softmax'))

model.compile(loss='mean_squared_error', metrics=['accuracy'])


model.fit(X_train, to_categorical(y_train), epochs=5, batch_size=30)


loss, accuracy = model.evaluate(X_test, to_categorical(y_test))
print('Accuracy: %.2f' % (accuracy*100))






parentDir
model.save(parentDir+"/470model")





