import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const NoMatch = () => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h2" component="h1">
        Sorry. No match for <code>{location.pathname}</code>
      </Typography>
    </Box>
  );
};

export default NoMatch;
