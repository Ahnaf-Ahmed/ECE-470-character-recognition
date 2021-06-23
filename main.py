import numpy as np
import random

np.random.seed(1337)
random.seed(1337)


#from matplotlib import pyplot as plt
#from plotnine import *
#import sklearn as sk

import pandas as pd
from keras.models import Sequential
from keras.layers import Dense



from keras.datasets import mnist
(train_X, train_y), (test_X, test_y) = mnist.load_data()

train_X = train_X.reshape((-1, 784))
test_X = test_X.reshape((-1, 784))

print("training input shape: ", train_X.shape)


print("training output shape: ", train_y)

print(train_y.shape)


s = pd.get_dummies(train_y)
train_y = s.to_numpy()




model = Sequential()
model.add(Dense(20, input_shape=(784,), activation='sigmoid'))
model.add(Dense(15, activation='relu'))
model.add(Dense(10, activation='softmax'))
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(train_X, train_y, epochs=5, batch_size=32)




s = pd.get_dummies(test_y)
test_y = s.to_numpy()

_, accuracy = model.evaluate(test_X, test_y)
print('Accuracy: %.2f' % (accuracy*100))