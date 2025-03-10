import { Text, View, StyleSheet} from "react-native";
import {Link} from 'expo-router';
import { useNotification } from "@/context/NotificationContext";
import { sendPushTokenToServer } from "@/context/StoreTokens";

export default function Index() {
  const { notification, expoPushToken, error } = useNotification();
  console.log(JSON.stringify(notification, null, 2));
  sendPushTokenToServer(String(expoPushToken));
  return (
    <View style={styles.container}>
      <Text style={styles.text}>title:</Text>
      <Text style={styles.text}>{notification?.request.content.title}</Text>
      <Text style={styles.text}>notification:</Text>
      <Text style={styles.text}>{JSON.stringify(notification?.request.content.data, null, 2)}</Text>
      <Text style={styles.text}>expo push token: </Text>
      <Text style={styles.text}>{expoPushToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
