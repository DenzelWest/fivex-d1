import React from "react";
import Logo2x from "../../images/logo2x.png";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      <img className="logo-light logo-img" src={Logo2x} alt="logo" />
      <img className="logo-dark logo-img" src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
