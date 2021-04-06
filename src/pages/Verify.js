import React from "react";
import QrReader from "react-qr-reader";
import Grid from "@material-ui/core/Grid";

import { Base } from "./Base";
import { decode } from "@digitalbazaar/cborld";
import { withRouter } from "react-router";
import { compose } from "redux";

import { CustomAppBar } from "../atoms/CustomAppBar";

import { transmute } from "../store/transmute";
import { documentLoader } from "../vc/documentLoader";

import { CredentialPreview } from "../atoms/CredentialPreview";

import { verify } from "../vc/verify";

const base32Decode = require("base32-decode");

export const Verify = (props) => {
  const [state, setState] = React.useState({
    decoded: null,
  });

  const handleScan = async (data) => {
    if (data) {
      console.log(data);
      const encoded = base32Decode(data, "RFC4648");
      console.log({ encoded });
      const decoded = await decode({
        cborldBytes: encoded,
        documentLoader,
      });
      console.log(JSON.stringify(decoded, null, 2));
      setState({
        ...state,
        decoded: decoded,
      });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  React.useEffect(() => {
    (async () => {
      if (window.location.search) {
        const c = window.location.href.split("?c=").pop();
        const encoded = base32Decode(c, "RFC4648");
        console.log({ encoded });
        const decoded = await decode({
          cborldBytes: encoded,
          documentLoader,
        });
        console.log(JSON.stringify(decoded, null, 2));
        setState({
          ...state,
          decoded: decoded,
        });
      }
    })();
  }, []);

  return (
    <Base match={props.match}>
      <CustomAppBar />
      <div style={{ paddingTop: "64px" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          {!state.decoded ? (
            <Grid item>
              <div style={{ width: window.innerWidth / 1.2, padding: "32px" }}>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </div>
            </Grid>
          ) : (
            <Grid item>
              <CredentialPreview credential={state.decoded} verify={verify} />
            </Grid>
          )}
        </Grid>
      </div>
    </Base>
  );
};

export default compose(withRouter, transmute.container)(Verify);
