import pandas as pd
import joblib
from sklearn import preprocessing
#from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import sys

excel = pd.read_excel('crop.xlsx', header = 0)


lable = preprocessing.LabelEncoder()
crop = lable.fit_transform(list(excel["CROP"]))  # to associate numeric values to crops


NITROGEN_Content = list(excel["NITROGEN"])
PHOSPHORUS_Content = list(excel["PHOSPHORUS"])
POTASSIUM_Content = list(excel["POTASSIUM"])
TEMPERATURE = list(excel["TEMPERATURE"])
HUMIDITY_level = list(excel["HUMIDITY"])
PH_value = list(excel["PH"])
RAINFALL = list(excel["RAINFALL"])


Features = list(zip(NITROGEN_Content, PHOSPHORUS_Content, POTASSIUM_Content, TEMPERATURE, HUMIDITY_level, PH_value, RAINFALL))
Features = np.array([NITROGEN_Content, PHOSPHORUS_Content, POTASSIUM_Content, TEMPERATURE, HUMIDITY_level, PH_value, RAINFALL])

Features = Features.transpose()



#model = KNeighborsClassifier(n_neighbors=3)
#model.fit(features, crop)  # model training
regressor = RandomForestClassifier(n_estimators = 1000, random_state = 42)
regressor.fit(Features, crop)
# Taking inputs

nitrogen_content = float(sys.argv[1])
phosphorus_content = float(sys.argv[2])
potassium_content = float(sys.argv[3])
temperature_content = float(sys.argv[4])
humidity_content = float(sys.argv[5])                                                                                                  
ph_content = float(sys.argv[6])
rainfall = float(sys.argv[7])

predict_data = np.array([nitrogen_content,phosphorus_content, potassium_content, temperature_content, humidity_content, ph_content, rainfall])

predict1 = predict_data.reshape(1,-1)

predict_crop = regressor.predict(predict1) # predicting

crop_name = str()
if predict_crop == 0:
  crop_name = 'Apple'
elif predict_crop == 1:
  crop_name = 'Banana'
elif predict_crop == 2:
  crop_name = 'Blackgram'
elif predict_crop == 3:
  crop_name = 'Chickpea'
elif predict_crop == 4:
  crop_name = 'Coconut'
elif predict_crop == 5:
  crop_name = 'Coffee'
elif predict_crop == 6:
  crop_name = 'Cotton'
elif predict_crop == 7:
  crop_name = 'Grapes'
elif predict_crop == 8:
  crop_name = 'Jute'
elif predict_crop == 9:
  crop_name = 'Kidneybeans'
elif predict_crop == 10:
  crop_name = 'Lentil'
elif predict_crop == 11:
  crop_name = 'Maize'
elif predict_crop == 12:
  crop_name = 'Mango'
elif predict_crop == 13:
  crop_name = 'Mothbeans'
elif predict_crop == 14:
  crop_name = 'Mungbeans'
elif predict_crop == 15:
  crop_name = 'Muskmelon'
elif predict_crop == 16:
  crop_name = 'Orange'
elif predict_crop == 17:
  crop_name = 'Papaya'
elif predict_crop == 18:
  crop_name = 'Pigeonpeas'
elif predict_crop == 19:
  crop_name = 'Pomegranate'
elif predict_crop == 20:
  crop_name = 'Rice'
elif predict_crop == 21:
  crop_name = 'Watermelon'

print(crop_name)
joblib.dump(regressor, 'RegressorRFC.pkl')