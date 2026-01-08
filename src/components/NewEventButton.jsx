import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  changeServiceField, 
  clearEventField, 
  addEventDate, 
  toggleEventsSidebarObj, 
  toggleNewEventSidebarObj, 
  toggleDetailSidebarObj 
} from "../actions/actionCreatorsObj";

const NewEventButton = ({ date }) => {
  const calendarContext = useSelector(state => state.calendarState);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <button
        className="new-event-btn"
        onClick={() => {
          dispatch(toggleNewEventSidebarObj(!calendarContext.newEventSidebarToggled));
          dispatch(toggleEventsSidebarObj(false));
          dispatch(toggleDetailSidebarObj(false));
          dispatch(clearEventField());
          
          if (date) {
            dispatch(addEventDate(date));
            dispatch(changeServiceField('date', date));
          }
        }}
      >
        <i className="fas fa-plus"></i> New Event
      </button>
    </nav>
  );
};

export default NewEventButton;