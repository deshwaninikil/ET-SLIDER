import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const navStyles = `${scrollPosition > 236 ? "navbgwht" : ""} ${
    scrollPosition > 95 ? "sticky" : ""
  } fixednav`;

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const menuBtnHandler = () => setNavOpen((prev) => !prev);

  const closeNavHandler = () => setNavOpen(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={navStyles}>
      <nav className="navbar">
        <div className="headermain dp_row dp_justifycontentspcbet aligncenter dp_flexrowreverse">
          <div className="navbar-header">
            <div className="menubtnbox">
              <div
                className={`menubtn ${navOpen ? "open" : ""}`}
                onClick={menuBtnHandler}
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </div>
            </div>
            <div className="menulogobox">
              <Link
                href="/"
                className={`${
                  scrollPosition > 236 ? "menubtnbox" : ""
                } navbar-brand`}
              >
                {" "}
                <img
                  alt="logo"
                  src="https://economictimes.indiatimes.com/photo/98444583.cms"
                />
              </Link>
            </div>
          </div>
          <div className={`collesped_menu ${navOpen ? "open_menu" : ""}`}>
            <div className="mobbg">
              <div className="menuOpenlogobox">
                <Link href="/" className="navbar-brand">
                  {" "}
                  <img
                    alt="logo"
                    src="https://economictimes.indiatimes.com/photo/98444583.cms"
                  />
                </Link>
              </div>
              <ul
                className="nav navbar-nav dp_row dp_justifycontentcenter aligncenter"
                onClick={closeNavHandler}
              >
                <li>
                  <Link href="#about" className="homeHeader redtab scrollnavTo">
                    {props.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#speakerSec"
                    className="homeHeader redtab scrollnavTo"
                  >
                    {props.speakers}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Agenda"
                    className="homeHeader redtab scrollnavTo"
                  >
                    {props.agenda}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

Navbar.defaultProps = {
  about: "About",
  speakers: "Speakers",
  agenda: "Agenda",
};
