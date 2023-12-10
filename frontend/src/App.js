import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer.jsx";

function App() {
  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid sans","chilanka"]
      }
    })
  },[]);
  return (
    <>
      <Router>
        <Header />
        <Footer />
      </Router>
    </>
  );
}

export default App;
