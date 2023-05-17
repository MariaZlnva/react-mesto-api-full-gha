import React from "react";

function Footer({ isloggedIn }) {
  const data = new Date();
  const year = data.getFullYear();

  return (
    isloggedIn && (
      <footer className="footer page__footer">
        <p className="footer__copyright">© {year} Mesto Russia</p>
      </footer>
    )
  );
}

export default Footer;
