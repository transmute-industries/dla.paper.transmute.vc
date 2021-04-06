import { documentLoader } from "./documentLoader";
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
} from "@mattrglobal/jsonld-signatures-bbs";
import { checkStatus } from "@transmute/vc-status-rl-2020";
import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";
import { ld as vcjs } from "@transmute/vc.js";

const suiteMap = {
  Ed25519Signature2018: Ed25519Signature2018,
  BbsBlsSignature2020: BbsBlsSignature2020,
  BbsBlsSignatureProof2020: BbsBlsSignatureProof2020,
};

const wrapInVp = (credential) => {
  return {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiablePresentation"],
    verifiableCredential: [credential],
  };
};

export const verify = async (credential) => {
  const result = await vcjs.verify({
    unsignedPresentation: wrapInVp(credential),
    suiteMap,
    checkStatus: (args) => {
      return checkStatus({ ...args, suiteMap });
    }, // required
    documentLoader,
  });
  console.log(result);
  return result.verified;
};
