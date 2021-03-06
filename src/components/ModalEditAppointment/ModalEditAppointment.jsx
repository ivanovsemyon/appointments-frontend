import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { changeAppointment } from "../../redux/appointmentSlice";

import { DatePicker, Select } from "antd";
import moment from "moment";

import arrow from "../../icons/Arrow-bottom.svg";
import calendar from "../../icons/Calendar.svg";

import style from "./ModalEditAppointment.module.scss";
import Button from "../Button/Button";

const { Option } = Select;

const ModalEditAppointment = ({ item, doctors, setIsEditing }) => {
  const [name, setName] = useState(item.name);
  const [doctor, setDoctor] = useState(item.doctor);
  const [date, setDate] = useState(moment(item.date, "YYYY-MM-DD"));
  const [complaint, setComplaint] = useState(item.complaint);

  const dispatch = useDispatch();

  const editAppointment = useCallback(() => {
    dispatch(
      changeAppointment({
        id: item._id,
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      })
    );
    setIsEditing(false);
  }, [dispatch, item._id, name, doctor, date, complaint, setIsEditing]);

  return (
    <div className={style.modal_edit_appointment_wrapper}>
      <div className={style.modal_edit_appointment}>
        <h3 className={style.modal_edit_appointment_header}>Изменить прием</h3>
        <div className={style.modal_edit_appointment_form}>
          <div className={style.modal_delete_appointment_input_wrapper}>
            <label>Имя:</label>
            <input
              type="text"
              className={style.modal_edit_appointment_form_input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Врач:</label>
            <Select
              className="modal-edit-appointment-select"
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
            <label>Дата:</label>
            <DatePicker
              className="modal-edit-appointment-datepicker"
              defaultValue={date}
              suffixIcon={<img src={calendar} alt="calendar" />}
              placeholder=""
              onChange={(date) => setDate(date)}
            />
            <label>Жалобы:</label>
            <textarea
              className={`${style.modal_edit_appointment_form_input} ${style.complaint_input}`}
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
          </div>
          <div className={style.modal_delete_appointment_btn_wrapper}>
            <Button
              label="Cancel"
              height="40px"
              border="2px solid rgba(0, 0, 0, 0.2)"
              fontSize="18px"
              margin="0 12px 0 0"
              onClick={() => setIsEditing(false)}
            />
            <Button
              label="Save"
              height="40px"
              border="2px solid rgba(197, 233, 255, 0.72)"
              background="rgba(197, 233, 255, 0.72)"
              fontSize="18px"
              margin="0 12px 0 0"
              onClick={editAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAppointment;
