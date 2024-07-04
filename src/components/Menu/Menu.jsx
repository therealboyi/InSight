// src/components/Menu/Menu.js
import React from 'react';
import './Menu.scss';

const Menu = () => {
  return (
    <nav className="Menu">
      <ul className="Menu__list">
        <li className="Menu__item"><a href="/" className="Menu__link">Home</a></li>
        <li className="Menu__item"><a href="/saved" className="Menu__link">Saved</a></li>
        <li className="Menu__item"><a href="/assistance" className="Menu__link">Assistance</a></li>
        <li className="Menu__item"><a href="/profile" className="Menu__link">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Menu;
