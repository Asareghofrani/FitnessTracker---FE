import React, { useEffect, useState } from "react";
import {getUser} from "./api"
import MyRoutines from "./MyRoutines"


const UserProfile = () => {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");

    useEffect(async () => {
        const profile = await getUser(user);
        console.log("current user profile:", profile)
        setUser(profile);
    }, []);
    return (
        
        <div>
            {token ? MyRoutines() : 'Please Log In to See Your Profile'}
        </div>
        
    )
}

export default UserProfile;