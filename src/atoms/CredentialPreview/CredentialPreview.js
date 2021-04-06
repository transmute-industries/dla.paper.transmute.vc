import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import moment from "moment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Grid from "@material-ui/core/Grid";

import { CredentialAvatar } from "./CredentialAvatar";
import { CredentialTabs } from "./CredentialTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  name: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const download = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const CredentialPreview = ({ credential, verify }) => {
  const classes = useStyles();

  const meta = JSON.parse(JSON.stringify(credential));
  delete meta["@context"];
  meta.type = Array.isArray(meta.type) ? meta.type.pop() : meta.type;
  if (meta.issuanceDate) {
    meta.issuanceDate = moment(meta.issuanceDate).format("LL");
    meta.issuanceDateFromNow = moment(meta.issuanceDate).fromNow();
  }
  if (meta.expirationDate) {
    meta.expirationDate = moment(meta.expirationDate).format("LL");
    meta.expirationDateFromNow = moment(meta.expirationDate).fromNow();
  } else {
    meta.expirationDate = "Never";
  }

  if (typeof meta.issuer === "string") {
    meta.issuer = { ID: meta.issuer };
  }

  const issuer = meta.issuer;
  delete meta.issuer;

  const subject = meta.credentialSubject;
  delete meta.credentialSubject;
  delete meta.proof;

  const [verified, setVerification] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (credential.proof) {
        const verified = await verify(credential);
        setTimeout(() => {
          setVerification(verified);
        }, 1 * 1000);
      } else {
        setVerification(true);
      }
    })();
  }, [credential, setVerification]);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <CredentialAvatar verified={verified} />
        <div style={{ marginLeft: "16px", marginTop: "16px" }}>
          <Typography className={classes.name}>{meta.name}</Typography>
          <Typography className={classes.description}>{meta.name}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                size={"small"}
                label={"Type"}
                disabled
                value={credential.proof.type}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {credential.proof.type.startsWith("BbsBls") ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
              />
            </Grid>
            <Grid item>
              <TextField
                size={"small"}
                label={"Issued"}
                disabled
                value={meta.issuanceDate}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
              />
            </Grid>
            <Grid item>
              <TextField
                size={"small"}
                label={"Expires"}
                disabled
                value={meta.expirationDate}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
                variant={"outlined"}
              />
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                className={classes.button}
                onClick={async () => {
                  const content = JSON.stringify(credential, null, 2);
                  const digest = await window.crypto.subtle.digest(
                    "SHA-256",
                    Buffer.from(content)
                  );
                  download(
                    Buffer.from(digest).toString("hex") + ".vc.json",
                    content
                  );
                }}
                startIcon={<CloudDownloadIcon />}
              >
                Download
              </Button>
            </Grid>
            <Grid item xs={12}>
              <CredentialTabs
                credential={credential}
                subject={subject}
                issuer={issuer}
              />
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
