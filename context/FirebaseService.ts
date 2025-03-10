import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const storePushToken = async () => {
    try {
      // Get the Expo push token
      const { data: pushToken } = await Notifications.getExpoPushTokenAsync();
  
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('expoPushToken', pushToken);
      console.log('Push token stored successfully!');
    } catch (error) {
      console.error('Error storing push token:', error);
    }
  };