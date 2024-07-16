import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedGenres, getFeaturedArtists } from '../utils/aptos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Explore = () => {
  const [featuredGenres, setFeaturedGenres] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGenres = await getFeaturedGenres();
        setFeaturedGenres(fetchedGenres);

        const fetchedArtists = await getFeaturedArtists();
        setFeaturedArtists(fetchedArtists);
      } catch (error) {
        console.error('Error fetching explore data:', error);
        toast.error('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="explore-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="featured-genres">
            <h3>Featured Genres</h3>
            <ul>
              {featuredGenres.map((genre) => (
                <li key={genre.id}>
                  <Link to={`/genre/${genre.id}`}>{genre.name}</Link> 
                </li>
              ))}
            </ul>
          </div>

          <div className="featured-artists">
            <h3>Featured Artists</h3>
            <div className="artist-grid">
              {featuredArtists.map((artist) => (
                <Link to={`/artist/${artist.address}`} key={artist.address}>
                  {/* Display artist card/thumbnail here */}
                  <img src={artist.profileImage} alt={artist.name} />
                  <p>{artist.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
