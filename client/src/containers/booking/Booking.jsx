import React, { useState, useEffect } from "react";
import "./booking.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import Slots from "../../components/slots/Slots";
import axios from "axios";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  display: flex;
  justify-content: center;
  // align-items: center;
  max-width: 350px;
  max-height: 370px;
  min-width: 350px;
  // min-height: 300px;
  margin: auto;
  border: 3px solid #ff6d4d;
  // margin-top: 20px;
  // margin-bottom: 20px;
  // background-color: #FFF6DD;
  // background-color: blue;
  padding: 0rem 1rem;
  border-radius: 15px;

  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      color: #ff6d4d;
      // color:orange;

      font-variant-numeric: lining-nums tabular-nums;
      font-family: var(--font-family);
      // font-size: 15px;
      font-style: normal;
      // font-weight: 900;
      line-height: normal;
      text-transform: uppercase;
    }

    .react-calendar__navigation__arrow {
      // min-width: 44px;
      // flex-grow: 0.333;
      // background:green;
    }

    .react-calendar__navigation__arrow {
      // background:blue;
    }
  }

  .react-calendar__navigation button {
    border: none;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
    // text-decoration:none;
    // cursor: none;
    // text-transform: uppercase;

    color: #ff6d4d;

    text-align: center;
    // font-variant-numeric: lining-nums tabular-nums;
    font-family: var(--font-family);
    font-size: 16.761px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  /* ~~~ button styles ~~~ */
  button {
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: var(--font-family);
    font-size: 18.761px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin: 0.25rem 0.5rem;
    width: 40px;
    height: 40px;

    border-radius: 111px;
    border: 2.345px solid #ff6d4d;

    background-color: #fff6dd;
    color: #ff6d4d !important;
    padding: 5px 0;
    transition: 0.3s;

    &:enabled:hover {
      background-color: #ff6d4d;
      color: #fff6dd !important;
      transition: 0.3s;
    }

    &:active:enabled {
      background-color: #ff6d4d;
      color: #fff6dd !important;
    }
  }

  .react-calendar__month-view__days__day button {
    // margin: .25rem;
  }

  .react-calendar__month-view__days {
    // background: green;
    // display:flex;

    // margin:1rem;
    // padding: 2.5rem 1.5rem;
    // justify-content:center;
    // align-items:center;
  }

  .react-calendar__month-view__days__day {
    // display:flex;
    // background: red !important;
    // // padding:0rem 0rem;
    // margin:0;
    // justify-content:center;
    // align-items:center;
  }

  // .react-calendar__tile {

  // }

  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
    // grid-template-rows: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
    // grid-gap:2px;
    // justify-content:center;
    // align-items:center;
    margin: 0;
    // background: green;

    // margin: auto;
    // padding: 5px;

    .react-calendar__month-view__days__day {
      display: flex;
      margin: 0;
      // justify-content: center;
      // align-items: center;
      // border: 2px solid black;
    }

    .react-calendar__month-view__days__day {
      display: flex;
      justify-content: center;
      align-items: center;
      // background:blue;
    }

    .react-calendar__tile {
      display: flex;
      // max-width: initial !important;
      justify-content: center;
      align-items: center;
      // background:yellow;
      // margin-inline-end: 0px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 4px;
      margin-right: 4px;
      // padding:2px;
    }
    button {
      // display:flex;
      // justify-content:center;
      // align-items:center;
      // margin-left: 10px;
      // margin-right: 10px;
      // align-items:center;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 75%;
    // color: #FFD8C0;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

  /* ~~~ active day styles ~~~ */
  .react-calendar__tile--range {
    background-color: #ff6d4d;
    color: #fff6dd !important;
  }

  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    //   max-width: 350px;
    // max-height: 370px;
    // min-width: 300px;
    // min-height: 300px;

    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months button {
      width: 70px;
      height: 70px;
      font-size: 12px;
      // margin-left:35px;
      // margin-right:50px;
      text-align: center;
    }

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
      justify-content: center;
      align-items: center;
    }
  }

  .react-calendar button:disabled {
    cursor: not-allowed;
    opacity: 40% !important;
    // border: 2.345px solid #FFD8C0;
    // color: #FFD8C0 !important;
  }

  .react-calendar button:disabled:hover {
    background: default;
  }

  .eKLpVM button {
    // margin: 0 0;
  }

  .react-calendar__year-view__months__month {
    // background: red;
  }

  .react-calendar__tile {
    // background:green;
  }

  .react-calendar__month-view__days__day .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__year-view__months {
    // background:red;
  }

  .react-calendar__viewContainer {
    // display:flex;
    // justify-content:center;
    // align-items:center;
    // background:blue;
  }

  .react-calendar {
    // background:red;
    // width: 50px;
    height: 450px;
    // max-width: 100%;
    // display:flex;
    // justify-content:center;
    // align-items:center;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
`;

const Booking = () => {
  const slots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(dateFormat(value));
  const [dayBookings, setDayBookings] = useState([]);
  const [selected, setSelected] = useState({});
  const [countSelected, setCountSelected] = useState(0);
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const prevLocation = useLocation();

  function status(response) {
    if (response.ok) {
      return response;
    }
    return response.json().then((res) => Promise.reject(res));
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/bookings/${date}`)
      .then(status)
      .then((res) => res.json())
      .then((dayBookings) =>
        setDayBookings(dayBookings.slots ? dayBookings.slots : [])
      )
      .catch(function (error) {
        console.log("error is", error);
      });
  }, [date]);

  function dateFormat(day) {
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  }

  function handleButtonClick(day, time) {
    let copy = { ...selected };
    let timeInt = time;

    if (day in copy) {
      if (copy[day].has(timeInt)) {
        copy[day].delete(timeInt);
        setCountSelected(countSelected - 1);
      } else {
        copy[day].add(timeInt);
        setCountSelected(countSelected + 1);
      }
    } else {
      copy[day] = new Set([timeInt]);
      setCountSelected(countSelected + 1);
    }

    setSelected(copy);
  }

  function onChange(nextValue) {
    setValue(nextValue);
    var nextDate = dateFormat(nextValue);
    setDate(nextDate);
  }

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
    // let start = parseInt(arr[3]);
    // let end = start+1;

    return monthNames[parseInt(arr[1] - 1)] + " " + arr[2] + " " + arr[0];
  }

  function compareInt(a, b) {
    return b - a;
  }

  function getDayBookings(day) {
    //use date to return array of bookings on that day
    //[] if no bookings
    //['8', '9', 15', '16']

    return [];
  }

  function helper(dict) {
    let temp = {};

    var keys = Object.keys(selected).sort();

    keys.forEach((key) => {
      temp[[key]] = Array.from(dict[key]);
    });
    return temp;
  }

  function handleSubmit() {
    if (currentUser) {
      fetch(`${process.env.REACT_APP_DATABASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected: helper(selected),

          hours: countSelected,
          customer: currentUser,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          window.location = url;
        })
        .catch((e) => {
          console.error(e.error);
        });
    } else {
      navigate("/user/login");
    }
  }

  return (
    <>
      <div className="amst__booking">
        <div className="amst__booking-title">
          <h1>Book Now</h1>
          <p>$80 per hour</p>
        </div>
        <div className="amst__booking-container">
          <div className="amst__booking-calendar">
            <CalendarContainer>
              <Calendar
                onChange={onChange}
                value={value}
                minDate={new Date()}
                maxDate={new Date(2024, 11, 31)}
                next2Label={null}
                prev2Label={null}
                minDetail={"year"}
              />
            </CalendarContainer>
          </div>

          <div className="buttons-container">
            <div className="amst__booking-buttons">
              <Slots
                times={new Set(dayBookings)}
                date={date}
                onButtonClick={handleButtonClick}
                taken={date in selected ? selected[date] : new Set([])}
              />
            </div>
          </div>
        </div>

        <div className="amst__booking-bottom-info">
          <div className="timeOutput">
            <ul>
              {Object.keys(selected)
                .sort()
                .map((key) =>
                  selected[key].size > 0 ? (
                    <li>
                      <h1>{formatDate(key)}</h1>
                      <ul>
                        {Array.from(selected[key])
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
                  ) : (
                    <></>
                  )
                )}
            </ul>
          </div>

          <div className="checkout">
            <button
              onClick={() => {
                setSelected({});
                setCountSelected(0);
              }}
            >
              Clear Selections
            </button>
            <button
              disabled={countSelected === 0}
              type="submit"
              onClick={handleSubmit}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
