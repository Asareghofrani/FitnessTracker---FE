import React, { useState } from "react";
import { createActivity } from "./api";

const ActivitiesForm = ({ fetchActivities}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

return (
    <form id={"newActivitesForm"} onSubmit={async (event) =>{
        event.preventDefault()
        await createActivity(name, description)
        await fetchActivities();
    }}>New Activity:

        <label>Name</label>
        <input 
            type={"text"} 
            value={name}
            onChange={(event) => {
            setName(event.target.value)
                }}
        />
        <label>Description</label>
        <input 
            type={"text"} 
            value={description}
            onChange={(event) => {
            setDescription(event.target.value)
                }}
        />
        <button>Submit</button>
    </form>
    )
}
export default ActivitiesForm;