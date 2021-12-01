import React from "react";
import { Link } from "react-router-dom";
import SportBenchLogo from '../LogoSportBench.svg'

export default function SideBar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "20rem", height: "100vh", position: "fixed" }}
    >
      <Link
        to="/home"
        className="d-flex align-items-center ms-3 my-2 text-white text-decoration-none"
      >
        <img className="d-block" src={SportBenchLogo} alt="" style={{height: '30px'}} />
        <h4 className="mb-0 ms-2">Sport Bench</h4>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="mb-3">
          <Link
            to="/home"
            className="nav-link d-flex text-white"
            aria-current="page"
          >
            <span className="d-block material-icons me-2">home</span>
            <span className="d-block">Home</span>
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard"
            className="nav-link d-flex text-white"
            aria-current="page"
          >
            <span className="d-block material-icons me-2">dashboard</span>
            <span className="d-block">Dashboard</span>
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/orders"
            className="nav-link d-flex text-white"
            aria-current="page"
          >
            <span className="d-block material-icons me-2">receipt</span>
            <span className="d-block">Orders</span>
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/products"
            className="nav-link d-flex text-white"
            aria-current="page"
          >
            <span className="d-block material-icons me-2">category</span>
            <span className="d-block">Products</span>
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/customers"
            className="nav-link d-flex text-white"
            aria-current="page"
          >
            <span className="d-block material-icons me-2">account_circle</span>
            <span className="d-block">Customers</span>
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="/"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <p className="dropdown-item" href="#">
              New project...
            </p>
          </li>
          <li>
            <p className="dropdown-item" href="#">
              Settings
            </p>
          </li>
          <li>
            <p className="dropdown-item" href="#">
              Profile
            </p>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <p className="dropdown-item" href="#">
              Sign out
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
