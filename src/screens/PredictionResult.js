import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const PredictionResult = ({ route, navigation }) => {
  const { predictedDisease } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../images/prediction.png')} style={styles.success} />
      <Text style={styles.msg}>{`You may have: ${predictedDisease}`}</Text>
      <TouchableOpacity
        style={styles.gotohome}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    width: 200,
    height: 200,
  },
  msg: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  gotohome: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 30,
  },
});

export default PredictionResult;
