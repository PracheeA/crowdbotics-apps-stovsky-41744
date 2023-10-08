import React, { useState } from 'react';
import './Sidebar.css'; // You can create a CSS file for styling
import home from '../assets/Images/home.svg'
import search from '../assets/Images/search1.svg'
import book from '../assets/Images/book.svg'
import logout1 from '../assets/Images/logout.svg'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form,Image } from "react-bootstrap";
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector } from "react-redux"
function Sidebar() {
  // Initialize state to keep track of the active menu item
  const [activeMenuItem, setActiveMenuItem] = useState();
  let navigate = useNavigate();
  const dispatch = useDispatch()
  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    const menunavigate='/'+ menuItem;
    navigate(menunavigate)
  };

  const onLogout = () => {
    alert()
    navigate('/')
    dispatch(logout())
   
  }

  return (
    <div className="App">
     
      <nav className="sidebar">
        <ul>
        {/* <li className='sidebarTitle p-4'>Stovsky</li> */}
          <li
            className={`${(activeMenuItem == "Home") ? 'active' : ''} py-3 `}
            onClick={() => handleMenuItemClick('Home')}
          >
             <Image src={home}  className='navbarimg'  />
            Home
          </li>
          <li
          className={`${(activeMenuItem == "listofcandidate") ? 'active' : ''} py-3 `}
            onClick={() => handleMenuItemClick('listofcandidate')}
          >
            <Image src={search}  className='navbarimg'  />
            Search Candidates
          </li>
          <li
           className={`${(activeMenuItem == "listofrequirements") ? 'active' : ''} py-3 `}
            onClick={() => handleMenuItemClick('listofrequirements')}
          ><Image src={book}  className='navbarimg'  />
           Transcribed Data
          </li>
          
        </ul>

        <div  className="mt-auto logoutcss">
        <Image src={logout1}  onClick={onLogout}  className='navbarimg'  />
          Logout</div>
      </nav>



      
    </div>

    
  );
}

export default Sidebar;
