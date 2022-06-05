import React, {useContext, useState} from "react";
import './landingPagestyle.css';
import {Link} from 'react-router-dom';
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import AuthContext from "../context/AuthContext";
import Loader from "../loader/loader";

export default function LandingPage(){
  const { loggedIn } = useContext(AuthContext);

  const redirectPage = ()=>{
    if(loggedIn === null){
      window.location = '/login'
    }else if(loggedIn.role === 'student'){
      window.location = '/student/home'
    }else if(loggedIn.role === 'admin'){
      window.location = '/admin/home'
    }else if(loggedIn.role === 'supervisor'){
      window.location = '/supervisor/home'
    }else if(loggedIn.role === 'Co-supervisor'){
      window.location = '/cosupervisor/home'
    }else if(loggedIn.role === 'Panel-Member'){
      window.location = '/panelmember/home'
    }else if(loggedIn.role === 'staff'){
      window.location = '/student/staffwaiting'
    }else {
      window.location = '/'
    }


  }

    return (
        <>
          <div>
          </div>
          <div>
            <head>
              <meta charSet="UTF-8"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Landing Page</title>
            </head>
            <body>
            <main>
              <Header/>
              <img src="https://i.postimg.cc/BbrzhpXf/services-left-dec.png" alt="" className="shape"/>
              <div className="showcase-area">
                <div className="container">
                  <div className="left">
                    <div className="big-title">
                      <h1>Welcome To SLIIT</h1>
                      <h1>Start Research Project Now.</h1>
                    </div>
                    <p className="text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus eius distinctio odit, magni magnam qui ex perferendis
                      vitae!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus eius distinctio odit, magni magnam qui ex perferendis
                      vitae!
                    </p>
                    <div className="cta">

                      <Link>
                        <li onClick={redirectPage} className="btn2">Get started</li>
                      </Link>

                    </div>
                  </div>

                  <div className="right">
                    <img src="https://i.postimg.cc/3xFysm8k/mobile-app.gif"/>
                  </div>
                  <row></row>
                </div>
              </div>
            </main>
            <Footer/>
            <script src="https://kit.fontawesome.com/a81368914c.js"></script>
            <script src="./app.js"></script>
            </body>
          </div>

  </>
    )
}