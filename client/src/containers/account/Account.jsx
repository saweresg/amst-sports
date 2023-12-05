import React, { useEffect, useState } from "react";
import "./account.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

//takes string input in the form 'YYYY-MM-DD'
//returns string in the form "September 26 2023"
function formatDate(yearMonthDay) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let arr = yearMonthDay.split("-");
  return monthNames[parseInt(arr[1] - 1)] + " " + arr[2] + " " + arr[0];
}

export default function Account() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userBookings, setUserBookings] = useState({});

  //Retrieve the Bookings of the user who is currently signed in,
  //User cannot access this page without being signed in,
  //So this call only happens when user is signed in
  useEffect(() => {
    fetch(process.env.REACT_APP_DATABASE_URL + "/users/" + currentUser.uid)
      .then((response) => response.json())
      .then((booking) => setUserBookings(booking))
      .catch((err) => console.log(err.message));
  }, [currentUser]);

  return (
    <div className="account" style={{ minHeight: "55vh" }}>
      <h1>My Bookings</h1>
      {Object.keys(userBookings).length === 0 ? (
        <>
          <h2>You do not have any bookings</h2>
        </>
      ) : (
        <div className="times">
          <ul>
            {Object.keys(userBookings)
              .sort()
              .map((key) => (
                <li>
                  <h2>{formatDate(key)}</h2>
                  <ul>
                    {userBookings[key]
                      .sort(function (a, b) {
                        return a - b;
                      })
                      .map((time) => (
                        <li>
                          <p>
                            {time}:00-{parseInt(time) + 1}:00
                          </p>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      )}
      <button onClick={() => navigate("/booking")}>Book Now</button>
    </div>
  );
}
