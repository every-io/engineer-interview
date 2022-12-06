import { css } from "@stitches/react";

export const BoardContainer = css({
  border: "1px solid #000000",
  display: "block",
  margin: "0 auto",
  maxHeight: "100%",
  maxWidth: "1250px",
  padding: "1rem",
});

export const ColumnsContainer = css({
  display: "flex",
  justifyContent: "space-between",
  overflowX: "auto",
});
