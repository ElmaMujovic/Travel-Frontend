import React from 'react';
import destination1 from './images/door.jpg';
import destination2 from './images/loc.png';
import destination3 from './images/mileage.png';

const PopularDestinations = () => {
  const destinations = [
    {
      img: destination1,
      title: "Paris, France",
      description: "The city of light, romance, and culture. Discover iconic landmarks and vibrant street life."
    },
    {
      img: destination2,
      title: "Tokyo, Japan",
      description: "A perfect blend of tradition and modernity. Experience the unique culture and stunning architecture."
    },
    {
      img: destination3,
      title: "New York, USA",
      description: "The city that never sleeps. Explore famous attractions, diverse neighborhoods, and world-class dining."
    }
  ];

  const styles = {
    popularDestinations: {
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    destinationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '1.5rem',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    destinationCard: {
      backgroundColor: '#fff',
      padding: '1rem',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      textAlign: 'left',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      overflow: 'hidden',
      position: 'relative'
    },
    destinationImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0'
    },
    destinationTitle: {
      fontSize: '1.25rem',
      margin: '0.5rem 0'
    },
    destinationDescription: {
      fontSize: '1rem',
      color: '#666'
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <div style={styles.popularDestinations}>
      <h2>Popular Destinations</h2>
      <div style={styles.destinationsGrid}>
        {destinations.map((dest, index) => (
          <div
            key={index}
            style={styles.destinationCard}
            className="destination-card"
          >
            <img src={dest.img} alt={dest.title} style={styles.destinationImage} />
            <h3 style={styles.destinationTitle}>{dest.title}</h3>
            <p style={styles.destinationDescription}>{dest.description}</p>
          </div>
        ))}
      </div>
      <style>
        {`
          .destination-card:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default PopularDestinations;
