import React, { useState, useEffect } from 'react';
import Button from './Button';
import '../styles/profile.css';
import { Link } from "react-router-dom";
const Profilepopup = ({ showdetail, onMouseLeave, onMouseEnter, logout,userDetails ,loading,error}) => {
  console.log("wooooooooo",userDetails)
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={showdetail ? 'profile_detail' : 'hidden_detail'}>
      {loading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {userDetails?.[0] && (
            <>
              <div className='detail_out'>First Name: {userDetails?.[0].firstName}</div>
              <hr />
              <div className='detail_out'>Last Name: {userDetails?.[0].lastName}</div>
              <hr />
              <div className='detail_out'>Username: {userDetails?.[0].username}</div>
              <hr />
              <div className='detail_out'><Link to={`/changePassword/${userDetails?.[0]?.username}`}>Change Password</Link></div>
              <hr />
            </>
          )}

          <div className="buttons">

          <Link to={`/Editprofile/${userDetails?.[0].username}`}>
            <Button text={"Edit"} />
            </Link>
            <div onClick={logout} className="logout"><a href="/"><Button text="Log Out" /></a></div>

          </div>
        </>
       )}  
    </div>
  );
}

export default Profilepopup;
