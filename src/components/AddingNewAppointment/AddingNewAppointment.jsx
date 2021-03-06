import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAppointment,
  doctorsStateSlice,
} from "../../redux/appointmentSlice";
import Button from "../Button/Button";

import arrow from "../../icons/Arrow-bottom.svg";
import calendar from "../../icons/Calendar.svg";

import { DatePicker, Select } from "antd";
import style from "./AddingNewAppointment.module.scss";

const { Option } = Select;

const AddingNewAppointment = () => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  const dispatch = useDispatch();
  const doctors = useSelector(doctorsStateSlice);

  const addNewAppointment = useCallback(() => {
    if (name && doctor && date && complaint) {
      dispatch(addAppointment({ name, doctor, date, complaint }));
      setName("");
      setDoctor("");
      setComplaint("");
    }
  }, [name, doctor, date, complaint, dispatch]);

  return (
    <div className={style.general_form}>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Имя:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Врач:</label>
        <Select
          className="general-form-select"
          value={doctor}
          suffixIcon={<img src={arrow} alt="arrow-down" />}
          onChange={(value) => setDoctor(value)}
        >
          {doctors.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Дата:</label>
        <DatePicker
          className="general-form-datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date, dateStr) => setDate(dateStr)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Жалобы:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <Button
        className={style.general_appointments_button}
        label="Добавить"
        height="45px"
        fontSize="18px"
        margin="0 0 0 12px"
        disabled={!name || !doctor || !date || !complaint}
        onClick={addNewAppointment}
      />
    </div>
  );
};

export default AddingNewAppointment;
