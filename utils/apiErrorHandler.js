// utils/apiErrorHandler.js
const apiErrorHandler = ({ error, setError, navigation }) => {
    switch (error?.status) {
      case 401:
        // Unauthorized - token expired or invalid
        setError('Session expired. Please login again.');
        navigation.navigate('Login');
        break;
      case 403:
        // Forbidden
        setError('You do not have permission to perform this action.');
        break;
      case 404:
        // Not Found
        setError('Resource not found.');
        break;
      case 422:
        // Validation Error
        setError('Please check your input and try again.');
        break;
      default:
        setError('Something went wrong. Please try again later.');
    }
  };
  