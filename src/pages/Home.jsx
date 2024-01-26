import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/no-poster.png";

function home() {
  const url = "https://api.tvmaze.com/search/shows?q=all";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="cards">
      {data &&
        data.map((dataObj) => {
          return (
            <div
              className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
              style={{ width: "18rem" }}
              key={dataObj.show.id}
            >
              <img
                className="card-img-top"
                src={
                  dataObj.show.image?.medium
                    ? dataObj.show.image?.medium
                    : image
                }
                alt="Not Available"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Name of the show: {dataObj.show.name}
                </h5>
                <p>Score: {dataObj.score}</p>
                <p>language: {dataObj.show.language}</p>
                <p>status: {dataObj.show.status}</p>
                <p>Premiered: {dataObj.show.premiered}</p>
                <p>Ended: {dataObj.show.ended}</p>
                <p>Average rating : {dataObj.show.rating.average}/10</p>
                <Link
                  className="btn btn-primary"
                  to={`About/${dataObj.show.id}`}
                  style={{ color: "black" }}
                >
                  Summary
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default home;
