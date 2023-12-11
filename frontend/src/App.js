import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router ,Route} from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx"

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
          <Route exact path="/" Component={Home} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
