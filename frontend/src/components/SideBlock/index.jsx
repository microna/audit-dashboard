import React from "react";
import styles from "./SideBlock.module.scss";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <div elevation={1} classes={{ root: styles.root }}>
      <div variant="h6" classes={{ root: styles.title }}>
        {title}
      </div>
      {children}
    </div>
  );
};
