// screens/ExploreScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Slider from '@react-native-community/slider';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 4], // 0-4 price levels
    rating: 0, // minimum rating
    distance: 10, // km
  });

  // Mock data with coordinates
  const places = [
    {
      id: '1',
      name: 'Central Park',
      category: 'Attractions',
      rating: 4.8,
      price: 2,
      coordinate: {
        latitude: 40.7829,
        longitude: -73.9654,
      },
    },
    // Add more places...
  ];

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filters</Text>
          
          <Text style={styles.filterLabel}>Price Range</Text>
          <View style={styles.priceButtons}>
            {['$', '$$', '$$$', '$$$$'].map((price, index) => (
              <TouchableOpacity
                key={price}
                style={[
                  styles.priceButton,
                  filters.priceRange[1] >= index && styles.selectedPrice,
                ]}
                onPress={() => setFilters({
                  ...filters,
                  priceRange: [0, index],
                })}
              >
                <Text style={styles.priceButtonText}>{price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterLabel}>Minimum Rating</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            value={filters.rating}
            onValueChange={(value) =>
              setFilters({ ...filters, rating: value })
            }
          />
          <Text>{filters.rating} stars</Text>

          <Text style={styles.filterLabel}>Maximum Distance</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={filters.distance}
            onValueChange={(value) =>
              setFilters({ ...filters, distance: value })
            }
          />
          <Text>{filters.distance} km</Text>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const MapToggle = () => (
    <TouchableOpacity
      style={styles.mapToggle}
      onPress={() => setShowMap(!showMap)}
    >
      <Ionicons
        name={showMap ? "list" : "map"}
        size={24}
        color="#007AFF"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showMap ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7829,
            longitude: -73.9654,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={place.coordinate}
              title={place.name}
              description={place.category}
              onPress={() => navigation.navigate('PlaceDetails', { place })}
            />
          ))}
        </MapView>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => renderCategoryButton(category))}
          </ScrollView>

          <FlatList
            data={places}
            renderItem={renderPlaceCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.placesContainer}
          />
        </>
      )}

      <MapToggle />
      <FilterModal />
    </View>
  );
};

// Add to existing styles
const styles = StyleSheet.create({
  // ... existing styles ...
  
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  selectedPrice: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  mapToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
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

export default ExploreScreen;

