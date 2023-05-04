import './App.css';
import React, { useState,useEffect } from 'react';
import MovieCard from './MovieCard';
import  SearchIcon from './search.svg';

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a"; 

/*const movie1 = {
  "Title" : "Amazing Spiderman Syndrome",
  "Year" : "2012",
  "imdbID" : "tt2586634",
  "Type" : "movie",
  "Poster" : "N/A"
}*/

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState()

  //function that will fetch the movie
  const searchMovies = async (title) => {//async means it will take time to fetch the movie
    const response = await fetch(`${API_URL}&s=${title}`)//searching the movie using the api and the title provided
    const data = await response.json();//fetch the movie and store it in a json


    setMovies(data.Search);
  }

  /*when the page loads the page calls the useEffect function, that will also call
  the searchMovies function that will search the movies for us*/
  useEffect(() => {
      searchMovies('Black Panther')//Harry Potter is just the default search
  }, []);

  return (
    <div className='app'>
          <h1>MovieLand</h1>

          <div className='search'>
            <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value) }
            />
            <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
            /> 
          </div>
   
   
          {//loop the movies using the map function
            movies?.length > 0
            ? (
              <div className='container'>
                {movies.map((movie) => (
                  <MovieCard movie={movie}/>
                ))}
           </div>
            ) : (
              <div className='empty'>
                <h2>No movies found</h2>
              </div>
            )
          }
    </div>
  );
}

export default App;
 