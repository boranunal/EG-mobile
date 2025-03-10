import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ipv4 = '192.168.0.22';
const port = '3000';

const LogScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // To display any errors
    const [files, setFiles] = useState([]);
    const [selectedFileUri, setSelectedFileUri] = useState<string | null>(null);
  
    useEffect(() => {
      // Fetch the list of files from the server
      const getFileList = async () => {
        try {
          const response = await fetch('http://'+ipv4+':'+port+'/list-files'); // Replace with your server's IP
          const data = await response.json();
          setFiles(data.files); // Save the list of files
        } catch (error) {
          console.error('Error fetching file list:', error);
        }
      };
      getFileList(); // Call the function to fetch the list of files
    }, []);

    const handleFileSelect = (fileName: String) => {
      const fileUri = 'http://'+ipv4+':'+port+'/get-photo/'+fileName; // Construct file URL
      setSelectedFileUri(fileUri); // Set the URI of the selected file
    };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Files</Text>

      {/* List the files */}
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFileSelect(item)} style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Display the selected file */}
      {selectedFileUri ? (
        <Image source={{ uri: selectedFileUri }} style={styles.image} />
      ) : (
        <Text>Select a file to view</Text>
      )}
    </View>
  );
};

// Function to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Converts the Blob into a Base64 string
    });
  };
// Define some basic styles
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