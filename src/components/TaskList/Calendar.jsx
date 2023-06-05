import React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Modal from "../UI/Modal";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <Modal>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
      />
    </Modal>
  );
};

export default Calendar;
