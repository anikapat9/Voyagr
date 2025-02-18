// screens/AuthScreens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const passwordRules = {
  hasNumber: /\d/,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRules.hasNumber, 'Password must contain at least one number')
    .matches(passwordRules.hasUppercase, 'Password must contain at least one uppercase letter')
    .matches(passwordRules.hasLowercase, 'Password must contain at least one lowercase letter')
    .matches(passwordRules.hasSpecialChar, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (!password) return score;

    // Add points for length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Add points for complexity
    if (passwordRules.hasNumber.test(password)) score++;
    if (passwordRules.hasUppercase.test(password)) score++;
    if (passwordRules.hasLowercase.test(password)) score++;
    if (passwordRules.hasSpecialChar.test(password)) score++;

    return score;
  };

  const strength = getStrength();
  const getColor = () => {
    if (strength < 2) return '#ff4444'; // Weak - Red
    if (strength < 4) return '#ffbb33'; // Medium - Orange
    return '#00C851'; // Strong - Green
  };

  const getLabel = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthBar}>
        <View style={[
          styles.strengthIndicator,
          { 
            width: `${(strength / 6) * 100}%`,
            backgroundColor: getColor()
          }
        ]} />
      </View>
      <Text style={[styles.strengthText, { color: getColor() }]}>
        {password ? getLabel() : ''}
      </Text>
    </View>
  );
};

const RegisterScreen = () => {
  const { signUp } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={values => signUp(values.email, values.password)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />
            <PasswordStrengthIndicator password={values.password} />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity 
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  strengthContainer: {
    marginBottom: 15,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 5,
  },
  strengthIndicator: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    textAlign: 'right',
  }
});

export default RegisterScreen;

