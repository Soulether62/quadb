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
      {[data] &&
        [data].map((dataObj) => {
          return (
            <div
              className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
              style={{ width: "90vw" }}
              key={dataObj.id}
            >
              <img
                className="card-img-top"
                src={dataObj.image?.medium ? dataObj.image?.original : image}
                alt="Not Available"
              />
              <div className="card-body">
                <h5 className="card-title">Name of the show: {dataObj.name}</h5>
                <p dangerouslySetInnerHTML={{ __html: dataObj.summary }}></p>
                <Link
                  className="btn btn-primary"
                  to={`Modal/${dataObj.id}`}
                  style={{ color: "black" }}
                >
                  Book
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default about;
