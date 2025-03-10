
export const sendPushTokenToServer = async (pushToken: String) => {
  try {
    const response = await fetch('http://16.171.140.7:3000/register-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushToken,
      }),
    });

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error sending push token to server:', error);
  }
};

//  export const sendLogRequestToServer
