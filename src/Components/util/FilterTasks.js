import React, { useState } from "react";

//Material UI stuff
import Popover from "@material-ui/core/Popover";
//Icons
import FilterListIcon from "@material-ui/icons/FilterList";
import CheckIcon from "@material-ui/icons/Check";

export const FilterTasks = ({ orderBy, setOrderBy }) => {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <FilterListIcon
        role="button"
        onClick={(e) => {
          setAnchor(e.target);
        }}
        style={{ cursor: "pointer" }}
      />
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: "center",
        }}
      >
        <div className="Popover">
          <div
            className="Popover__option"
            onClick={() => {
              setAnchor(null);
              setOrderBy({ ...orderBy, date: !orderBy.date });
            }}
          >
            <span>Sort by date</span>
            {orderBy.date === true ? (
              <CheckIcon
                style={{
                  color: "#db4c3f",
                  fontSize: 15,
                  marginLeft: "auto",
                }}
              />
            ) : null}
          </div>
          <div
            className="Popover__option"
            onClick={() => {
              setAnchor(null);
              setOrderBy({ ...orderBy, priority: !orderBy.priority });
            }}
          >
            <span>Sort by priority</span>{" "}
            {orderBy.priority === true ? (
              <CheckIcon
                style={{
                  color: "#db4c3f",
                  fontSize: 15,
                  marginLeft: "auto",
                }}
              />
            ) : null}
          </div>
          <div
            className="Popover__option"
            onClick={() => {
              setAnchor(null);
              setOrderBy({ priority: false, date: false });
            }}
          >
            <span>Reset filters</span>
          </div>
        </div>
      </Popover>
    </>
  );
};
