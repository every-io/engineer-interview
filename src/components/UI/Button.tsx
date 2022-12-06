import { styled } from "@stitches/react";

const Button = styled("button", {
  border: "none",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
  color: "white",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "bold",

  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    round: {
      true: { borderRadius: "10px" },
    },
    variant: {
      info: { backgroundColor: "#0066ff" },
      danger: { backgroundColor: "#c20b0b" },
      success: { backgroundColor: "#218d1f" },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default Button;
