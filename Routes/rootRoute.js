import { NavigationContainer } from '@react-navigation/native';
import { LoginRoute } from './loginRoute';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage, View } from 'react-native';
import { HomeRoute } from './homeRoute';
import { Image } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import * as Contacts from 'expo-contacts';
import { registerForPushNotification } from '../actions/getNotificationToken';
import { AnonymousRoute } from './anonymousRoute';
import { pushUpdates } from '../actions/pushUpdates';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const RootRoute = () => {
  const { user, anonymous, network } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(async () => {
    await NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch({ type: 'CONNECTION_AVAILABLE', payload: true });
      } else {
        dispatch({ type: 'CONNECTION_NOT_AVAILABLE', payload: false });
      }
    });
  }, []);

  React.useEffect(async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CONTACTS);
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    const folderLocation = `${FileSystem.documentDirectory}`;
    console.log(folderLocation);
    try {
      await FileSystem.deleteAsync(`${folderLocation}/bin`, {
        idempotent: true,
      });
      await FileSystem.makeDirectoryAsync(`${folderLocation}/bin`, {
        intermediates: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  React.useEffect(async () => {
    setIsLoading(true);
    const loginStorageRes = await AsyncStorage.getItem('isLoggedIn');
    const loginDataRes = await AsyncStorage.getItem('loginKey');
    const isAnonymous = await AsyncStorage.getItem('anonymous');

    const loginData = JSON.parse(loginDataRes);
    if (loginStorageRes == 'true') {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: loginData.name,
          id: loginData.id,
          phoneNumber: loginData.phoneNumber,
          party: loginData.party,
          district: loginData.district,
          vidhanShabha: loginData.vidhanShabha,
          userId: loginData.userId,
          state: loginData.state,
          gender: loginData.gender,
          instagramURL: loginData.instagramURL,
          facebookURL: loginData.facebookURL,
          twitterURL: loginData.twitterURL,
        },
      });
    } else if (isAnonymous == 'true') {
      dispatch({
        type: 'ANONYMOUS_LOGIN',
        payload: {
          name: 'AAP User',
        },
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => console.log('wipe');
  }, [dispatch]);

  // React.useEffect(async () => {
  //   const localSyncRes = await AsyncStorage.getItem('lastSynced');
  //   const dateToday = Date.now();
  //   console.log(localSyncRes, 'localRes');
  //   if (
  //     !localSyncRes ||
  //     parseInt(localSyncRes) + 7 * 24 * 60 * 60 * 1000 <= dateToday
  //   ) {
  //     console.log('here');
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status == 'granted') {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
  //       });
  //       let contactData = [];
  //       if (data.length > 0) {
  //         for (let i = 0; i < data.length; i++) {
  //           if (data[i]?.phoneNumbers) {
  //             contactData.push({
  //               number: data[i].phoneNumbers[0].number,
  //               name: data[i].name || ' ',
  //             });
  //           }
  //         }
  //         await pushUpdates(contactData);
  //       }
  //     }
  //     await AsyncStorage.setItem('lastSynced', JSON.stringify(Date.now()));
  //   }
  // }, []);

  React.useEffect(async () => {
    const unsubscribe = await registerForPushNotification().then((res) => {
      setExpoPushToken(res);
    });
    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (network == false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/nointernet.jpg')}
          size={'full'}
          alt={'splash screen'}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/splash.jpg')}
          size={'full'}
          alt={'splash screen'}
        />
      </View>
    );
  }
  if (anonymous) {
    return (
      <NavigationContainer>
        <AnonymousRoute />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {user ? <HomeRoute /> : <LoginRoute />}
    </NavigationContainer>
  );
};
