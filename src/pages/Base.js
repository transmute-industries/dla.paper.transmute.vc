import React from "react";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";

import CreateIcon from "@material-ui/icons/Create";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import history from "../store/history";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const Base = ({ match, children }) => {
  const pathToIndex = {
    "/": 0,
    "/p": 1,
    "/v": 2,
  };

  const indexToPath = {
    0: "/",
    1: "/p",
    2: "/v",
  };

  const handleChange = (event, newValue) => {
    history.push(indexToPath[newValue]);
  };

  return (
    <Box display="flex" flexDirection={"column"} style={{ height: "100%" }}>
      <div flexGrow={1} style={{ height: "100%", overflow: "scroll" }}>
        {children}
      </div>
      <AppBar position={"sticky"} style={{ bottom: 0 }}>
        <Tabs
          value={pathToIndex[match.path]}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<CreateIcon />} label={"Issue"} />
          <Tab icon={<BorderColorIcon />} label={"Present"} disabled />
          <Tab icon={<CheckCircleOutlineIcon />} label={"Verify"} />
        </Tabs>
      </AppBar>
    </Box>
  );
};
