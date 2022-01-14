import React from "react";

import { Link } from "react-router-dom";

import {Container, Card, Row, Col, Figure, Button} from "react-bootstrap";

//import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList }) {
  const removeFavoriteMovie = (id) => {
    let token = localStorage.getItem("token");
    let url = `https://secure-coast-98530.herokuapp.com/users/${localStorage.getItem("user")}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <Card>
      <Card.Body>

        <Row>
          <Col xs={12}>
            <h3>Favorite Movies</h3>
          </Col>
        </Row>

        <Row>
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />s
                    <Figure.Caption><h5>{Title}</h5></Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="danger" onClick={() => removeFavoriteMovie(movies._id)}>Remove from favorites</Button>
              </Col>
            )
          })}
        </Row>

      </Card.Body>
    </Card>
  )  
}

export default FavoriteMovies;
