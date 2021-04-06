import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SecurityIcon from "@material-ui/icons/Security";
import CachedIcon from "@material-ui/icons/Cached";
import { yellow, red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const CredentialAvatar = ({ image, verified }) => {
  const classes = useStyles();

  let badgeColor = yellow["800"];
  let badgeIcon = <CachedIcon />;

  if (verified === false) {
    badgeColor = red["500"];
    badgeIcon = <CloseIcon />;
  }

  if (verified === true) {
    badgeColor = green["500"];
    badgeIcon = <CheckIcon />;
  }

  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 32,
      height: 32,
      border: `2px solid ${theme.palette.background.paper}`,
      background: badgeColor,
      position: "absolute",
    },
  }))(Avatar);

  let mainProps = {};

  if (image) {
    mainProps.src = image;
  } else {
    mainProps.children = (
      <SecurityIcon
        style={{
          width: 48,
          height: 48,
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <>
            <SmallAvatar>{badgeIcon}</SmallAvatar>
            {verified === null && (
              <>
                <CircularProgress style={{ color: badgeColor }} />
              </>
            )}
          </>
        }
      >
        <Avatar
          style={{
            width: 64,
            height: 64,
          }}
          alt="credential logo"
          {...mainProps}
        />
      </Badge>
    </div>
  );
};
