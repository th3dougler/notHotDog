import { useState, useRef } from "react";
import {
  Button,
  Typography,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Box,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default function LoginButtons(props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup='true'
        aria-label={"login" + props.type}
        onClick={handleToggle}
        color='inherit'
        startIcon={props.icon}>
        <Typography variant='body1'>
          {props.type[0]}
          <Box component='span' display={{ xs: "none", sm: "inline" }}>
            {props.type.slice(1)}
          </Box>
        </Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  <MenuItem
                    onClick={handleClose}
                    to={`/${props.type}/login`}
                    component={RouterLink}>
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    to={`/${props.type}/signup`}
                    component={RouterLink}>
                    Create Profile
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}