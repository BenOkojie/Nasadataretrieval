import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsteroidTable = () => {
  const [endDate, setEndDate] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + (i + 1) * 10);

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    if (endDate) {
      const fetchAsteroids = async () => {
        setLoading(true);
        setError(null);
        try {
          const startDate = new Date().toISOString().split('T')[0];
          const apiKey = process.env.REACT_APP_NASA_API_KEY;
          const response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?api_key=PnMjpac5ZkeoMhnD8RUVehauE7lfNkfGaLPreg57
            `
          );
          setAsteroids(response.data.near_earth_objects);
        } catch (error) {
          setError(error);
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      };
      fetchAsteroids();
    }
  }, [endDate]);

  return (
    <div>
      <h1>Asteroids Closest Approach to Earth</h1>
      

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Closest Approach Date</th>
            <th>Miss Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(asteroids).map((date) =>
            asteroids[date].map((asteroid) => (
              <tr key={asteroid.id}>
                <td>{asteroid.name}</td>
                <td>{asteroid.close_approach_data[0].close_approach_date}</td>
                <td>{asteroid.close_approach_data[0].miss_distance.kilometers}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AsteroidTable;
