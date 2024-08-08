import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { User } from '../types';

const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://random-data-api.com/api/users/random_user?size=80',
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const user = users[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.main}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{user.id}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>UID:</Text>
            <Text style={styles.value}>{user.uid}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Password:</Text>
            <Text style={styles.value}>{user.password}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.value}>{user.first_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.value}>{user.last_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.previousButton]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={handleNext}
              disabled={currentIndex === users.length - 1}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
  },
  main: {
    marginTop: 20,
    width: '100%',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#37474f',
    fontSize: 16,
  },
  value: {
    color: '#37474f',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#3498db',
  },
  nextButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserScreen;
