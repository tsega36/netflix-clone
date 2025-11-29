import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import "./Row.css";

// Base URL for TMDB images
const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLarge }) => {
  // Store movie list
  const [movies, setMovies] = useState([]);

  // Store trailer video ID
  const [trailerUrl, setTrailerUrl] = useState("");

  // Fetch movies on page load OR when fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results); // Save movies in state
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }
    fetchData();
  }, [fetchUrl]);


  const handleClick = (movie) => {

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movie-trailer finds YouTube trailer
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          // Extract YouTube video ID (v=xxxxx)
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => console.log("Trailer not found"));
    }
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>

      <div className="row-posters">
        {movies
          .filter((movie) =>
            isLarge ? movie.poster_path : movie.backdrop_path
          )
          .map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row-poster ${isLarge ? "row-poster-large" : ""}`}
              src={`${baseImgUrl}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
            />
          ))}
      </div>

      {trailerUrl && (
        <Youtube
          videoId={trailerUrl}
          className="row-trailer"
          opts={{
            height: "400",
            width: "100%",
            playerVars: {
              autoplay: 1, // auto start playing
            },
          }}
        />
      )}
    </div>
  );
};

export default Row;
