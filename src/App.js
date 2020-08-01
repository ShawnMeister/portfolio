import "./App.scss";
import React, { useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import BlueSpheres from "./Components/BlueSpheres";
import WhiteSpheres from "./Components/WhiteSpheres";
import Environment from "./Components/Environment";
import Lights from "./Components/Lights";
import Animations from "./Components/Animations/Animations";
import { isMobile } from "react-device-detect";
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
  Link,
  Redirect,
} from "react-router-dom";
import BottomForeground from "./Components/BottomForeground";

const App = (props) => {
  const renderContent = () => {
    if (isMobile) {
      return false;
    } else {
      return true;
    }
  };

  const [showForeground, setShowForeground] = useState(false);

  const [isDisplayed, setIsDisplayed] = useState(true);

  const [redirectTo, setRedirectTo] = useState("/");
  const toggleShowHide = () => {
    setIsDisplayed(false);
    setShowForeground(true);
    setRedirectTo("/home");
  };
  const myCallback = (dataFromChild) => {
    setShowForeground(dataFromChild);
    setRedirectTo("/home");
  };

  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {renderContent}
        <Switch>
          <Route path={["/", "/home"]}>
            <Redirect to={redirectTo}></Redirect>
            {/*<div>*/}
            {/*  <Button onClick={toggleShowHide} />*/}
            {/*</div>*/}

            {/* <Button
              className="fixed-top mt-2 ml-5"
              variant="primary"
              onClick={toggleShowHide}
            >
              TEST
            </Button> */}
            {showForeground ? <BottomForeground /> : null}
            {showForeground ? (
              <Navbar fluid expand="lg" className=" fixed-top navGradient">
                <Navbar.Brand href="home">
                  <img
                    src={MiniAxe}
                    className=" pt-2 pb-2 d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Nav className="mr-auto h2 font-weight-bold">
                  <Nav.Link
                    className=" text-warning fancyFont navName"
                    href="home"
                  >
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
            ) : null}
            {showForeground ? (
              <Row>
                <Col>
                  <Jumbotron className="bg-dark jumboTron">
                    <h1>Portfolio</h1>
                    <br />
                    <h5>
                      Thanks for popping by. Contact me if you want to make cool
                      and/or useful stuff. I'm a big fan of VueJS, SASS, JS,
                      TypeScript and React. This portfolio was built with React,
                      React-Three-Fiber, React-Bootstrap, and Love.
                    </h5>
                    <h5 className="text-right mr-5">-Shawn</h5>
                    <br />
                    <Button
                      href="mailto:shawn.mountenay@gmail.com"
                      className=" btn-success text-dark font-weight-bold"
                      style={{ backgroundColor: "#39ff14" }}
                    >
                      PRESS ME
                    </Button>
                  </Jumbotron>
                </Col>
              </Row>
            ) : null}

            {renderContent() ? null : (
              <Row>
                <Col>
                  <Jumbotron className="bg-dark jumboTron">
                    <h1>Portfolio</h1>
                    <br />
                    <h4>
                      Thanks for popping by. Contact me if you want to make cool
                      and/or useful stuff. This portfolio was built with React,
                      React-Three-Fiber, React-Bootstrap and Love.
                    </h4>
                    <h5 className="text-right mr-5">-Shawn</h5>
                    <br />
                    <Button
                      href="mailto:shawn.mountenay@gmail.com"
                      className=" btn-success text-dark font-weight-bold"
                      style={{ backgroundColor: "#39ff14" }}
                    >
                      PRESS ME
                    </Button>
                  </Jumbotron>
                </Col>
              </Row>
            )}
            {renderContent()
              ? null
              : [
                  <BottomForeground />,
                  <Navbar fluid expand="lg" className=" fixed-top navGradient">
                    <Navbar.Brand href="home">
                      <img
                        src={MiniAxe}
                        className=" pt-2 pb-2 d-inline-block align-top"
                        alt="React Bootstrap logo"
                      />
                    </Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Nav className="mr-auto h2 font-weight-bold">
                      <Nav.Link
                        className="text-warning fancyFont navName"
                        href="home"
                      >
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
                  </Navbar>,
                ]}

            <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
              <WhiteSpheres />
              <BlueSpheres />
              <Lights />
              <Environment />

              {renderContent() ? (
                <Suspense fallback={null}>
                  <Animations
                    callbackFromParent={myCallback}
                    isDisplayed={isDisplayed}
                    showForeground={showForeground}
                  />
                </Suspense>
              ) : null}
            </Canvas>

            {/* <Button onClick={toggleShowHide} /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;

function Home() {
  return (<h2>Home</h2>), (<p>biatch</p>);
}

function Users() {
  return <h2>Users</h2>;
}

const ConsoleLog = ({ children, redirectTo }) => {
  console.log("foreGround is " + children);
  return null;
};
// const Button = ({ onClick }) => (
//   <div class="button">
//     <style jsx="">
//       {`
//         .button {
//           position: fixed;
//           bottom: 250px;
//           left: 100px;
//         }
//       `}
//     </style>

//     <button onClick={onClick} type="button">
//       {/* <Link to="/home">Toggle Show/Hide</Link> */}
//       Show
//     </button>
//   </div>
// );
