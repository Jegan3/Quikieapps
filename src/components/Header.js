/*eslint-disable*/
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../App.scss"

const Herder = () => {

  return (
    <div className="header">
      <AppBar sx={{ backgroundColor: "#35496b" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography textColor="inherit" variant="contained">
              <div className="quikie">Quikie</div><span className="apps">Apps</span>
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Herder;
