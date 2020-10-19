import React, { createRef } from "react";
import moment from "moment";

//Icons
import EventIcon from "@material-ui/icons/Event";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import SunIcon from "@material-ui/icons/WbSunny";
import BlockIcon from "@material-ui/icons/Block";

//MUI
import { DatePicker } from "@material-ui/pickers";

//Helpers
import { getDateColor, getDateMarkup } from "../../Helpers/index";

export const Datepicker = ({
  state,
  setState,
  selectedDate,
  onChange,
  stringInput,
}) => {
  const datepickerAnchorRef = createRef();
  const { anchor } = state;

  const inputDatepicker = (props) => {
    if (stringInput === false) {
      return (
        <div
          onClick={() => {
            setState({ ...state, anchor: datepickerAnchorRef.current });
          }}
          className="settings__button"
        >
          {selectedDate === null ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <EventIcon
                style={{
                  color: "#555",
                  fontSize: 15,
                  marginRight: 5,
                }}
              />
              <span>Schedule</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <EventIcon
                style={{
                  fontSize: 15,
                  marginRight: 5,
                  color: getDateColor(selectedDate),
                }}
              />
              <span style={{ color: getDateColor(selectedDate) }}>
                {getDateMarkup(selectedDate)}
              </span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            setState({ ...state, anchor: datepickerAnchorRef.current });
          }}
        >
          {stringInput}
        </div>
      );
    }
  };

  const toolbarDatepicker = () => {
    return (
      <div className="datepicker__customButtons">
        <div
          className="datepicker__customButton"
          onClick={(e) => {
            setState({ ...state, anchor: null });
            onChange(moment());
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <CalendarIcon
              style={{
                fontSize: 18,
                marginRight: 10,
                color: "rgb(118, 167, 111)",
              }}
            />
            <span>Today</span>
          </span>
          <span>{moment().format("ddd")}</span>
        </div>
        <div
          className="datepicker__customButton"
          onClick={(e) => {
            setState({
              ...state,
              anchor: null,
            });
            onChange(moment().add(1, "days"));
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <SunIcon
              style={{ fontSize: 18, marginRight: 10, color: "#ad6200" }}
            />
            <span>Tomorrow</span>
          </span>
          <span>{moment().add(1, "days").format("ddd")}</span>
        </div>

        <div
          className="datepicker__customButton"
          onClick={() => {
            setState({ ...state, anchor: null });
            onChange(null);
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <BlockIcon
              style={{ fontSize: 18, marginRight: 10, color: "grey" }}
            />
            <span>No Date</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div ref={datepickerAnchorRef}>
      <DatePicker
        value={selectedDate}
        onChange={(date) => {
          setState({ ...state, anchor: null });
          onChange(date);
        }}
        TextFieldComponent={inputDatepicker}
        variant="inline"
        open={Boolean(anchor)}
        onClose={() => setState({ ...state, anchor: null })}
        PopoverProps={{
          anchorEl: anchor,
        }}
        autoOk={true}
        ToolbarComponent={toolbarDatepicker}
        disablePast={true}
        maxDate={moment().add(365, "days")}
      />
    </div>
  );
};
