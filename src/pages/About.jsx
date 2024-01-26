import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../assets/no-poster.png";

function about() {
  const params = useParams();
  const url = `https://api.tvmaze.com/shows/${params.id}`;
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/quadb/"} className="navbar-brand">
            Quadb
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                to={"/quadb/"}
                className="nav-link active"
                aria-current="page"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {[data] &&
        [data].map((dataObj) => {
          return (
            <div className="container">
              <div
                className="card bg-dark text-light mb-5 d-inline-block my-3 mx-5 px-5 py-5"
                key={dataObj.id}
              >
                <img
                  className="card-img-top"
                  src={dataObj.image?.medium ? dataObj.image?.original : image}
                  alt="Not Available"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Name of the show: {dataObj.name}
                  </h5>
                  <p dangerouslySetInnerHTML={{ __html: dataObj.summary }}></p>
                  <Link className="btn btn-primary" to={`Modal/${dataObj.id}`}>
                    Book
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default about;
