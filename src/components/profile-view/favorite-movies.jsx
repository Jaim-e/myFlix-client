import React from "react";
import axios from "axios";

import { Card, Row, Col, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



//import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, removeFromFavorites }) {
  console.log(favoriteMovieList)


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
                    <Figure.Image alt={Title} src={ImagePath} crossOrigin="anonymous" />
                    <Figure.Caption><h5>{Title}</h5></Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="outline-danger" onClick={() => removeFromFavorites(_id)}>Remove from Favorites</Button>
              </Col>
            )
          })}
        </Row>

      </Card.Body>
    </Card>
  )  
}

export default FavoriteMovies;
