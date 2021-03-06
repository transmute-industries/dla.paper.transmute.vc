import React from "react";
// import QRCode from "react-qr-code";
import Typography from "@material-ui/core/Typography";
import { Base } from "./Base";
import { decode } from "@digitalbazaar/cborld";
import { CustomAppBar } from "../atoms/CustomAppBar";

import { withRouter } from "react-router";
import { compose } from "redux";

import { transmute } from "../store/transmute";
import { documentLoader } from "../vc/documentLoader";

import { QR } from "@bloomprotocol/qr-react";

const base32Decode = require("base32-decode");
const QRCode = require("qrcode");

export const Present = (props) => {
  const c = window.location.href.split("?c=").pop();

  const [state, setState] = React.useState({
    name: "Verifiable Credential",
    issuer: "unknown",
  });

  const [qrcode, setQrCode] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const encoded = base32Decode(c, "RFC4648");
      QRCode.toDataURL(c, { mode: "alphanumeric" }, (err, dataUrl) => {
        setQrCode(dataUrl);
      });
      const decoded = await decode({
        cborldBytes: encoded,
        documentLoader,
      });
      setState({
        name: decoded.name,
        issuer:
          typeof decoded.issuer === "string"
            ? decoded.issuer
            : decoded.issuer.id,
      });
    })();
  }, []);
  return (
    <Base match={props.match}>
      <CustomAppBar />
      <div
        style={{
          textAlign: "center",
          padding: "32px",
          marginTop: "10%",
          maxWidth: "512px",
          margin: "auto",
        }}
      >
        <div style={{ marginTop: "20%", marginBottom: "8px" }}>
          <Typography variant={"h5"} gutterBottom>
            {state.name}
          </Typography>
          <Typography variant={"caption"}>
            <a href="https://dla.paper.transmute.vc">
              https://dla.paper.transmute.vc
            </a>
          </Typography>
        </div>

        <QR
          style={{ width: "100%", margin: "auto" }}
          data={c}
          height={512}
          width={512}
          fgColor={"#594aa8"}
          logo={{ hide: false, image: "/logo192.png", width: 16, height: 16 }}
        />
      </div>
    </Base>
  );
};

export default compose(withRouter, transmute.container)(Present);
