import  { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../utils/requests.js";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
// Fetch a random trending movie when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3${requests.fetchTrending}`
        );
        const movies = response.data.results;
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchData();
  }, []);

  // Function to truncate long descriptions
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };


  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat"
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button-play">Play</button>
          <button className="banner-button-list">My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom"></div>
    </div>
  );
};

export default Banner;
