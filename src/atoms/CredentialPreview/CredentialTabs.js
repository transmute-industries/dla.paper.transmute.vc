import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Box from "@material-ui/core/Box";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { JSONEditorReact } from "../JSONEditorReact";

import { CredentialObject } from "./CredentialObject";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabLabel: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

export const CredentialTabs = ({ credential, subject, issuer }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab
          label="Details"
          {...a11yProps(0)}
          icon={<AssignmentIcon />}
          className={classes.tabLabel}
        />
        <Tab
          label={"Issuer"}
          {...a11yProps(1)}
          icon={<AccountBalanceIcon />}
          className={classes.tabLabel}
        />

        <Tab
          label={"Security"}
          icon={<EnhancedEncryptionIcon />}
          {...a11yProps(2)}
          className={classes.tabLabel}
        />
      </Tabs>
      <br />
      <TabPanel value={value} index={0}>
        <CredentialObject obj={subject} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CredentialObject obj={issuer} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JSONEditorReact json={credential} />
      </TabPanel>
    </div>
  );
};
