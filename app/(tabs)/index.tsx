import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router'; // Import Link from expo-router

interface File {
  name: string;
  added: string;
}

const ipv4 = '16.171.140.7';

const HomePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://${ipv4}:3000/list-files`);
        setFiles(response.data.files);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load files');
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const renderFileItem = ({ item }: { item: File }) => (
    <TouchableOpacity style={styles.fileItem}>
      {/* Use Link component for navigation */}
      <Link href={`/image?fileName=${item.name}`}>
        <Text style={styles.fileName}>{item.name}</Text>
        <Text style={styles.fileDate}>Added: {new Date(item.added).toLocaleString()}</Text>
      </Link>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploaded Files</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.name}
          renderItem={renderFileItem}
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
  fileDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomePage;
