import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = async () => {
    try {
      // Validation des champs
      if (!email || !password || !confirmPassword) {
        Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Mots de passe non identiques', 'Veuillez saisir des mots de passe identiques.');
        return;
      }
      console.log('Email:', email);
      console.log('Password:', password);
      // Appel à l'API pour l'inscription
      const response = await fetch('http://10.0.2.2:5149/api/User/NewUserSignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'Email': email,
          'Password': password,
        }),
      });
      if (response.ok) {
        Alert.alert('Inscription réussie', 'Vous pouvez maintenant vous connecter.');
        navigation.navigate('Auth'); // Redirection vers la page de connexion
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur lors de l\'inscription', errorData.message || 'Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      Alert.alert('Erreur réseau', 'Veuillez vérifier votre connexion Internet.');
    }
  };

  const onPressSignUp = () => {
    // Do something about signup operation
    signup();
    Alert.alert('Login Info', `Email: ${email}\nPassword: ${password}`);
    navigation.navigate('Auth');

  };
  const onPressCancel = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  const handleLogin = () => {
    // Afficher une alerte avec l'email et le mot de passe saisis
    Alert.alert('Login Info', `Email: ${email}\nPassword: ${password}`);
  };

  const handleCreateUser = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground
      source={require("../images/back_ground.png")}
      style={styles.container}
      blurRadius={2}

    >
      <View style={styles.formContainer}>
        <Text style={styles.title}> Sign Up</Text>
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={setConfirmPassword}

          />
        </View>
        <TouchableOpacity
          onPress={onPressSignUp}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCancel} style={styles.SignUpBtn}>
          <Text style={styles.loginText}>CANCEL</Text>
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
