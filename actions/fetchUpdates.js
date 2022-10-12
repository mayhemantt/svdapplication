import Constants from 'expo-constants';

export const fetchUpdates = async () => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/todaysUpdates`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        servertoken: 'HelloServer@123',
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
