import React from 'react'
import { removeToken } from "../utils/authOperations";
import { useHistory } from "react-router-dom";

import "./header.css"

function Header() {
    const history = useHistory()
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?") === true) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            history.push("/")
          } 
    }
    return (

        <div className='header'>
            {console.log("header component rendering")}
            <label className='title__header'>LAUNDRY</label>
            <nav className='Navbar'>
                <div className='list__item'>
                    Pricing
                </div>
                <div className='list__item'>
                    Career
                </div>
                <a className="user__header list__item" onClick={handleLogout} href="/">
                    <img className='user__img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlaLQbsUuG2BEilGZ1ivDGcnSfMiFxkbzknA&usqp=CAU' alt="user" />
                    <p>{localStorage.getItem("user")}</p></a>

            </nav>

        </div>
    )
}

export default Header