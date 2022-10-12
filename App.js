import React from 'react';
import { NativeBaseProvider } from 'native-base';
import {
  Platform,
  Image,
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import { RootRoute } from './Routes/rootRoute';
import rootReducer from './reducers/rootReducer';
import { createStore } from 'redux';
import { versionCheck } from './actions/versionCheck';
import * as Linking from 'expo-linking';

const store = createStore(rootReducer);

export default function App() {
  const [isLatest, setIsLatest] = React.useState(true);
  React.useEffect(async () => {
    const res = await versionCheck();
    if (res && res?.response == 'success') {
      if (res.data.appV == '1') {
        setIsLatest(true);
      } else if (res.data.appV != '1') {
        setIsLatest(false);
      }
    }
  });

  const onPress = () => {
    if (Platform.OS === 'android') {
      Linking.canOpenURL(`market://details?id=com.aapdev.ukvolunteers`)
        .then(() => {
          Linking.openURL('market://details?id=com.aapdev.ukvolunteers');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (Platform.OS === 'ios') {
      console.log('IOS Not Supported Yet.');
    }
    return;
  };

  if (!isLatest) {
    return (
      <View>
        <Image
          source={require('./assets/splash.jpg')}
          style={{
            width: '100%',
            height: '100%',
            opacity: 1000,
            position: 'relative',
          }}
        />
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <Modal transparent={true}>
          <View style={{ marginTop: '28%' }}></View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#ffffff',
              justifyContent: 'space-evenly',
              alignSelf: 'center',
              width: '90%',
              borderRadius: 30,
              height: '40%',
              marginTop: '15%',
              elevation: 100,
              borderColor: 'black',
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Good News!
              </Text>
              <View style={{ marginTop: 7, width: '95%' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#727272',
                    fontWeight: '600',
                  }}>
                  A newer version of Application is available, with lot new
                  features and bugs fixing. Update the Aap Volunteers
                  Application now to continue.
                </Text>
              </View>
            </View>
            <View style={{ marginTop: '-5%' }}>
              <View
                style={{
                  backgroundColor: '#42b72a', // '#42b72a
                  width: 295,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  shadowRadius: 10,
                  marginTop: 5,
                }}>
                <TouchableOpacity onPress={() => onPress()}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '900',
                      fontSize: 20,
                    }}>
                    Update Now!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <React.Fragment>
      <Provider store={store}>
        <NativeBaseProvider>
          <RootRoute />
        </NativeBaseProvider>
      </Provider>
    </React.Fragment>
  );
}
