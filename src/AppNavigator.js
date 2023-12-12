import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/Splash';
import Home from './screens/Home';
import BookAppointment from './screens/BookAppointment';
import Success from './screens/Success';
import Pending from './screens/Pending';
import Completed from './screens/Completed';
import CallAmb from './screens/CallAmb';
import Welcome from './screens/Welcome';
import Auth from './Auth/Auth';
import Signup from './Auth/Signup';
import PredictionForm from './screens/PredictionForm';
import PredictionResult from './screens/PredictionResult';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          component={Welcome}
          name="Welcome"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={Auth}
          name="Auth"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={Signup}
          name="Signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BookAppointment}
          name="BookAppointment"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Success}
          name="Success"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={PredictionResult}
          name="PredictionResult"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Pending}
          name="Pending"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Completed}
          name="Completed"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={CallAmb}
          name="CallAmb"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={PredictionForm}
          name="PredictionForm"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
