import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/no-poster.png";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("udatas");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function Modal() {
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

  const [udatas, setudatas] = useState(getDatafromLS());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seatno, setSeatno] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let udata = {
      name,
      email,
      seatno,
      date,
      time,
    };
    setudatas([...udatas, udata]);
    setName("");
    setEmail("");
    setSeatno("");
    setDate("");
    setTime("");
  };

  useEffect(() => {
    localStorage.setItem("udata", JSON.stringify(udatas));
  }, [udatas]);

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
                className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-5 py-5"
                key={dataObj.id}
              >
                <img
                  className="card-img-top"
                  src={
                    dataObj.image?.original ? dataObj.image?.original : image
                  }
                  alt="Not Available"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Name of the show: {dataObj.name}
                  </h5>
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label htmlFor="inputName4" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName4"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputAddress" className="form-label">
                        Seat No.
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1-80"
                        onChange={(e) => setSeatno(e.target.value)}
                        value={seatno}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputAddress2" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="inputCity"
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputState" className="form-label">
                        State
                      </label>
                      <select id="inputState" className="form-select">
                        <option value={"selected"}>Choose...</option>
                        <option>Punjab</option>
                        <option>New Delhi</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputZip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputZip"
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          I agree with the T&C
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
