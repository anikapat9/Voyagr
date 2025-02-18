import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reviews from '../../components/Reviews';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type PlaceDetailsProps = StackScreenProps<RootStackParamList, 'PlaceDetails'>;

const PlaceDetails = ({ route, navigation }: PlaceDetailsProps) => {
  const { place } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      const bookmarksList = bookmarks ? JSON.parse(bookmarks) : [];
      setIsBookmarked(bookmarksList.some((item) => item.id === place.id));
    } catch (error) {
      console.error('Error checking bookmarks:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      let bookmarksList = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        bookmarksList = bookmarksList.filter((item) => item.id !== place.id);
      } else {
        bookmarksList.push(place);
      }

      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarksList));
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error updating bookmarks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleBookmark}>
            <Ionicons
              name={isBookmarked ? 'heart' : 'heart-outline'}
              size={24}
              color={isBookmarked ? '#ff4444' : '#007AFF'}
            />
            <Text style={styles.buttonText}>{isBookmarked ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Maps', { place })}
          >
            <Text style={styles.primaryButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewsContainer}>
          <Reviews placeId={place.id} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 16, // Optional
    fontWeight: 'bold', // Optional
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default PlaceDetails;
