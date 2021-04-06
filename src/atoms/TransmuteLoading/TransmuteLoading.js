import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import loading from "./transmute-loading-white.gif";

export const TransmuteLoading = ({ message, style }) => {
  const loadingStyle = {
    filter: "brightness(20%) sepia(3) saturate(300%) hue-rotate(-150deg)",
    ...style,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <img src={loading} alt="loading" style={loadingStyle} />
      <Typography style={{ marginTop: "16px" }}>{message}</Typography>
    </Box>
  );
};

TransmuteLoading.propTypes = {
  message: PropTypes.any,
};
