import Constants from 'expo-constants';

export const pushUpdates = async (data) => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/pushUpdates`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        servertoken: 'HelloServer@123',
      },
      body: JSON.stringify({
        updateData: data,
      }),
    })
      .then(() => {
        return 'done';
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
