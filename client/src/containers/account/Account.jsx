import React, { useEffect, useState } from "react";
import "./account.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// function
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

// async function getUserBookings(user){
//     try {
//         await axios.get(`http://localhost:5001/users/${user.uid}`)
//         .then(res => {return console.log(res.data)})
//         .catch(err => console.log(err.message))

//         // return response.res
//     } catch (err) {
//         console.log(err.message)
//     }
// }

export default function Account() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userBookings, setUserBookings] = useState({});

  // useEffect(() => {
  //     fetch("http://localhost:5001/users/" + currentUser.uid)
  //     // .then(status)
  //     .then(res => res.json())
  //     .then(dayBookings => setDayBookings(dayBookings.slots ? dayBookings.slots : []))
  //     .catch(function(error) {console.log('error is', error)})

  //   }, []);
  // let userBookings = getUserBookings(currentUser);

  // console.log(currentUser.uid)

  useEffect(() => {
    fetch("http://localhost:5001/users/" + currentUser.uid)
      .then((response) => response.json())
      .then((booking) => setUserBookings(booking))
      .catch((err) => console.log(err.message));
  }, [currentUser]);

  console.log(userBookings);

  return (
    <div className="account">
      <h1>My Bookings</h1>
      {Object.keys(userBookings).length === 0 ? (
        <>
          <h2>You do not have any bookings</h2>
        </>
      ) : (
        // <h1>HELLO</h1>
        <div className="times">
          <ul>
            {Object.keys(userBookings)
              .sort()
              .map((key) => (
                <li>
                  <h2>{formatDate(key)}</h2>
                  <ul>
                    {userBookings[key].map((time) => (
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
