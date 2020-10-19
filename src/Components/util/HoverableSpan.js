import React, { useState } from "react";

//Icons
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

export const HoverableSpan = ({
  className,
  handleClick,
  spanContent,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      className={className}
      onClick={handleClick}
    >
      {isHovered ? (
        <AddCircleOutlinedIcon
          style={{ color: "#db4c3f", fontSize: 18, marginRight: 10 }}
        />
      ) : (
        <AddIcon style={{ color: "#db4c3f", fontSize: 18, marginRight: 10 }} />
      )}
      <span>{children}</span>
    </div>
  );
};
