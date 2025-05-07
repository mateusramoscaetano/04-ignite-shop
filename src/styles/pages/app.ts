import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Cart = styled("div", {
  background: "$gray800",
  color: "white",
  padding: "0.75rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  position: "relative",
});

export const CartCount = styled("span", {
  background: "$green500",
  color: "white",
  padding: "0.5rem",
  borderRadius: "9999px",
  fontSize: "0.875rem",
  fontWeight: "bold",
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "-10px",
  right: "-10px",
});

export const DrawerOverlay = styled("div", {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
  transition: "opacity 0.2s ease-in-out",
  opacity: 0,

  '&[data-state="open"]': {
    opacity: 1,
  },
  '&[data-state="closed"]': {
    opacity: 0,
  },
});

export const CartContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "600px",
  gap: 24,
  flex: 1,
  overflow: "auto",
});

export const CartCard = styled("div", {
  display: "flex",
  gap: 24,
});

export const CartCardImage = styled("div", {
  width: 94,
  height: 94,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CartCardContent = styled("div", {
  display: "flex",
  flexDirection: "column",

  alignItems: "flex-start",
  gap: 10,
  paddingTop: 4,
  paddingBottom: 4,

  div: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 8,
  },
});

export const CartCardTitle = styled("span", {
  fontSize: 18,

  color: "$gray100",
});

export const CartCardPrice = styled("span", {
  fontSize: 18,
  fontWeight: 700,
  color: "$gray100",
});

export const CartCardRemoveButton = styled("span", {
  color: "$green500",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
});

export const CartFooter = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const CartTotal = styled("div", {
  display: "flex",

  gap: 8,
  justifyContent: "space-between",
  alignItems: "center",

  h3: {
    fontSize: 16,
    fontWeight: 400,
    color: "$gray100",
  },
  h2: {
    fontSize: 18,
    fontWeight: 700,
  },
});

export const CartQuantity = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,

  h3: {
    fontSize: 18,
    fontWeight: 700,
    color: "$gray100",
  },
  h2: {
    fontSize: 24,
  },
});

export const ButtonCheckout = styled("button", {
  background: "$green500",
  color: "white",
  padding: "1rem",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 700,
  transition: "background 0.2s",
  border: "none",
  marginTop: "50px",

  "&:hover": {
    backgroundColor: "$green300",
  },
});
