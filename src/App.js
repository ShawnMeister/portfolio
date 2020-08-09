import "./App.scss";
import React, { useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import BlueSpheres from "./Components/BlueSpheres";
import WhiteSpheres from "./Components/WhiteSpheres";
import Environment from "./Components/Environment";
import Lights from "./Components/Lights";
import Animations from "./Components/Animations/Animations";
import { Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialIcon } from "react-social-icons";
import { isMobile } from "react-device-detect";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import BottomForeground from "./Components/BottomForeground";
import miniAxe from "./Assets/images/DestinyAxeSmall.png";
import digitalStatic from "./Assets/videos/digital-static.mp4";
import jumboBg from "./Assets/images/jumbo-bg.jpg";

const App = (props) => {
  const [showForeground, setShowForeground] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [redirectTo, setRedirectTo] = useState("/");

  const myCallback = (dataFromChild) => {
    setShowForeground(dataFromChild);
    setRedirectTo("/home");
    console.log("you really working???");
  };

  return (
    <Router>
      <div className="App">
        {showForeground ? <Redirect to={redirectTo} /> : null}
        <Switch>
          {isMobile ? (
            <Redirect exact from="/" to="/home" />
          ) : (
            <Redirect exact from="/" to="/enter" />
          )}

          <Route path={"/enter"}>
            <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
              <WhiteSpheres />
              <BlueSpheres />
              <Lights />
              <Environment />

              <Suspense fallback={null}>
                <Animations
                  isDisplayed={isDisplayed}
                  callbackFromParent={myCallback}
                  showForeground={showForeground}
                />
              </Suspense>
            </Canvas>
            <div className="skipIntro">
              <Button className="opacity-3" variant="dark">
                <Link
                  className="text-secondary text-decoration-none"
                  to="/home"
                >
                  Skip Interactive Animations
                </Link>
              </Button>
            </div>
          </Route>
          <Route path={"/home"}>
            <div className="customContainer  ">
              <div className=" h-100  container mr-0 ml-0 mw-100 pr-0 pl-0">
                <div className="row">
                  <div className="col">
                    <NavSection />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="">
                    <HeroSection className="" />
                  </div>
                </div>

                <div className="row ">
                  <div className="col">
                    <BottomForeground />
                  </div>
                </div>
              </div>
            </div>
            <SpaceBackground />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;

const SpaceBackground = () => {
  return (
    <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
      <WhiteSpheres />
      <BlueSpheres />
      <Lights />
      <Environment />
    </Canvas>
  );
};

const HeroSection = () => {
  return (
    <div>
      <div className="m-4  jumboTron ">
        <h1 className="jumbo-header">Welcome</h1>
        <br />
        <h5 className="jumbo-content">
          This site was mainly built with React
          <br />
          and React Three Fiber.
          <br /> <br />
          Let's make an impact! <br /> <br />
          👨🏿‍💻👨‍💻👩‍💻
        </h5>

        <br />
        <div className="btn-wrapper">
          <a href="mailto:shawn.mountenay@gmail.com" className="cta-btn">
            CONTACT ME HERE
          </a>
        </div>

        {/* <video autoPlay={true} muted={true} loop={false}>
          <source src={digitalStatic} type="video/mp4" />
        </video> */}
      </div>
    </div>
  );
};

const NavSection = () => {
  return (
    <Navbar expand="lg" className="  sticky-top w-100">
      <Navbar.Brand href="/home">
        <img
          src={miniAxe}
          className=" pt-2 pb-2 d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>

      <Nav className="mr-auto h2 font-weight-bold">
        <Nav.Link className="navName" href="home">
          Shawn Mountenay
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto row">
        <SocialIcon
          className="mr-2 mt-1 col"
          url="https://www.linkedin.com/in/shawn-m-045995150"
          fgColor="white"
          bgColor="black"
          target="_blank"
        />
        <SocialIcon
          network="email"
          url="mailto:shawn.mountenay@gmail.com"
          bgColor="black"
          fgColor="white"
          className="mr-2 mt-1 col"
          target="_blank"
        />
        <SocialIcon
          network="github"
          url="https://github.com/ShawnMeister"
          bgColor="black"
          fgColor="white"
          className="mr-4 mt-1 col"
          target="_blank"
        />
      </Nav>
    </Navbar>
  );
};

const CanvasAndAnimations = (props) => {
  const [redirectTo, setRedirectTo] = useState("/");
  const [showForeground, setShowForeground] = useState(false);

  const myCallback = (dataFromChild) => {
    setShowForeground(dataFromChild);
    setRedirectTo("/home");
  };

  return (
    <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
      <WhiteSpheres />
      <BlueSpheres />
      <Lights />
      <Environment />

      <Suspense fallback={null}>
        <Animations
          callbackFromParent={myCallback}
          showForeground={showForeground}
        />
      </Suspense>
    </Canvas>
  );
};
