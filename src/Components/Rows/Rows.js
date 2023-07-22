import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const imgUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);

  // state to fech only title of single movie
  const [showName, setName] = useState(false);

  const [trailerUrl, setTrailerUrl] = useState("");

  var myClass = 0; //to store poster size

  // console.log(fetchUrl)

  useEffect(() => {
    // async function fetchData() {
    //     const request = await axios.get(fetchUrl);
    //     console.log(request)
    //     setMovies(request.data.results);
    //     return request
    // }
    // fetchData()

    axios.get(fetchUrl).then((request) => {
      // console.log(request)
      setMovies(request.data.results);
    });
  }, [title, fetchUrl]);

  // use effect for movie name
   useEffect(() => {
     window.addEventListener("scroll", () => {
       if (window.scrollY > 100) {
         setName(true);
       } else {
         setName(false);
       }
     });
     return () => {
       window.removeEventListener("scroll");
     };
   }, []);

  // function to show title of movie
  const MouseOver = (movie) => {
    if (showName) {
      setName("");
    } else {
      console.log(movie?.title || movie?.name || movie?.original_name);
      setName(movie?.title || movie?.name || movie?.original_name);
    }
  };

  // console.log(window)
  // console.log(movies)

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // calling show movie function
      MouseOver(movie);

      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          // console.log(url)
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log(trailerUrl);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h3>{title} </h3>
      <div className="row__posters">
        {movies.map((movie, index) => {
          if (isLarge === true) {
            myClass = "big__poster";
          } else {
            myClass = "row__poster";
          }

          const data = (
            <img
              // onMouseEnter={MouseOver(movie)}
              key={index}
              onClick={() => {
                handleClick(movie);
              }}
              className={myClass}
              src={`${imgUrl}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
          return data;
        })}
      </div>

      {/* jsx for showing name when clicked  */}
      <h1 style={{ padding: "40px" }}>
      {showName && <p>{showName}</p>}
      {/* <p>{ showName}</p> */}
      {/* {console.log(showName)} */}
      </h1>

      <div style={{ padding: "20px" }}>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
