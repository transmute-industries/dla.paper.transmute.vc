import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { darken, lighten } from "@material-ui/core/styles/colorManipulator";
import { grey } from "@material-ui/core/colors";

let themeArgs;

if (!themeArgs) {
  themeArgs = {
    primaryColor: grey["200"],
    secondaryColor: "#594aa8",
  };
}
const { primaryColor, secondaryColor } = themeArgs;

const theme = createMuiTheme({
  splashImage: "",
  palette: {
    type: "light",
    primary: {
      light: lighten(primaryColor, 0.07),
      main: primaryColor,
      dark: darken(primaryColor, 0.07),
    },
    secondary: {
      light: lighten(secondaryColor, 0.07),
      main: secondaryColor,
      dark: darken(secondaryColor, 0.07),
    },
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
});

export const Theme = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
