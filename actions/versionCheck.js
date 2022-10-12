import Constants from 'expo-constants';

export const versionCheck = async () => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/appVersion`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        servertoken: 'HelloServer@123',
      },
    })
      .then(async (response) => {
        console.log(`${Constants.manifest.extra.apiKey}/todaysEvent`);
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
