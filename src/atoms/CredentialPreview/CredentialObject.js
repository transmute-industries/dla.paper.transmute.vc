import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { sortObjectKeys } from "./sortObjectKeys";

import { CredentialField } from "./CredentialField";

import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const CredentialObject = ({ obj }) => {
  const classes = useStyles();
  let sorted = sortObjectKeys(obj);
  const [expanded, setExpanded] = React.useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: !expanded[panel] });
  };

  const keys = Object.keys(sorted);
  return (
    <Grid container spacing={1}>
      {keys.map((k) => {
        if (typeof sorted[k] === "object") {
          let label = _.startCase(k);
          // let label = _.startCase(k);
          if (parseInt(label).toString() === label) {
            label = "Item " + label;
          }

          return (
            <Grid item className={classes.root} xs={12}>
              <Accordion
                expanded={!expanded[`panel-${k}`]}
                onChange={handleChange(`panel-${k}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${k}`}
                  id={`panel-header-${k}`}
                  style={{ background: "#edeef7", border: "none" }}
                >
                  <Typography className={classes.heading}>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px" }}>
                  <CredentialObject obj={sorted[k]} />
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        }
        return (
          <Grid item xs={keys.length > 1 ? 6 : 12}>
            <CredentialField label={_.startCase(k)} value={sorted[k]} />
          </Grid>
        );
      })}
    </Grid>
  );
};
