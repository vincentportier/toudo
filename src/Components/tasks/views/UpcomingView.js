import React, { useEffect, useState, createRef, Fragment } from "react";

import moment from "moment";

import { Datepicker } from "../../util/Datepicker";
import { AddTask } from "../AddTask";

import { DatePicker } from "@material-ui/pickers";

import Task from "../Task";
import { useSortTasks } from "../../../Hooks";

import { createUpcomingDatesArray } from "../../../Helpers/index";

//Icons
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowDowmIcon from "@material-ui/icons/KeyboardArrowDown";
import DotIcon from "@material-ui/icons/Lens";

export const UpcomingView = ({
  tasks,
  state,
  selectedDate,
  setState,
  handleReschedule,
  isLoading,
}) => {
  const [orderBy] = useState({
    date: false,
    priority: true,
  });

  const { overdueTasks, currentTasks } = useSortTasks(tasks, orderBy);
  const [upcomingDatesArray, setUpcomingDatesArray] = useState([]);
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf("week"));
  const [activeWeek, setActiveWeek] = useState([]);
  const [activeDate, setActiveDate] = useState(moment());
  const anchorRef = createRef();
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    const upcomingDatesArray = createUpcomingDatesArray();
    setUpcomingDatesArray(upcomingDatesArray);
  }, []);

  useEffect(() => {
    const activeWeek = [];
    for (let i = 0; i < 7; i++) {
      activeWeek.push(moment(startOfWeek).add(i, "days"));
    }
    setActiveWeek(activeWeek);
  }, [startOfWeek]);

  const handleActiveDateChange = (date) => {
    let newStartOfWeek = moment(date).startOf("week");
    setActiveDate(date);
    setStartOfWeek(newStartOfWeek);
    let activeDateId = moment(date).format("ddd MMM D");

    const yOffset = -165;
    const element = document.getElementById(activeDateId);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const datePickerInput = (props) => {
    return (
      <div
        className="calendarControls__datePickerInput"
        onClick={(e) => {
          setAnchor(anchorRef.current);
        }}
      >
        <span>{moment(startOfWeek).format("MMMM YYYY")}</span>
        <ArrowDowmIcon style={{ color: "#202020", fontSize: 16 }} />
      </div>
    );
  };

  const overdueTasksMarkup = (
    <>
      <div className="tasks__overdue">
        <div className="overdue__header">
          <span className="overdue__title">Overdue</span>
          <Datepicker
            setState={setState}
            state={state}
            selectedDate={selectedDate}
            stringInput={
              <span className="overdue__reschedule">Reschedule</span>
            }
            onChange={handleReschedule}
          />
        </div>
        {overdueTasks.map((task) => (
          <Task task={task} key={task.taskId} />
        ))}
      </div>
    </>
  );

  const activeWeekButtonsMarkup = activeWeek.map((day) => (
    <button
      onClick={() => {
        handleActiveDateChange(day);
      }}
      name={`${moment(day).format("ddd MMM D")}`}
      className="activeWeek__dayButton"
      key={`${moment(day).format("ddd MMM D")}`}
      disabled={
        day.isBefore(moment().startOf("day")) ||
        day.isAfter(moment().add(365, "days"))
      }
    >
      <div className="dayButton__day">{moment(day).format("ddd")}</div>
      <div
        className="dayButton__date"
        style={
          day.isSame(moment(activeDate).startOf("day"))
            ? { color: "#db4c3f", fontWeight: 700 }
            : null
        }
      >
        {moment(day).format("D")}
      </div>
      <div className="dayButton__hasTask">
        {currentTasks.find(
          (task) => task.date === moment(day).format("MM/DD/YYYY")
        ) ? (
          <DotIcon style={{ fontSize: 7 }} />
        ) : null}
      </div>
    </button>
  ));

  const changeWeekButtonsMarkup = (
    <>
      <button
        className="changeWeek__arrowLeft"
        disabled={startOfWeek.isSame(moment().startOf("week"))}
        onClick={() => {
          setStartOfWeek(moment(startOfWeek).subtract(7, "days"));
        }}
      >
        <ArrowLeftIcon style={{ fontSize: 20, color: "grey" }} />
      </button>
      <button
        className="changeWeek__arrowRight"
        disabled={startOfWeek.isSame(moment().add(365, "days").startOf("week"))}
        onClick={() => {
          setStartOfWeek(moment(startOfWeek).add(7, "days"));
        }}
      >
        <ArrowRightIcon style={{ fontSize: 20, color: "grey" }} />
      </button>
    </>
  );

  return (
    <>
      {!isLoading && (
        <>
          <div className="upcoming__calendar">
            <div className="upcoming__calendarControls">
              <div ref={anchorRef}>
                <DatePicker
                  variant="inline"
                  value={activeDate}
                  onChange={handleActiveDateChange}
                  disableToolbar={true}
                  disablePast={true}
                  maxDate={moment().add(365, "days")}
                  autoOk={true}
                  TextFieldComponent={datePickerInput}
                  open={Boolean(anchor)}
                  onClose={() => setAnchor(null)}
                  PopoverProps={{
                    anchorEl: anchor,
                  }}
                />
              </div>
              <div className="calendarControls__changeWeek">
                {changeWeekButtonsMarkup}
              </div>
              <div>
                <button
                  className="calendarControls__todayButton"
                  onClick={() => {
                    handleActiveDateChange(moment());
                  }}
                >
                  Today
                </button>
              </div>
            </div>
            <div className="upcoming__activeWeek">
              {activeWeekButtonsMarkup}
            </div>
          </div>
          {overdueTasks.length > 0 ? overdueTasksMarkup : null}
          {upcomingDatesArray.map((moment) => {
            return (
              <Fragment key={moment.format("ddd MMM D")}>
                <div
                  className="upcoming__dateHeader"
                  id={moment.format("ddd MMM D")}
                >
                  {moment.format("ddd MMM D")}
                </div>
                {currentTasks
                  .filter((task) => task.date === moment.format("MM/DD/YYYY"))
                  .map((task) => (
                    <Task task={task} key={task.taskId} />
                  ))}
                <AddTask initialSelectedDate={moment} />
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};
