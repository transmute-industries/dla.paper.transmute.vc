import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { compose } from "redux";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";

import { Base } from "./Base";

import { CredentialSubject } from "../atoms/CredentialSubject";
import { transmute } from "../store/transmute";
import { issue } from "../vc/issue";

import { CustomAppBar } from "../atoms/CustomAppBar";

import template from "../store/data/template.json";

import history from "../store/history";

import { TransmuteLoading } from "../atoms/TransmuteLoading";

export const Issue = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    credential: template,
  });
  const [key, setKey] = React.useState("Ed25519");

  const handleCredentialChange = (newCredential) => {
    setState({ credential: newCredential });
  };

  const handleIssue = () => {
    setLoading(true);
    setTimeout(async () => {
      const vcUri = await issue(state.credential, key);
      history.push("/p?c=" + vcUri);
      setLoading(false);
    }, 1 * 1000);
  };

  const handleKeyChange = () => {
    if (key === "Ed25519") {
      setKey("Bls12381");
    } else {
      setKey("Ed25519");
    }
  };
  return (
    <Base match={props.match}>
      <CustomAppBar
        primaryActions={
          <>
            {key === "Ed25519" ? "Without disclosure" : "With disclosure"}
            <Switch checked={key === "Bls12381"} onChange={handleKeyChange} />
            <Button
              variant={"contained"}
              onClick={handleIssue}
              color={"secondary"}
              disabled={loading}
            >
              Issue
            </Button>
          </>
        }
      />

      {loading ? (
        <TransmuteLoading />
      ) : (
        <CredentialSubject
          credential={state.credential}
          onChange={handleCredentialChange}
        />
      )}
    </Base>
  );
};

export default compose(withRouter, transmute.container)(Issue);
