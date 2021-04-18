/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.scss'
import React, { useState, Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import BlueSpheres from './Components/BlueSpheres'
import WhiteSpheres from './Components/WhiteSpheres'
import Environment from './Components/Environment'
import Lights from './Components/Lights'
import Animations from './Components/Animations/Animations'
import { Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocialIcon } from 'react-social-icons'
import { isMobile } from 'react-device-detect'
// import { forceResize } from "react-three-fiber";

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import BottomForeground from './Components/BottomForeground'
import miniAxe from './Assets/images/DestinyAxeSmall.png'
// import digitalStatic from "./Assets/videos/digital-static.mp4";
// import jumboBg from "./Assets/images/jumbo-bg.jpg";

const App = (props) => {
    const [showForeground, setShowForeground] = useState(false)
    const [isDisplayed, setIsDisplayed] = useState(false)
    const [redirectTo, setRedirectTo] = useState('/')

    const myCallback = (dataFromChild) => {
        setShowForeground(dataFromChild)
        setRedirectTo('/home')
    }

    const instructionsDone = (dataFromChild) => {
        setIsDisplayed(dataFromChild)
    }

    const suspense = { id: 0 }
    const animations = { id: 1 }

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

                    <Route path={'/enter'}>
                        <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
                            <WhiteSpheres />
                            <BlueSpheres />
                            <Lights />
                            <Environment />

                            {isDisplayed ? (
                                <Suspense fallback={null} key={suspense.id}>
                                    <Animations
                                        key={animations.id}
                                        callbackFromParent={myCallback}
                                        showForeground={showForeground}
                                    />
                                </Suspense>
                            ) : null}
                        </Canvas>
                        {isDisplayed ? null : (
                            <div className="customContainer  ">
                                <div className="row justify-content-center h-100 align-content-center ">
                                    <div className=" ">
                                        <div className="">
                                            <Instructions
                                                instructionsDoneCallback={instructionsDone}
                                                isDisplayed={isDisplayed}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="skipIntro">
                            <Button className="opacity-3" variant="dark">
                                <Link className="text-secondary text-decoration-none" to="/home">
                                    Skip Interactive Animations
                                </Link>
                            </Button>
                        </div>
                    </Route>
                    <Route path={'/home'}>
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
    )
}
export default App

const SpaceBackground = () => {
    return (
        <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
            <WhiteSpheres />
            <BlueSpheres />
            <Lights />
            <Environment />
        </Canvas>
    )
}

const HeroSection = () => {
    return (
        <div>
            <div className=" jumboTron ">
                <h2 className="jumbo-header">Welcome</h2>
                <br />
                <h6 className="jumbo-content">
                    This site was built with React, <br />
                    React Three Fiber, and more.
                    <br /> <br />
                    Let&apos;s make an impact! <br /> <br />
                    👨🏿‍💻👨‍💻👩‍💻
                </h6>

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
    )
}

const Instructions = ({ instructionsDoneCallback, isDisplayed }) => {
    const sayHello = (dataFromChild) => {
        isDisplayed = true
        instructionsDoneCallback(isDisplayed)
    }

    return (
        <div>
            <div className=" jumboTronInstructions ">
                <div className="d-flex flex-column">
                    <h2 className="jumbo-header">How to Smash the Emerald</h2>
                    <br />
                    <h4 className="jumbo-content text-left col mb-3 mx-auto">
                        <ol>
                            <div className="flex row">
                                <li className="mt-2">
                                    Click the Axe until it
                                    <br /> sticks in the Emerald.
                                </li>
                                <img alt="axe" className="ml-3" src={miniAxe} />
                            </div>
                            <br />
                            <div className="flex row">
                                <li>
                                    Click the Axe one more time <br />
                                    and whack the Emerald!🔥🟢🔥
                                </li>
                            </div>
                        </ol>
                    </h4>

                    <div className=" col align-self-center">
                        <button onClick={sayHello.bind()} className="cta-btn ">
                            Got it!
                        </button>
                    </div>
                </div>

                {/* <video autoPlay={true} muted={true} loop={false}>
          <source src={digitalStatic} type="video/mp4" />
        </video> */}
            </div>
        </div>
    )
}

const NavSection = () => {
    return (
        <Navbar expand="lg" className="  sticky-top w-100">
            <div className="row navName ">
                {isMobile ? null : (
                    <Navbar.Brand href="/home">
                        <img
                            src={miniAxe}
                            className="p-0 col pt-2 pb-2 d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                )}

                <Nav className=" p-0 col mr-auto h2 font-weight-bold">
                    <Nav.Link className=" p-0 offWhite" href="home">
                        Shawn Mountenay
                    </Nav.Link>
                </Nav>
            </div>
            <Nav className="ml-auto row">
                <SocialIcon
                    className="mr-2 mt-1 col  ml-4"
                    url="https://www.linkedin.com/in/shawn-m-045995150"
                    fgColor="#ccd9ca"
                    bgColor="none"
                    target="_blank"
                />
                <SocialIcon
                    network="email"
                    url="mailto:shawn.mountenay@gmail.com"
                    bgColor="none"
                    fgColor="#e5ede4"
                    className="mr-2 mt-1 col"
                    target="_blank"
                />
                <SocialIcon
                    network="github"
                    url="https://github.com/shawn-p-m"
                    bgColor="none"
                    fgColor="#ccd9ca"
                    className="mr-4 mt-1 col"
                    target="_blank"
                />
            </Nav>
        </Navbar>
    )
}

const CanvasAndAnimations = (props) => {
    const [redirectTo, setRedirectTo] = useState('/')
    const [showForeground, setShowForeground] = useState(false)

    const myCallback = (dataFromChild) => {
        setShowForeground(dataFromChild)
        setRedirectTo('/home')
    }

    return (
        <Canvas className="canvas" camera={{ position: [0, 0, 4] }}>
            <WhiteSpheres />
            <BlueSpheres />
            <Lights />
            <Environment />

            <Suspense fallback={null}>
                <Animations callbackFromParent={myCallback} showForeground={showForeground} />
            </Suspense>
        </Canvas>
    )
}
