import Constants from 'expo-constants';

export const userEvent = async ({ phoneNumber, action, data, userId }) => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/userEvent`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        servertoken: 'HelloServer@123',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        action: action,
        data: data,
        userId,
      }),
    })
      .then((response) => {
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {}
};
