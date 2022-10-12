import Constants from 'expo-constants';

export const fetchPreviousEvents = async () => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/pastEvents`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        servertoken: 'HelloServer@123',
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
