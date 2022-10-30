import React, { useState } from "react";
import { createNewRoutine } from "./api";

const RoutinesForm = () => {
    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

return (
    <form id={"newRoutineForm"} onSubmit={(event) =>{
        event.preventDefault()
        createNewRoutine(id, creatorId, isPublic, name, goal)
    }}>
      
        <label>Id</label>
        <input 
            type={"text"} 
            value={id}
            onChange={(event) => {
            setName(event.target.value)
                }}
        />

        <label>CreatorId</label>
        <input 
            type={"text"} 
            value={creatorId}
            onChange={(event) => {
            setGoal(event.target.value)
                }}
        />

        <label>IsPublic</label>
        <input 
            type={boolean} 
            value={isPublic}
            onChange={(event) => {
            setIsPublic(event.target.value)
                }}
        />

        <label>Name</label>
        <input 
            type={"text"} 
            value={name}
            onChange={(event) => {
            setName(event.target.value)
                }}
        />

        <label>Goal</label>
        <input 
            type={"text"} 
            value={goal}
            onChange={(event) => {
            setGoal(event.target.value)
                }}
        />
        <button>Submit</button>
    </form>
    )
}
export default RoutinesForm;