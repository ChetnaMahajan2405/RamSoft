import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

export const Header = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "4px 4px 0 0",
}));

export const Text = styled(Typography)(() => ({
  width: "100%",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));