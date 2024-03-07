import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import logo from './LMU_logo.jpg';


const Styles = styled.div`
  .navbar {
    background-color: white;
    
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: black;
    font-size: 22px;
    font-weight: bold; 
    padding-right: 20px;

    &:hover {
      color: #0096FF;
    }
  }

`;

export const NavigationBar = () => {
  return (
    <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/"> 
      <img src={logo} alt="Logo" width="250" height="125" /></Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/connect">Connect</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/inbox">Inbox</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/calendar">Calendar</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/forms">Forms</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/popup">Popup</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse> 
    </Navbar>
  </Styles>
  );
  
}










// function BasicExample() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;