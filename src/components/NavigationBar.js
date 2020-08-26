import React, { useState } from "react";
import "./NavigationBar.css";
import logo from "../assets/BigLogo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavbarBrand href="/">
          <img className="logo" src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nametag" href="">Username</NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="logout" type="button">
            Logout
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
