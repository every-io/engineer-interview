import { css } from "@stitches/react";

export const AddTaskContainer = css({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
  width: "360px",

  "> input": {
    flexGrow: 1,
    padding: "10px",
  },

  "> button": {
    height: "50px",
    margin: "0 0 0 20px",
    width: "80px",
  },
});
