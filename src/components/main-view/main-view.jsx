import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: "Inception", Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", ImagePath: "https://www.accioncine.es/images/stories/mjp/2010/08/inception_ver4.jpg", Genre:"Sci-Fi", Director: "Christopher Nolan"} ,
        { _id: 2, Title: "The Shawshank Redemption", Description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", ImagePath: "https://pics.filmaffinity.com/Cadena_perpetua-576140557-large.jpg", Genre:"Drama", Director: "Frank Darabont"},
        { _id: 3, Title: "Gladiator", Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", ImagePath: "https://pics.filmaffinity.com/gladiator-564554218-large.jpg", Genre:"Adventure", Director: "Ridley Scott"}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

  //  if (selectedMovie) return <MovieView movie={selectedMovie}/>;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/> ))}
      </div>
    );
  }
}
