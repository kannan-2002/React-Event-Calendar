import {
  getCurrentDateObj,
  prevMonthObj,
  nextMonthObj,
  setDaysObj,
  deleteEventObj,
  setEventsObj,
} from "./actionCreatorsObj";
import { v4 as uuidv4 } from 'uuid';

export const getCurrentDateDispatch = (year, month, date) => (dispatch) => {
  const currDayOfMonth = date;
  const currMonth = month;
  const currYear = year;

  let startingDay = new Date(currYear, currMonth - 1, 1).getDay();

  dispatch(getCurrentDateObj(currYear, currMonth, currDayOfMonth));
  dispatch(setDaysDispatch(startingDay, currMonth, currYear));
};

export const setDaysDispatch = (sd, m, y) => (dispatch) => {
  let emptyDaysTop = sd === 0 ? 6 : sd - 1;
  let totalDaysOfMonth = new Date(y, m, 0).getDate();
  let daysArr = [];

  // 1. Previous Month Padding
  const prevMonthLastDay = new Date(y, m - 1, 0).getDate();
  for (let i = emptyDaysTop - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const prevM = m === 1 ? 12 : m - 1;
    const prevY = m === 1 ? y - 1 : y;
    daysArr.push({
      visible: false,
      dayOfMonth: dayNum,
      date: `${prevY}-${String(prevM).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
    });
  }

  // 2. Current Month
  for (let i = 1; i <= totalDaysOfMonth; i++) {
    daysArr.push({
      visible: true,
      dayOfMonth: i,
      date: `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }

  // 3. Next Month Padding
  let emptyDaysBottom = 42 - daysArr.length;
  for (let i = 1; i <= emptyDaysBottom; i++) {
    const nextM = m === 12 ? 1 : m + 1;
    const nextY = m === 12 ? y + 1 : y;
    daysArr.push({
      visible: false,
      dayOfMonth: i,
      date: `${nextY}-${String(nextM).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }

  dispatch(setDaysObj(daysArr));
};

export const addEventDispatch = (id, eventName, date, time, participants, description, state) => (dispatch) => {
  let events;
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

  if (id) {
    const otherEvents = existingEvents.filter(e => e.id !== id);
    events = [...otherEvents, { id, date, time, participants, eventName, description }];
  } else {
    events = [...existingEvents, { id: uuidv4(), date, time, participants, eventName, description }];
  }

  localStorage.setItem("events", JSON.stringify(events));
  dispatch(setEventsObj(events));
  dispatch(getCurrentDateDispatch(state.currentYear, state.currentMonth, 1));
};

export const prevMonthDispatch = (state) => (dispatch) => {
  if (state.currentMonth === 1) {
    dispatch(getCurrentDateDispatch(state.currentYear - 1, 12, 1));
    dispatch(prevMonthObj(12, state.currentYear - 1));
  } else {
    dispatch(getCurrentDateDispatch(state.currentYear, state.currentMonth - 1, 1));
    dispatch(prevMonthObj(state.currentMonth - 1, state.currentYear));
  }
};

export const nextMonthDispatch = (state) => (dispatch) => {
  if (state.currentMonth === 12) {
    dispatch(getCurrentDateDispatch(state.currentYear + 1, 1, 1));
    dispatch(nextMonthObj(1, state.currentYear + 1));
  } else {
    dispatch(getCurrentDateDispatch(state.currentYear, state.currentMonth + 1, 1));
    dispatch(nextMonthObj(state.currentMonth + 1, state.currentYear));
  }
};

export const deleteEventDispatch = (state, id) => (dispatch) => {
  let events = state.events.filter(e => e.id !== id);
  localStorage.setItem("events", JSON.stringify(events));
  dispatch(setEventsObj(events));
};

export const getEventsFromLS = () => (dispatch) => {
  const events = localStorage.getItem("events");
  dispatch(setEventsObj(events ? JSON.parse(events) : []));
};