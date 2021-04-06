import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "8px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const CredentialField = ({ label, value }) => {
  const classes = useStyles();
  let correctedLabel = label;

  if (label === "Id") {
    correctedLabel = "ID";
  }

  let variant = "standard";

  if (label === "Id" || label === "Type") {
    variant = "filled";
  }

  return (
    <div className={classes.root}>
      <TextField
        size={"small"}
        label={correctedLabel}
        value={label === "Type" ? _.startCase(value) : value}
        fullWidth
        InputProps={{
          disableUnderline: true,
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       {" "}
          //       <AccessTimeIcon />
          //     </InputAdornment>
          //   ),
        }}
        variant={variant}
      />
    </div>
  );
};
