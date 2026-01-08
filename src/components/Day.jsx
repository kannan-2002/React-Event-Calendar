import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDayDetailObj, 
  addEventDate, 
  toggleDetailSidebarObj, 
  toggleEventsSidebarObj, 
  toggleNewEventSidebarObj,
  changeServiceField 
} from "../actions/actionCreatorsObj";

const Day = ({ day: { visible, dayOfMonth, date } }) => {
  const calendarContext = useSelector(state => state.calendarState);
  const dispatch = useDispatch();
  const { events, currentMonth, currentYear } = calendarContext;

  const todaysEvents = events.filter(event => date === event.date);

  const now = new Date();
  const isToday = visible && 
    now.getDate() === dayOfMonth && 
    (now.getMonth() + 1) === currentMonth && 
    now.getFullYear() === currentYear;

  return (
    <button
      className={`day ${isToday ? "current-day" : ""} ${!visible ? "hidden" : ""}`}
      onClick={() => {
        dispatch(setDayDetailObj(dayOfMonth, todaysEvents));
        dispatch(toggleDetailSidebarObj(true));
        dispatch(toggleEventsSidebarObj(false));
        dispatch(toggleNewEventSidebarObj(false));
        
        // This ensures the Redux state 'eventState.date' is updated immediately
        dispatch(addEventDate(date)); 
        dispatch(changeServiceField('date', date));
      }}
    >
      {dayOfMonth}
      <div className="event-indicators">
        {todaysEvents.map((el, index) => (
          <span key={index}><i className={`fas fa-star ${el.participants}`}></i></span>
        ))}
      </div>
    </button>
  );
};

export default Day;