import { css } from "@stitches/react";

export const TaskContainer = css({
  alignItems: "center",
  display: "flex",
  gap: "10px",
  justifyContent: "space-around",
  margin: "20px 0",
  padding: "1rem",

  p: {
    textAlign: "center",
    wordBreak: "break-all",
  },

  button: {
    padding: "1rem .5rem",
  },

  span: {
    fontSize: "25px",
  },
});
