import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Auth() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Exemple de requête pour le login
const login = async (email, password) => {
  try {
    const response = await fetch('http://10.0.2.2:5149/api/User/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': email,
        'Password': password,
      }),
    });

    const data = await response.json();

    // Traitez la réponse du backend (par exemple, vérifiez les informations d'authentification)
    console.log(data);
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
};


  const onPressLogin = () => {
    // Do something about login operation
    login(email, password);
    navigation.navigate('Home');


  };
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
  };
  const onPressSignUp = () => {
    // Do something about signup operation
    navigation.navigate('Signup');

  };
  return (
    <ImageBackground
      source={require("../images/back_ground.png")}
      style={styles.container}
      blurRadius={2}

    >
      <View style={styles.formContainer}>
        <Text style={styles.title}> Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={setEmail}

          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}

          />
        </View>
        <TouchableOpacity
          onPress={onPressLogin}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressSignUp}
          style={styles.SignUpBtn}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
}

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

    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  formContainer: {
    marginTop: 200,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,

     // Semi-transparent white background

    
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
  },
  headerText: {
    textAlign: 'center', // Pour centrer le texte
    fontFamily: 'Cochin', // Remplacez 'YourCustomFont' par le nom de votre police personnalisée
    fontSize: 24, // Modifiez la taille de la police selon vos préférences
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 35,
    color: "#65aad7",
    marginBottom: 20,
    marginRight: 50,
    marginTop: 30
  },
  SignUpText: {
    color: "#65aad7",
    fontSize: 25,
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
    marginBottom: 10
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
    marginBottom: 10
  },
});
