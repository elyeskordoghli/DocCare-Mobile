import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';

export default function Welcome({navigation}) {
  return (
    <ImageBackground 
      source={require("../images/back_ground.png")}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>DocCare Application</Text>
        <Text style={styles.subHeaderText}>Your health, our priority. Yes we care</Text>
        <TouchableOpacity
           onPress={() => {
            navigation.navigate('Auth');
        }}
          style={styles.startBtn}>
          <Text >Get Started</Text>
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
  formContainer: {
    padding: 20,
    marginTop: 500,
    borderRadius: 10,
    width: '80%',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 15,  // Rendre le bouton un peu rond
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 24,
    color: 'white',  // Couleur du texte
  },
  subHeaderText: {
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 18,
    color: 'white',  // Couleur du texte
  },
  startBtn: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10
  },
});
