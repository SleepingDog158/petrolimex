import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import logo from "../assets/Logo.png"
import './Client.css'

const NavBarStation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav-bar-station" light expand="md">
        <NavbarBrand href="/"><img src={logo}/></NavbarBrand>
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
          <NavbarText style={{color: "white", marginRight:"10px", fontWeight:"500"}}>Logout</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarStation;