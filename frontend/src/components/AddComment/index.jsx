import React from "react";

import styles from "./AddComment.module.scss";

// import TextField from "@mui/material/TextField";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import { useSelector } from "react-redux"; //для стейтов

import { selectIsAuth } from "../../redux/slices/auth"; //проверит auth state на true или false

export const AddComment = ({ handleClickPost, data }) => {
  const isAuth = useSelector(selectIsAuth); //проверит auth state на true иначе false если хоть один false

  return (
    <>
      {isAuth ? (
        <div className={styles.root}>
          <div
            classes={{ root: styles.avatar }}
            src={
              data.avatarUrl
                ? "http://localhost:4444" + data.avatarUrl
                : "/noavatar.png"
            }
          />
          <form onSubmit={handleClickPost} className={styles.form}>
            <input
              label="Add comment"
              variant="outlined"
              maxRows={10}
              multiline
              type="text"
              fullWidth
            />
            <button type="submit" variant="contained">
              Send
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
