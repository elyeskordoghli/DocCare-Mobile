import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { predictCardiacDisease, predictLungDisease } from '../services/PredictionService';

const categoryForms = {
  '1': ['Age', 'Pression_arterielle', 'Cholesterol'],
  '2': ['toux', 'essoufflement', 'fievre', 'douleur_thoracique', 'expectorations', 'fatigue'],
  // Ajoutez plus de catégories et de champs au besoin
};

const PredictionForm = ({ route }) => {
  const { categoryId } = route.params;
  const [formValues, setFormValues] = useState(null);
  const navigation = useNavigation();

  const onPressCancel = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    setFormValues(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const submitForm = async () => {
    try {
      let result;
  
      // Convertissez les valeurs du formulaire en entiers si nécessaire
      const numericFormValues = {};
      for (const field in formValues) {
        numericFormValues[field] = parseInt(formValues[field], 10);
      }
  
      const queryParams = new URLSearchParams(numericFormValues).toString();
  
      if (categoryId === '1') {
        console.log('formValues:', numericFormValues);
  
        result = await predictCardiacDisease(queryParams);
        navigation.navigate('PredictionResult', {
          predictedDisease: result.prediction === 1 ? 'Cardiac Disease.\n Please consult a doctor.' : 'No Cardiac Disease. However, it is recommended to consult a doctor for a thorough examination.',
        });
      } else if (categoryId === '2') {
        result = await predictLungDisease(queryParams);
        navigation.navigate('PredictionResult', {
          predictedDisease: result.prediction ,
        });
      } else {
        return;
      }
  
      console.log('Prediction Result:', result);
  
      // Reste du code inchangé...
    } catch (error) {
      console.error('Prediction Error:', error);
      Alert.alert('Prediction Error', 'An error occurred during prediction. Please try again.');
    }
  };
  
  
  return (
    <ImageBackground
      source={require("../images/back_ground.png")}
      style={styles.container}
      blurRadius={2}
    >
      {categoryForms[categoryId] && (
        <View style={styles.formContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.title}>Prediction Form</Text>
            {categoryForms[categoryId].map((field, index) => (
              <View key={index} style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder={`Enter ${field}`}
                  placeholderTextColor="#003f5c"
                  value={formValues?.[field]}
                  onChangeText={(text) => handleChange(field, text)}
                />
              </View>
            ))}
            <TouchableOpacity onPress={submitForm} style={styles.loginBtn}>
              <Text style={styles.loginText}>Predict</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressCancel} style={styles.SignUpBtn}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    borderWidth: 0.5,
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  formContainer: {
    marginTop: 140,
    marginBottom: 20,

    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#65aad7",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  SignUpBtn: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  cancelText: {
    color: "#65aad7",
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 32,
    color: "#65aad7",
    marginBottom: 20,
    marginRight: 40,
    marginLeft: 40,

    marginTop: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    
  },
});

export default PredictionForm;
