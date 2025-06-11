import React, { useState ,useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profilePic from '../assets/profilePic.svg';
import Arrow from './Arrow';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropDownIsOpen, setDropDownIsOpenState] = useState(false);
        const [userData, setUserData] = useState({
      userName: "ahlem name",
      userEmail: "email@example.com",
      fullName: "Nom Inconnu"
    });
      useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserData({
        userName: storedUser?.registration_number || "ahlem name",
        userEmail: storedUser?.email || "email@example.com",
        fullName: storedUser?.nom || "Nom Inconnu"
      });
    }, []);

    const handleClickEvent = () => {
        setDropDownIsOpenState(!dropDownIsOpen);
    };

    const logOut = () => {
        navigate('/'); // Redirect to login page on logout
    };

    // Determine active link based on current path
    const isActive = (path) => {
        return location.pathname.toLowerCase() === path.toLowerCase() || 
               location.pathname.toLowerCase().startsWith(`${path.toLowerCase()}/`);
    };

    return (
        <nav style={{
            backgroundColor: "#273142",
            position: "sticky",
            top: "0",
            zIndex: "20",
            height: "64px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
            {/* Logo aligned to the left */}
            <img 
                src={logo} 
                alt="logo"
                style={{ 
                    height: "30%", 
                    objectFit: "contain"
                }} 
            />

            {/* Navigation Links */}
            <ul style={{
                display: "flex",
                gap: "48px",
                alignItems: "center",
                listStyle: "none",
                padding: 0,
                flexGrow: 1,
                justifyContent: "center",
            }}>
                {[
                    { path: "/home", label: "Home" },
                    { path: "/history", label: "History" }
                ].map((item) => (
                    <li key={item.path}>
                        <Link 
                            to={item.path} 
                            style={{
                                color: isActive(item.path) ? "#FF8500" : "white",
                                textDecoration: isActive(item.path) ? "underline" : "none",
                                textUnderlineOffset: "4px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                padding: "8px 12px",
                                transition: "color 0.3s, text-decoration 0.3s"
                            }}
                            onMouseOver={(e) => {
                                if (!isActive(item.path)) {
                                    e.target.style.color = "#FF8500";
                                    e.target.style.textDecoration = "underline";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isActive(item.path)) {
                                    e.target.style.color = "white";
                                    e.target.style.textDecoration = "none";
                                }
                            }}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Rest of your component remains the same */}
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
                    {userData.userName}
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
                                <p style={{ fontSize: "16px", fontWeight: "bold", color: "black", margin: 0 }}>{userData.userName}</p>
                                <p style={{ fontSize: "14px", margin: 0 }}>{userData.userEmail}</p>
                            </div>
                        </li>
                        <li 
                            style={{
                                padding: "8px 16px",
                                color: "#4E4E4E",
                                cursor: "pointer",
                                transition: "background 0.3s"
                            }}
                            onClick={() => navigate("/signin")}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#ADD8E6"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;