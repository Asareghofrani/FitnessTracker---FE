import React, { useEffect, useState } from "react";
import { login, register } from "./api"

const Home = (props) => {
    const {isLoggedIn, setIsLoggedIn, setLoggedInUsername} = props
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault()
        const waitRegister = await register(username, password);
      }
    const handleLogin = async (event) => {
          event.preventDefault()
       const waitLogin = await login(loginUsername, loginPassword);
       if(waitLogin.user.username != undefined) {
        setIsLoggedIn(true);
        setLoggedInUsername(waitLogin.user.username);
        localStorage.setItem("loggedInUsername", waitLogin.user.username)
       }
      }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("curUser")
        console.log("user logged out")
        setIsLoggedIn(false)
    }
      
      useEffect(() => {
          const getToken = localStorage.getItem("token" ) ? true : false
          console.log("is user logged in:", getToken)
        setIsLoggedIn(getToken)
      }, []);

return (
    <>
    <form id={"loginButtons"}onSubmit={handleLogin} style={{display: "flex", flexDirection: "column", rowGap: "16px" } }>

        <label>Username:</label>
        <input type={"text"} 
            value={loginUsername} 
            onChange={(event) => {
            setLoginUsername(event.target.value)
            }} 
            placeholder={"Enter username"}/>

        <label>Password:</label>          
        <input 
            type={"text"} 
            value={loginPassword} 
            onChange={(event) => {
            setLoginPassword(event.target.value)
                }}
            placeholder={"Enter password"}/>

        <button>Login</button>
    </form>
    <form id={"loginButtons"}onSubmit={handleRegister} style={{display: "flex", flexDirection: "column", rowGap: "16px", marginTop: "16px"}}>
        
        <label>Username:</label>
        <input type={"text"} 
            value={username} 
            onChange={(event) => {
            setUsername(event.target.value)
                }} 
            placeholder={"Enter username"}/>
        <label>Password:</label>          
        <input 
        type={"text"} 
        min={8} 
        value={password} 
        onChange={(event) => {
            setPassword(event.target.value)
        }}
        placeholder={"Enter password"}/>

        <button>Register</button>
    </form>

     <button style={{borderRadius: "50%", marginTop: "20px", backgroundColor: "blue", color: "white", padding: "8px" }} onClick={(event) => {
            event.preventDefault()
            logout();
        }}>Logout</button>

       
    </>
    )
}
export default Home;