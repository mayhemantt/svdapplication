import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Dimensions,
  View,
  Spinner,
  HStack,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;

export const LoadingModal = () => {
  return (
    <React.Fragment>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.75)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <BlurView
          tint="light"
          intensity={1}
          style={{
            top: 0,
            position: 'relative',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            }}>
            <ActivityIndicator size={60} color="#fff" />
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                //  fontWeight: 'bold',
              }}>
              Loading
            </Text>
          </View>
        </BlurView>
      </View>
    </React.Fragment>
  );
};
