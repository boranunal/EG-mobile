import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Correct hook to access query params

const ipv4 = '192.168.0.16';
const port = '3000';

const LogScreen = () => {
  const [files, setFiles] = useState<string[]>([]); // List of image files in the directory
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFileUri, setSelectedFileUri] = useState<string | null>(null);

  const { directory } = useLocalSearchParams(); // Extract 'directory' from query params

  useEffect(() => {
    const getFileList = async () => {
      try {
        const response = await fetch(`http://${ipv4}:${port}/list-files/${directory}`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setFiles(data.files); // Set the files array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching file list:', error);
        setError('Failed to load files');
        setLoading(false);
      }
    };

    if (directory) {
      getFileList(); // Fetch the file list for the given directory
    }
  }, [directory]);

  const handleFileSelect = (fileName: string) => {
    const fileUri = `http://${ipv4}:${port}/get-photo/${directory}/${fileName}`; // Construct file URL
    setSelectedFileUri(fileUri); // Set the URI for the selected file to be displayed
  };

  const renderFileItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleFileSelect(item)} style={styles.button}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Files in {directory}</Text>

      {loading ? (
        <Text>Loading...</Text> // Show loading message
      ) : error ? (
        <Text>{error}</Text> // Show error message if any
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item} // Ensure unique key for each file
          renderItem={renderFileItem}
        />
      )}

      {selectedFileUri ? (
        <Image source={{ uri: selectedFileUri }} style={styles.image} />
      ) : (
        <Text>Select a file to view</Text> // Show this when no file is selected
      )}
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default LogScreen;
