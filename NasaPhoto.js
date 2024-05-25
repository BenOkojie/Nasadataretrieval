import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NasaPhoto = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=rVv1TofHHDoYY7pbwKuE6tlaxZa7dJN4ph94STNw
        `);
        setPhotoData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {photoData && (
        <div>
          <h1>{photoData.title}</h1>
          <p>{photoData.date}</p>
          <img src={photoData.url} alt={photoData.title} style={{ width: '100%', height: 'auto' }} />
          <p>{photoData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default NasaPhoto;
