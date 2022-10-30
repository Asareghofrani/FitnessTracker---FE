 import React, { useEffect, useState } from "react";
import {getAllActivities} from "./api";
 import ActivitiesForm from './ActivitiesForm';


const cardStyle = {
    backgroundColor: '#4c6d72',
    color: 'white',
    padding: '20px',
    margin: '20px',
    borderRadius: "5%"
}

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const token = localStorage.getItem("token");
    async function fetchActivities() {
        const activities = await getAllActivities();
        setActivities(activities)
        return activities;
    }

    useEffect( () => {
          fetchActivities();
    }, []);

    return (
        <>
        <div id="forms">
            {token ? <ActivitiesForm   fetchActivities={fetchActivities}/> : <p>Please Log In to Create a New Activity</p>}
        </div>
        <div>
            {activities.map( activity => {
                return(

                    <div id="cardStyle" style={cardStyle} key={activity.id}>
                        <p>Name:{activity.name}</p>
                        <p>Description:{activity.description}</p>
                    </div>
                );
            })}
        </div>
        </>
    );
};
    export default Activities;
