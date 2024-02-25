import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Meu Site</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Início</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sobre">Sobre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contato">Contato</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
