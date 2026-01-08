import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteEventDispatch } from "../actions/actionCreatorsDispatch";
import NewEventButton from "./NewEventButton";
import { editEventSidebarObj, toggleDetailSidebarObj, toggleNewEventSidebarObj } from "../actions/actionCreatorsObj";
import moment from 'moment';

const DayDetail = () => {
  const calendarContext = useSelector(state => state.calendarState);
  const dispatch = useDispatch();

  const {
    detailSidebarToggled,
    dayDetail,
    currentMonth,
    currentYear,
    days // We need the days array to find the full date string
  } = calendarContext;

  // Find the actual YYYY-MM-DD string for the day currently being viewed
  const activeDay = days.find(d => d.dayOfMonth === dayDetail.today && d.visible);
  const activeDateString = activeDay ? activeDay.date : null;

  const fullEvent = (el) => {
    el.classList.toggle('active');
  }

  return (
    <div className={detailSidebarToggled ? "detail-sidebar toggled box-shadow" : "detail-sidebar"} style={{ top: window.scrollY }}>
      <button className="sidebar__close-btn" onClick={() => {
          dispatch(toggleDetailSidebarObj(false));
          dispatch(toggleNewEventSidebarObj(false));
        }}>
        <i className="fas fa-times-circle"></i>
      </button>
      
      <p className="detail-sidebar__date">{`${moment.months(currentMonth - 1)} ${dayDetail.today}, ${currentYear}`}</p>
      
      <ul className="detail-sidebar__events">
        {dayDetail.events.map(event => (
          <li className="event-item" onClick={(e) => fullEvent(e.target)} key={event.id}>
            {event.eventName}
            <button className="delete-event-btn" onClick={() => dispatch(deleteEventDispatch(calendarContext, event.id))}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="edit-event-btn" onClick={() => {
                dispatch(toggleNewEventSidebarObj(true));
                dispatch(toggleDetailSidebarObj(false));
                dispatch(editEventSidebarObj(event));
              }}>
              <i className="fas fa-edit"></i>
            </button>
            <p className="event-time"><span className="text-bold">Time: </span>{event.time}</p>
            <p className="event-description"><span className="text-bold">Description: </span>{event.description}</p>
          </li>
        ))}
      </ul>

      {/* FIX: Pass the full date string instead of just the day number */}
      <NewEventButton date={activeDateString} />
    </div>
  );
};

export default DayDetail;