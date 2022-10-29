import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

export const ListHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
}));
