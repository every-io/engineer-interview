import { styled } from "@stitches/react";

const Card = styled("div", {
  backgroundColor: "#fcfcfc",
  overflow: "hidden",
  variants: {
    elevation: {
      flat: { boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.25)" },
      raised: { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" },
    },
    corner: {
      square: { borderRadius: "0px" },
      round: { borderRadius: "15px" },
      rounder: { borderRadius: "40px" },
    },
  },
  defaultVariants: {
    elevation: "flat",
    corner: "square",
  },
});

export default Card;
