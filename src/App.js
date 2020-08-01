import "./App.scss";
import React, { useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import BlueSpheres from "./Components/BlueSpheres";
import WhiteSpheres from "./Components/WhiteSpheres";
import Environment from "./Components/Environment";
import Lights from "./Components/Lights";
import Animations from "./Components/Animations/Animations";

import {
  Button,
  Navbar,
  Nav,
  Jumbotron,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MiniAxe from "./Assets/images/DestinyAxeSmall.png";
import { SocialIcon } from "react-social-icons";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import BottomForeground from "./Components/BottomForeground";

const App = (props) => {
  const [showForeground, setShowForeground] = useState(false);

  const [redirectTo, setRedirectTo] = useState("/");

  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/enter" />
          <Route path={"/enter"}>
            <CanvasAndAnimations />
          </Route>

          <Route exact path={"/home"}>
            <div className="customContainer  ">
              <Container className="mw-100 h-100 p-0 m-0">
                <Row className="sm-h-25">
                  <Col>
                    <NavSection />
                  </Col>
                </Row>
                <Row className="sm-h-50">
                  <Col sm="12" lg={{ span: 6, offset: 3 }}>
                    <HeroSection className="lg-m-5 sm-m-2 " />
                  </Col>
                </Row>
                <Row className="align-content-end">
                  <Col>
                    <BottomForeground />
                  </Col>
                </Row>
              </Container>
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
    <Jumbotron className="m-5 bg-dark jumboTron">
      <h1>Portfolio</h1>
      <br />
      <h5>
        Thanks for popping by. Contact me if you want to make cool and/or useful
        stuff. I'm a big fan of VueJS, SASS, JS, TypeScript and React. This
        portfolio was built with React, React-Three-Fiber & React-Bootstrap.
      </h5>
      <h5 className="text-right mr-5">-Shawn</h5>
      <br />
      <Button
        href="mailto:shawn.mountenay@gmail.com"
        className=" btn-success text-dark font-weight-bold"
        style={{ backgroundColor: "#39ff14" }}
      >
        CONTACT ME
      </Button>
    </Jumbotron>
  );
};

const NavSection = () => {
  return (
    <Navbar expand="lg" className=" navGradient sticky-top w-100">
      <Navbar.Brand href="/home">
        <img
          src={MiniAxe}
          className=" pt-2 pb-2 d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>

      <Nav className="mr-auto h2 font-weight-bold">
        <Nav.Link className="navName" href="home">
          Shawn Mountenay
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto ">
        <SocialIcon
          className="mr-2 mt-1"
          url="https://www.linkedin.com/in/shawn-m-045995150"
          fgColor="white"
          bgColor="black"
        />

        <SocialIcon
          network="email"
          url="mailto:shawn.mountenay@gmail.com"
          bgColor="black"
          fgColor="white"
          className="mr-2 mt-1"
        />
      </Nav>
    </Navbar>
  );
};

const CanvasAndAnimations = () => {
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
