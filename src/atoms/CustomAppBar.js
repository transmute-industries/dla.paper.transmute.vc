import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "./purple-logo-with-text.svg";
import CodeIcon from "@material-ui/icons/Code";
import history from "../store/history";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const CustomAppBar = ({ primaryActions }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "32px", cursor: "pointer", paddingTop: "8px" }}
            onClick={() => {
              history.push("/");
            }}
          />
        </Typography>

        {primaryActions}
        <Button
          style={{ marginLeft: "16px" }}
          endIcon={<CodeIcon />}
          onClick={() => {
            window.open(
              "https://github.com/transmute-industries/dla.paper.transmute.vc"
            );
          }}
        >
          View Source
        </Button>
      </Toolbar>
    </AppBar>
  );
};
