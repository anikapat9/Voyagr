// components/Reviews.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RatingStars = ({ rating, setRating, readonly = false }) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => !readonly && setRating(star)}
          disabled={readonly}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Reviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([
    // Mock data - replace with API data later
    {
      id: '1',
      user: 'John Doe',
      rating: 4,
      comment: 'Great place! Highly recommend.',
      date: '2024-02-10',
    },
    // Add more mock reviews
  ]);
  
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  const addReview = () => {
    const review = {
      id: Date.now().toString(),
      user: 'Current User', // Replace with actual user data
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
    setShowAddReview(false);
  };

  const ReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <RatingStars rating={item.rating} readonly />
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={() => setShowAddReview(true)}
        >
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <Modal
        visible={showAddReview}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            
            <Text style={styles.ratingLabel}>Your Rating</Text>
            <RatingStars
              rating={newReview.rating}
              setRating={(rating) => setNewReview({ ...newReview, rating })}
            />

            <Text style={styles.commentLabel}>Your Review</Text>
            <TextInput
              style={styles.commentInput}
              multiline
              numberOfLines={4}
              value={newReview.comment}
              onChangeText={(comment) => setNewReview({ ...newReview, comment })}
              placeholder="Share your experience..."
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddReview(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={addReview}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addReviewButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
  },
  addReviewButtonText: {
    color: '#fff',
  },
  reviewItem: {
    padding: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewComment: {
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  commentLabel: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#666',
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default Reviews;
