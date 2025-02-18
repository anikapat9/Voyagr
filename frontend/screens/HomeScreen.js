// screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { userData } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome back, {userData?.name || 'Traveler'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Places</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add trending places cards here */}
          <TouchableOpacity style={styles.card}>
            <Text>Popular Destination 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>Popular Destination 2</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add restaurant cards here */}
          <TouchableOpacity style={styles.card}>
            <Text>Restaurant 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>Restaurant 2</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Activities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add activity cards here */}
          <TouchableOpacity style={styles.card}>
            <Text>Activity 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>Activity 2</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    width: 150,
    height: 200,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
