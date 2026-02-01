import { useState, useCallback } from 'react';

/**
 * Custom hook for handling API fetch requests
 * Provides loading, error, and data states with reusable fetch logic
 * 
 * @param {string} baseUrl - Optional base URL for all requests
 * @returns {Object} - { data, loading, error, fetchData }
 */
const useFetch = (baseUrl = '') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint = '') => {
    const url = baseUrl + endpoint;
    
    if (!url) {
      setError('No URL provided');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
      return jsonData;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
      return null;
    }
  }, [baseUrl]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchData, reset };
};

export default useFetch;
