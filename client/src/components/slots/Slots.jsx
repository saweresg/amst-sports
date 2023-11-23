import React, { useState } from "react";
import "./slots.css";

const Slots = ({ times, onButtonClick, date, taken }) => {
  function SlotButton({ time, isDisabled, buttonClick, uid, taken }) {
    const [isFree, setIsFree] = useState(!taken.has(uid));

    let classname;
    if (isDisabled) {
      classname = "blocked";
    } else if (isFree) {
      classname = "free";
    } else {
      classname = "selected";
    }

    function handleCLick() {
      setIsFree(!isFree);
      buttonClick();
    }

    return (
      <button
        className={classname + " " + "timeButton"}
        onClick={handleCLick}
        disabled={isDisabled}
      >
        {time}:00-{time + 1}:00
      </button>
    );
  }

  const slots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const [selected, setSelected] = useState([]);

  return (
    <>
      {slots.map((slot) => (
        <SlotButton
          uid={slot} // < 10 ? '0'+slot : slot}
          key={date + "-" + slot}
          time={slot}
          isDisabled={times.has(slot)}
          buttonClick={() => onButtonClick(date, slot)} // < 10 ? '0'+slot : slot)}
          taken={taken}
        />
      ))}
    </>
  );
};

export default Slots;
