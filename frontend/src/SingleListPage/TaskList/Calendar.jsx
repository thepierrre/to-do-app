import { useContext } from "react";
import TasksContext from "../../context/tasks-context";
import { DayPicker } from "react-day-picker";
import Modal from "../Modal/Modal";
import "react-day-picker/dist/style.css";

const Calendar = () => {
  const { selectedDay, setSelectedDay } = useContext(TasksContext);
  setSelectedDay(new Date());

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
