import React, { useState } from "react";

import FlagIcon from "@material-ui/icons/Flag";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import CheckIcon from "@material-ui/icons/Check";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";

export const PriorityButton = ({ priority, setPriority }) => {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      {priority === 4 ? (
        <Tooltip arrow={true} title="set the priority: p1, p2, p3, p4">
          <FlagOutlinedIcon
            className={`settings__priority priority${priority}`}
            role="button"
            onClick={(e) => {
              setAnchor(e.target);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip arrow={true} title="set the priority: p1, p2, p3, p4">
          <FlagIcon
            className={`settings__priority priority${priority}`}
            onClick={(e) => {
              setAnchor(e.target);
            }}
          />
        </Tooltip>
      )}
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
              setPriority(1);
              setAnchor(null);
            }}
          >
            <FlagIcon className="priority1" />
            <span>Priority 1</span>
            {priority === 1 ? (
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
              setPriority(2);
              setAnchor(null);
            }}
          >
            <FlagIcon className="priority2" />
            <span>Priority 2</span>
            {priority === 2 ? (
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
              setPriority(3);
              setAnchor(null);
            }}
          >
            <FlagIcon className="priority3" />
            <span>Priority 3</span>
            {priority === 3 ? (
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
              setPriority(4);
              setAnchor(null);
            }}
          >
            <FlagOutlinedIcon className="priority4" />
            <span>Priority 4</span>
            {priority === 4 ? (
              <CheckIcon
                style={{
                  color: "#db4c3f",
                  fontSize: 15,
                  marginLeft: "auto",
                }}
              />
            ) : null}
          </div>
        </div>
      </Popover>
    </>
  );
};
