import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import logo from "../assets/Logo.png";
import "./Client.css";
import { AuthContext } from "../contexts/Auth";
const NavBarStation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav-bar-station" light expand="md">
        <NavbarBrand href="/station">
          <img src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/station/bills">Tạo giao dịch</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/station/products">Sản phẩm</NavLink>
            </NavItem>
          </Nav>
          <button
            className="logout-btn btn-primary rounded"
            
            style={{margin:0}}
            value="Logout"
            onClick={auth.onLogout}
           
          >
            Logout
          </button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBarStation;
