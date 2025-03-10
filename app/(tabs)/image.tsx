import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Hook to read URL params

const ipv4 = '16.171.140.7';

const ImagePage = () => {
  const { fileName } = useLocalSearchParams(); // Retrieve fileName from query params

  const fileUri = `http://${ipv4}:3000/get-photo/${fileName}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image: {fileName}</Text>
      <Image source={{ uri: fileUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default ImagePage;
