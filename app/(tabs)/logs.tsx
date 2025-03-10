import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const ipv4 = '16.171.140.7';
const port = '3000';

interface FileItem {
  name: string;
  added: string;  // or Date if you want to use Date objects directly
}

const LogScreen = () => {
  const [files, setFiles] = useState<FileItem[]>([]);  // Use the FileItem type for files
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For displaying any errors
  const [selectedFileUri, setSelectedFileUri] = useState<string | null>(null);

  useEffect(() => {
    const getFileList = async () => {
      try {
        const response = await fetch(`http://${ipv4}:${port}/list-files`);
        const data = await response.json();
        setFiles(data.files); // Set the list of files
        setLoading(false);
      } catch (error) {
        console.error('Error fetching file list:', error);
        setError('Failed to load files');
        setLoading(false);
      }
    };
    getFileList(); // Call the function to fetch the file list
  }, []);

  const handleFileSelect = (fileName: string) => {
    const fileUri = `http://${ipv4}:${port}/get-photo/${fileName}`; // Construct file URL
    setSelectedFileUri(fileUri); // Set the URI of the selected file
  };

  // Render each file in the list
  const renderFileItem = ({ item }: { item: FileItem }) => {
    return (
      <TouchableOpacity onPress={() => handleFileSelect(item.name)} style={styles.button}>
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Files</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text> // Display error message if any
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.name}  // Use unique key for each file
          renderItem={renderFileItem}
        />
      )}

      {/* Display the selected file */}
      {selectedFileUri ? (
        <Image source={{ uri: selectedFileUri }} style={styles.image} />
      ) : (
        <Text>Select a file to view</Text>
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
    textTransform: 'none', // Ensure text is not automatically capitalized
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default LogScreen;
