import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addEventDispatch } from "../actions/actionCreatorsDispatch"
import { changeServiceField, toggleNewEventSidebarObj } from "../actions/actionCreatorsObj";
import EditField from "./EditField";

const NewEventSidebar = () => {
  const calendarContext = useSelector(state => state.calendarState);
  const eventContext = useSelector(state => state.eventState);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  return (
    <div className={`new-event-sidebar ${calendarContext.newEventSidebarToggled ? "toggled" : ""}`} style={{ top: window.scrollY }}>
      <button className="sidebar__close-btn" onClick={() => dispatch(toggleNewEventSidebarObj(false))}>
        <i className="fas fa-times-circle"></i>
      </button>
      <p className="new-event-sidebar__title">Add Event</p>
      
      <label>Event Name</label>
      <EditField onEdited={handleChange} value={eventContext.eventName || ""} type="text" name="eventName" className="new-event-sidebar__description" />

      <label>Date</label>
      <EditField onEdited={handleChange} value={eventContext.date || ""} type="date" name="date" className="new-event-sidebar__date" />

      <label>Time</label>
      <EditField onEdited={handleChange} value={eventContext.time || ""} type="select" name="time" className="new-event-sidebar__type" options={['', '09:00', '12:00', '15:00', '18:00', '21:00']} />

      <label>Description</label>
      <EditField onEdited={handleChange} value={eventContext.description || ""} type="text" name="description" className="new-event-sidebar__description" />

      <button className="new-event-sidebar__add-btn" onClick={() => {
        dispatch(addEventDispatch(eventContext.id, eventContext.eventName, eventContext.date, eventContext.time, eventContext.participants, eventContext.description, calendarContext));
        dispatch(toggleNewEventSidebarObj(false));
      }}>Save</button>
    </div>
  );
};

export default NewEventSidebar;