import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.svg";
import profilePic from "../assets/profilePic.svg";
import logout from "../assets/logout.svg"; 
import notif from "../assets/notif.svg"; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Arrow from './Arrow';
import search from "../assets/search.svg"; 
import RemarqueCard from './RemarqueCard';
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #323D4E; /* Blue background */
  border-radius: 20px; /* More rounded */

    padding: 8px 14px;
  width: 250px;
`;



const SearchBar = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 14px;
  flex: 1;
  
  &::placeholder {
    color: white;
  }
`;



// Styled components for layout
const Layout = styled.div`
  display: flex;
`;
const NotificationItem = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 50px;
  color: ${({ active }) => (active ? "#ff8500" : "white")};

  img {
    filter: ${({ active }) => (active ? "brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1680%) hue-rotate(2deg) brightness(102%) contrast(106%)" : "none")};
    transition: filter 0.3s;
  }

  &:hover {
    color: #ff8500;

    img {
      filter: brightness(0) saturate(100%) invert(58%) sepia(79%) saturate(1680%) hue-rotate(2deg) brightness(102%) contrast(106%);
    }
  }
`;

const SidebarContainer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 17vw;
  height: 100vh;
  background-color: #19202b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 80%;
  object-fit: contain;
`;

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  transition: background 0.3s;
  background: ${({ active }) => (active ? "#ff8500" : "transparent")};

  &:hover {
    background: #ff8500;
  }
`;


const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #4e4e4e;
  margin: 10px 0;
`;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 17vw;
  width: calc(100% - 17vw);
  height: 60px;
  background-color: #1e293b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Content = styled.div`
  margin-left: 17vw;
  margin-top: 60px;
  padding: 20px;
  flex-grow: 1;
`;



const NavbarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 36px;
  height: 36px;
`;

const SidebarAndNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropDownIsOpen, setDropDownIsOpenState] = useState(false);
  const currentPath = location.pathname;
  


  const handleClickEvent = () => {
    setDropDownIsOpenState(!dropDownIsOpen);
  };

  const logOut = () => {
    navigate('/'); // Redirect to login page on logout
  };

  return (
    
    <Layout>
      {/* Sidebar */}
      <SidebarContainer>
    
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
        <NavLinks>
  <NavItem active={currentPath === "/dashboard"} onClick={() => navigate("/dashboard")}>
    Dashboard
  </NavItem>
  <NavItem active={currentPath === "/reports"} onClick={() => navigate("/reports")}>
    Reports History
  </NavItem>
  <Divider />
  <NavItem active={currentPath === "/settings"} onClick={() => navigate("/settings")}>
    Settings
  </NavItem>
  <NavItem onClick={logOut}>
    Logout 
    <img 
      src={logout} 
      style={{ cursor: "pointer", width: "24px", marginLeft: "10px" }}
      alt="logout" 
    />
  </NavItem>
</NavLinks>

      </SidebarContainer>
    

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Navbar */}
        <Navbar>
        <SearchContainer>
        <img 
      src={search} 
      alt="search" 
      style={{  width: "22px"  }} // Reduced icon size
    />
    <SearchBar type="text" placeholder="Search..." style={{  paddingLeft:"10px" , color:"#D6D8DC" }} />
  </SearchContainer>
          <NavbarSection>
          <NotificationItem
    active={currentPath === "/notifications"}
    onClick={() => navigate("/notifications")}
  >
    <img src={notif} alt="notif" width="24px" />
    Notifications
  </NotificationItem>
            
        

             {/* Profile Dropdown */}
                       <button 
                           style={{
                               display: "flex",
                               alignItems: "center",
                               justifyContent: "space-between",
                               fontSize: "14px",
                               fontWeight: "normal",
                               color: "white",
                               width: "176px",
                               background: "none",
                               border: "none",
                               cursor: "pointer"
                           }}
                           type="button"
                           onClick={handleClickEvent}
                       >
                           <div style={{
                               display: "flex",
                               alignItems: "center",
                               justifyContent: "center",
                               gap: "4px"
                           }}>
                               <img src={profilePic} alt="profile" style={{ borderRadius: "50%", width: "36px" }} />
                               User name
                               <Arrow state={dropDownIsOpen} fill="#FF8500" style={{ height: "8px" }} />
                           </div>
                       </button>
           
                       {dropDownIsOpen && (
                           <div style={{
                               fontSize: "14px",
                               color: "#4E4E4E",
                               zIndex: "50",
                               width: "320px",
                               backgroundColor: "white",
                               borderRadius: "8px",
                               position: "absolute",
                               top: "70px",
                               right: "30px",
                               border: "1px solid #1C82AD",
                               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                           }}>
                               <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                   <li style={{
                                       display: "flex",
                                       justifyContent: "space-around",
                                       alignItems: "center",
                                       padding: "12px 16px",
                                       borderBottom: "1px solid #1C82AD"
                                   }}>
                                       <img src={profilePic} alt="profile" style={{ borderRadius: "50%", width: "56px", height: "56px" }} />
                                       <div>
                                           <p style={{ fontSize: "16px", fontWeight: "bold", color: "black", margin: 0 }}>User name</p>
                                           <p style={{ fontSize: "14px", margin: 0 }}>loremIpsum@gmail.com</p>
                                       </div>
                                   </li>
                                   <li 
                                       style={{
                                           padding: "8px 16px",
                                           color: "#4E4E4E",
                                           cursor: "pointer",
                                           transition: "background 0.3s"
                                       }}
                                       onClick={logOut}
                                       onMouseOver={(e) => e.target.style.backgroundColor = "#ADD8E6"}
                                       onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                   >
                                       Logout 
                                       
                                   </li>
                               </ul>
                           </div>
                       )}
          </NavbarSection>

        </Navbar>
      </div>
    </Layout>
 
  );
};

export default SidebarAndNavbar;
