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
    <>
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
                  src={
                    dataObj.image?.original ? dataObj.image?.original : image
                  }
                  alt="Not Available"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Name of the show: {dataObj.name}
                  </h5>
                  <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-6">
                      <label for="inputName4" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputName4"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div class="col-12">
                      <label for="inputAddress" class="form-label">
                        Seat No.
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="inputAddress"
                        placeholder="1-80"
                        onChange={(e) => setSeatno(e.target.value)}
                        value={seatno}
                      />
                    </div>
                    <div class="col-12">
                      <label for="inputAddress2" class="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputCity" class="form-label">
                        Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="inputCity"
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                      />
                    </div>
                    <div class="col-md-4">
                      <label for="inputState" class="form-label">
                        State
                      </label>
                      <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>Punjab</option>
                        <option>New Delhi</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <label for="inputZip" class="form-label">
                        Zip
                      </label>
                      <input type="text" class="form-control" id="inputZip" />
                    </div>
                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label class="form-check-label" for="gridCheck">
                          I agree with the T&C
                        </label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
