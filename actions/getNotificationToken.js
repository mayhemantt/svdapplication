import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const registerForPushNotification = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Notification Permission Declined.');
    return;
  }

  let token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  await registerToServerPushNotification(token);
  return token;
};

export const registerToServerPushNotification = async (token) => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/registerPushToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        servertoken: 'HelloServer@123',
        token: token,
      },
    })
      .then(() => {
        return 'Done';
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
