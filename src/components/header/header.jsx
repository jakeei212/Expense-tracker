import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./header.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

const Header = ({ currentUser }) => {
  console.log(currentUser);
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <img
        style={{
          width: "60px",
          height: "60px",
        }}
        className="logo"
        src="https://img.icons8.com/doodle/48/000000/coins--v1.png"
      />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <div className="options">
            {currentUser?.currentUser ? (
              <div style={{
                  color:"white"
              }} className="option" onClick={() => auth.signOut()}>
                יציאה
              </div>
            ) : (
              <div>
                <Link onClick={toggleNav} className="option" to="/signin">
                  כניסה
                </Link>

                <Link onClick={toggleNav} className="option" to="/signup">
                  הרשמה
                </Link>
              </div>
            )}
          </div>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src="https://img.icons8.com/dotty/100/ffffff/menu.png"
        />
      </button>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
