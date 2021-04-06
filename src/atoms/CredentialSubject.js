import React from "react";
// import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import _ from "lodash";

const SubjectString = ({ index, label, value, onChange }) => {
  return (
    <Grid item>
      <TextField
        label={_.startCase(label)}
        value={value}
        onChange={(event) => {
          onChange(label, event.target.value, index);
        }}
        // InputProps={{
        //   startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        // }}
        variant="outlined"
      />
    </Grid>
  );
};

const SubjectObject = ({ index, label, value, onChange }) => {
  const [expanded, setExpanded] = React.useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: !expanded[panel] });
  };

  return (
    <Accordion
      expanded={!expanded[`panel-${label}`]}
      onChange={handleChange(`panel-${label}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${label}`}
        id={`panel-header-${label}`}
        style={{ background: "#edeef7" }}
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: "8px", paddingTop: "16px" }}>
        <Grid container spacing={2}>
          {Object.keys(value).map((k, i) => {
            if (typeof value[k] === "string") {
              return (
                <SubjectString
                  key={`${index}-${k}-${i}`}
                  index={`${index}-${k}-${i}`}
                  label={k}
                  value={value[k]}
                  onChange={onChange}
                />
              );
            } else {
              return (
                <SubjectObject
                  key={`${index}-${k}-${i}`}
                  index={`${index}-${k}`}
                  label={k}
                  value={value[k]}
                  onChange={onChange}
                />
              );
            }
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const recusiveFind = (obj, currentIndex, targetIndex, newValue) => {
  if (typeof obj === "object") {
    Object.keys(obj).forEach((k, i) => {
      if (targetIndex === `${currentIndex}-${k}-${i}`) {
        const label = targetIndex.split("-")[targetIndex.split("-").length - 2];
        obj[label] = newValue;
      } else {
        return recusiveFind(
          obj[k],
          `${currentIndex}-${k}`,
          targetIndex,
          newValue
        );
      }
    });
  }
  return;
};

export const CredentialSubject = ({ credential, onChange }) => {
  const handleSubjectChange = (label, value, targetIndex) => {
    let newState = JSON.parse(JSON.stringify(credential.credentialSubject));
    recusiveFind(newState, `Subject`, targetIndex, value);
    onChange({ ...credential, credentialSubject: newState });
  };

  return (
    <SubjectObject
      index={`Subject`}
      label="Subject"
      value={credential.credentialSubject}
      onChange={handleSubjectChange}
    />
  );
};
