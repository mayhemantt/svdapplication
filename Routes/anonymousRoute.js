import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/home/Home';
import EventScreen from '../Screen/home/event/Event';
import { AnonymousScreen } from '../Screen/anonymousHome';
import { AnonymousEventScreen } from '../Screen/anonymous/Event';
const Stack = createStackNavigator();

export const AnonymousRoute = () => {
  return (
    <Stack.Navigator initialRouteName="AnonymousHomeScreen">
      <Stack.Screen
        name="AnonymousHomeScreen"
        component={AnonymousScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AnonymousEventScreen"
        component={AnonymousEventScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
