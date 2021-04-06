import React from "react";
import { Route } from "react-router-dom";

import Issue from "./Issue";
import Present from "./Present";
import Verify from "./Verify";

export const Routes = () => {
  //   React.useEffect(() => {
  //     (async () => {
  //       await registerWalletWithBrowser();
  //     })();
  //   }, []);
  return (
    <>
      {[
        {
          path: "/",
          exact: true,
          page: (
            <>
              <Issue />
            </>
          ),
        },
        {
          path: "/p",
          exact: false,
          page: (
            <>
              <Present />
            </>
          ),
        },
        {
          path: "/v",
          exact: true,
          page: (
            <>
              <Verify />
            </>
          ),
        },
      ].map((p) => {
        return (
          <Route key={p.path} path={p.path} exact={p.exact}>
            {p.page}
          </Route>
        );
      })}
    </>
  );
};
