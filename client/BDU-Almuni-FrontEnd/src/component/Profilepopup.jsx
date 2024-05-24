import React, { useState, useEffect } from 'react';
import Button from './Button';
import '../styles/profile.css';
import { Link } from "react-router-dom";
const Profilepopup = ({ showdetail, onMouseLeave, onMouseEnter, logout,userDetails ,loading,error}) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={showdetail ? 'profile_detail' : 'hidden_detail'}>
      {/* {loading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <> */}
          {/* {userDetails && (
            <> */}
              {/* <div className='detail_out'>First Name: {userDetails.firstName}</div>
              <hr />
              <div className='detail_out'>Last Name: {userDetails.lastName}</div>
              <hr />
              <div className='detail_out'>Username: {userDetails.username}</div>
              <hr />
              <div className='detail_out'><Link to={`/changePassword/${userDetails?.username}`}>Change Password</Link></div>
              <hr /> */}

              <div className='detail_out'>First Name:</div>
              <hr />
              <div className='detail_out'>Last Name: </div>
              <hr />
              <div className='detail_out'>Username: </div>
              <hr />
              {/* <div className='detail_out'><Link to={`/changePassword/kebe`}>Change Password</Link></div> */}
              <hr />
            {/* </>
          )} */}

          <div className="buttons">

          <Link to={`/Editprofile/kebe`}>
            <Button text={"Edit"} />
            </Link>
            <div  className="logout"><a href="/"><Button text="Log Out" /></a></div>

          </div>
        {/* </> */}
      {/* )}  */}
    </div>
  );
}

export default Profilepopup;
