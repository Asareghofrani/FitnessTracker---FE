import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Routines from "./component/Routines"
import Activities from "./component/Activities"
import ActivitiesForm from "./component/ActivitiesForm";
import RoutinesForm from "./component/RoutinesForm";
import Home from "./component/Home"
import UserProfile from "./component/UserProfile"
import MyRoutines from "./component/MyRoutines";
import AddActivity from './component/AddActivity';

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedInUsername,setLoggedInUsername] = useState("");
    useEffect(() => {
      const validToken = localStorage.getItem("token")
      if(validToken) setIsLoggedIn(true)
    }, []);


    return (
        <BrowserRouter>
            <>
                <h1>Welcome to Fitness Tracker!!</h1>
                <div id="navbar" style={{display: "flex", columnGap: "16px", textDecoration: "none"}}>
                    <Link to="/Home">Home</Link>
                    <Link to="/Activities">Activities</Link>
                    <Link to="/Routines">Routines</Link>
                    <Link to="/UserProfile">My Profile </Link>
                </div>
                <Routes>
                <Route path="/Routines/:routineId" element={isLoggedIn ? <AddActivity/>: <p>Please Log In to See Your Profile</p>} />
                <Route path="/UserProfile" element={isLoggedIn ? <UserProfile/>: <p>Please Log In to See Your Profile</p>} />
                <Route path="/Activities" element={<Activities/>} />
                <Route path="/Routines" element={<Routines loggedInUsername={loggedInUsername} />} />
                <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} setLoggedInUsername={setLoggedInUsername} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/ActivitiesForm" element={isLoggedIn ? <ActivitiesForm/> : <p>Please Log In to Create a New Activity</p>} />
                <Route path="/RoutinesForm" element={isLoggedIn ? <RoutinesForm/> : <p>Please Log In to Create a New Routine</p>} />

                </Routes>
            </>
        </BrowserRouter>
    )
}

export default App;