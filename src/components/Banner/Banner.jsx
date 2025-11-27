import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3${requests.fetchTrending}`);
        const movies = response.data.results;
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    }

    fetchData();
  }, []);

  // Truncate long descriptions
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // Handle Play button click
  const handlePlay = () => {
    if (trailerUrl) {
      setTrailerUrl(""); // close trailer if open
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log("Trailer not found:", err));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button-play" onClick={handlePlay}>
            {trailerUrl ? "Close" : "Play"}
          </button>
          <button className="banner-button-list">My List</button>
        </div>

        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner-fadeBottom"></div>

      {trailerUrl && (
        <div className="banner-trailer">
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </header>
  );
};

export default Banner;
