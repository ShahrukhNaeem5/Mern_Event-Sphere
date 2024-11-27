import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const userRole = localStorage.getItem('Userroleee_login');

      // If the role is not 'admin', redirect to login or exhibitor panel
      if (userRole !== 'admin') {
          navigate('/login');
      }
  }, [navigate]);

  var userData = localStorage.getItem("Admindata");
  var User = JSON.parse(userData)

  // State to manage the visibility of submenus
  const [openMenu, setOpenMenu] = useState(null);

  // Function to toggle the menu visibility
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const gradientStyleacctheme = {
    background: 'linear-gradient(to right, #000000, #111111)', // Black gradient
  };

  return (
    <>
      <div className="app align-content-stretch d-flex flex-wrap">
        <div className="app-sidebar" style={gradientStyleacctheme}>
          <div className="logo" style={gradientStyleacctheme}>
            <Link to="/Exhibitor" className="logo-icon">
              <span className="logo-text text-white">EventSphere</span>
            </Link>
            <div className="sidebar-user-switcher user-activity-online">
              <Link to="">
                <img src={User.Userimage ? `http://localhost:5000/uploads/profileImages/${User.Userimage}` : 'avatar1.jpg'} alt="avatar" />
                <span className="activity-indicator"></span>
                <span className="user-info-text text-white">
                  {User.Username}<br />
                  <span className="user-state-info">Active</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="app-menu">
            <ul className="accordion-menu">
              <li className="sidebar-title" style={{ color: 'white' }}>
                Admin Dashboard
              </li>
              <li>
                <Link to="/" style={{ color: 'white' }}>
                  <i className="material-icons-two-tone">dashboard</i>Dashboard
                </Link>
              </li>

              {/* Expo Events */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'expo'}
                  onClick={() => toggleMenu('expo')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">event</i>Expo Events
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'expo' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'expo'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'expo' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addevent">
                        Add Event
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/eventdetails">
                        Event Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'user'}
                  onClick={() => toggleMenu('user')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">login</i>Users
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'user' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'user'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'user' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/adduser">
                        Add User
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showuser">
                        Show User
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Workshops */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'workshop'}
                  onClick={() => toggleMenu('workshop')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">work</i>Workshops
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'workshop' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'workshop'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'workshop' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addworkshop">
                        Add Workshop
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showworkshop">
                        Workshop Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Booths */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'booth'}
                  onClick={() => toggleMenu('booth')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">store</i>Booths
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'booth' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'booth'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'booth' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addbooth">
                        Add Booths
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showbooth">
                        Booth Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Floors */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'floors'}
                  onClick={() => toggleMenu('floors')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">layers</i>Floors
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'floors' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'floors'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'floors' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addfloor">
                        Add Floors
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showfloor">
                        Floor Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Halls */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'halls'}
                  onClick={() => toggleMenu('halls')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">meeting_room</i>Halls
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'halls' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'halls'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'halls' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addhall">
                        Add Halls
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showhall">
                        Hall Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Speakers */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'speakers'}
                  onClick={() => toggleMenu('speakers')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">mic</i>Speakers
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'speakers' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'speakers'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'speakers' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/addspeaker">
                        Add Speakers
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/showspeaker">
                        Speaker Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Bookings */}
              <li>
                <a
                  className="has-arrow"
                  href="#"
                  aria-expanded={openMenu === 'bookings'}
                  onClick={() => toggleMenu('bookings')}
                  style={{ color: 'white' }}
                >
                  <i className="material-icons-two-tone">book_online</i>Bookings
                  <i
                    className={`material-icons has-sub-menu ${
                      openMenu === 'bookings' ? 'arrow-down' : 'arrow-right'
                    }`}
                  >
                    {openMenu === 'bookings'
                      ? 'keyboard_arrow_down'
                      : 'keyboard_arrow_right'}
                  </i>
                </a>
                {openMenu === 'bookings' && (
                  <ul className="sub-menu" style={gradientStyleacctheme}>
                    <li>
                      <Link className="text-white" to="/adminbookings">
                        Booking Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
