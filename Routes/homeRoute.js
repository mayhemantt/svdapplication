import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/home/Home';
import EventScreen from '../Screen/home/event/Event';
import PastEvents from '../Screen/home/past/pastEvents';
const Stack = createStackNavigator();

export const HomeRoute = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="PastDaysEvent"
        component={PastEvents}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
