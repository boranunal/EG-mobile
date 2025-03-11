import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router'; // Import Link from expo-router

interface Directory {
  name: string;
}

const ipv4 = '192.168.0.16';  // Server's IP address

const HomePage = () => {
  const [directories, setDirectories] = useState<string[]>([]); // Directory as an array of strings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        // Fetch the list of directories from the server
        const response = await axios.get(`http://${ipv4}:3000/list-directories`);
        console.log("Fetched directories:", response.data.directories);  // Log the directories for debugging
        
        // Validate and set the directories
        if (Array.isArray(response.data.directories)) {
          setDirectories(response.data.directories); // Save the list of directories
        } else {
          setError('Invalid directory data');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching directories:', err);
        setError('Failed to load directories');
        setLoading(false);
      }
    };

    fetchDirectories(); // Fetch directories from the server
  }, []);

  const renderDirectoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.fileItem}>
      <Link href={`/logs?directory=${item}`}> {/* Link to navigate with directory name */}
        <Text style={styles.fileName}>{item}</Text> {/* item is a string now */}
      </Link>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Directories</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text> // Display error message if any
      ) : (
        <FlatList
          data={directories} // directories is an array of strings
          keyExtractor={(item) => item}  // Use the directory name (string) as the key
          renderItem={renderDirectoryItem}
        />
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
  fileItem: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  fileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
