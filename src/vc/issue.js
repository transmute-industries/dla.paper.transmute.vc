import { encode } from "@digitalbazaar/cborld";
import { documentLoader } from "./documentLoader";
import moment from "moment";
import * as bls12381 from "@transmute/did-key-bls12381";
import * as ed25519 from "@transmute/did-key-ed25519";

import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
  deriveProof,
} from "@mattrglobal/jsonld-signatures-bbs";
import { ld as vcjs } from "@transmute/vc.js";
import { checkStatus } from "@transmute/vc-status-rl-2020";

import key1 from "../store/data/key1.json";
import key2 from "../store/data/key2.json";

const base32Encode = require("base32-encode");

export const issue = async (credential, type) => {
  let suite;
  let key = type === "Ed25519" ? key1 : key2;
  const credentialTemplate = {
    ...credential,
    issuer: {
      ...credential.issuer,
      id: key.controller,
    },
  };

  if (type === "Ed25519") {
    suite = new Ed25519Signature2018({
      key: await ed25519.Ed25519KeyPair.from(key),
      date: moment().format("YYYY-MM-DD") + "T00:00:00Z",
    });
  } else {
    suite = new BbsBlsSignature2020({
      key: await bls12381.Bls12381G2KeyPair.from(key),
      date: moment().format("YYYY-MM-DD") + "T00:00:00Z",
    });
    credentialTemplate["@context"].push("https://w3id.org/security/bbs/v1");
  }

  let vc = await vcjs.issue({
    credential: credentialTemplate,
    suite,
    documentLoader,
  });

  const wrapInVp = (credential) => {
    return {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiablePresentation"],
      verifiableCredential: [credential],
    };
  };

  const suiteMap = {
    Ed25519Signature2018,
    BbsBlsSignature2020,
    BbsBlsSignatureProof2020,
  };

  const verification = await vcjs.verify({
    unsignedPresentation: wrapInVp(vc),
    suiteMap,
    checkStatus: (args) => {
      return checkStatus({ ...args, suiteMap });
    }, // required
    documentLoader,
  });

  console.log("good: ", JSON.stringify(vc, null, 2));

  console.log("checking credential: ", verification);

  // disabled because of wasm bug
  // if (vc.proof.type === "BbsBlsSignature2020") {
  //   const frame = {
  //     "@context": [
  //       "https://www.w3.org/2018/credentials/v1",
  //       "https://w3id.org/vaccination/v1",
  //       "https://w3id.org/bbs/v1",
  //     ],
  //     type: ["VerifiableCredential", "VaccinationCertificate"],
  //     id: "urn:uvci:af5vshde843jf831j128fj",
  //     name: {},
  //     description: {},
  //     issuanceDate: {},
  //     expirationDate: {},
  //     issuer: {},
  //     credentialSubject: {
  //       "@explicit": true,
  //       type: ["VaccinationEvent"],
  //       batchNumber: {},
  //       administeringCentre: {},
  //       healthProfessional: {},
  //       countryOfVaccination: {},
  //     },
  //   };

  //   const derived = await deriveProof(vc, frame, {
  //     suite: new BbsBlsSignatureProof2020(),
  //     documentLoader,
  //   });

  //   vc = derived;

  //   console.log("vc: ", JSON.stringify(vc, null, 2));
  // }

  const cborldBytes = await encode({
    jsonldDocument: vc,
    documentLoader,
  });

  return base32Encode(cborldBytes, "RFC4648");
};
