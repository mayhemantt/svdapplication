import Constants from 'expo-constants';

export const loginUser = async (phoneNumber) => {
  try {
    return await fetch(`${Constants.manifest.extra.apiKey}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        servertoken: 'HelloServer@123',
      },
      body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` }),
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

export const registerAnonymousUser = async (phoneNumber, vidhanShabha) => {
  try {
    return await fetch(
      `${Constants.manifest.extra.apiKey}/registerAnonymousUser`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          servertoken: 'HelloServer@123',
        },
        body: JSON.stringify({
          phoneNumber: `+91${phoneNumber}`,
          vidhanShabha: vidhanShabha,
        }),
      }
    )
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
