import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/auth/Login';
import React from 'react';

const Stack = createStackNavigator();
export const LoginRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
