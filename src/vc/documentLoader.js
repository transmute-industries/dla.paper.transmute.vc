import { contexts } from "../contexts";
import axios from "axios";

import * as bls12381 from "@transmute/did-key-bls12381";
import * as ed25519 from "@transmute/did-key-ed25519";

export const documentLoader = async (iri) => {
  if (contexts[iri]) {
    return {
      documentUrl: iri,
      document: contexts[iri],
    };
  }

  if (iri.includes("did:web:")) {
    let url = `https://did-web.web.app/api/v1/identifiers/${iri}`;
    const resp = await axios.get(url);
    return {
      documentUrl: iri,
      document: resp.data,
    };
  }

  if (iri.startsWith("did:key:zUC")) {
    const { didDocument } = await bls12381.driver.resolve(iri, {
      accept: "application/did+ld+json",
    });
    return {
      documentUrl: iri,
      document: didDocument,
    };
  }

  if (iri.startsWith("did:key:z6M")) {
    const { didDocument } = await ed25519.driver.resolve(iri, {
      accept: "application/did+ld+json",
    });
    return {
      documentUrl: iri,
      document: didDocument,
    };
  }

  if (iri.startsWith("https://")) {
    const resp = await axios.get(iri);
    return {
      documentUrl: iri,
      document: resp.data,
    };
  }

  console.warn("Unsupported " + iri);
  throw new Error("Unsupported " + iri);
};
