import Link from "next/link";
import { Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import React, { useContext } from "react";
import Router from "next/router";

const NavBar = () => {
  const {
    currentUser,
    setCurrentUser,
    restaurantQuery,
    setRestaurantQuery,
    dishesQuery,
    setDishesQuery,
    viewMode
  } = useContext(AppContext);
  
  const searchParams = (e) => {
    if (viewMode === "restaurant") {
      setRestaurantQuery(e.target.value.toLocaleLowerCase())
      setDishesQuery("")
    } else {
      setDishesQuery(e.target.value.toLocaleLowerCase())
      setRestaurantQuery("")
    }
}

  const logOut = (e) => {
    setCurrentUser("");
  }

  return (
    <Nav className="navbar navbar-expand-lg navbar-light justify-content-between" style={{ backgroundColor: '#e3f2fd' }}>
      <NavItem className="mr-auto">
        <form className="form-inline my-2 my-lg-0">
          <input 
            className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search"
            onChange={searchParams}
            value={restaurantQuery || dishesQuery} />
          <button
            className="btn btn-info"
            type="submit" 
          >Search</button>
          <a onClick={()=>Router.push("/")} className="brand">Restaurantie!</a>
        </form>
      </NavItem>
      <NavItem className="nav-link">
        {currentUser ? (
          <h3>{currentUser}</h3>
        ):(
          <Link href="/register">
            <button type="button" className="btn btn-info">Sign Up</button>
          </Link>
        )}
      </NavItem>
      <NavItem className="nav-link">
        {currentUser ? (
          <Link href="/">
            <button
              className="btn btn-info"
              type="submit"
              onClick={() => {
                logOut();
              }}
            >Logout</button>
          </Link>
        ):(
          <Link href="/login">
            <button type="button" className="btn btn-info">Sign In</button>
          </Link>
        )}
      </NavItem>
    </Nav>
  );
}

export default NavBar;