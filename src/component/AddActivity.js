import {useState} from 'react';
import { useParams } from "react-router-dom";
import {addActivityToRoutine} from './api';

export default function AddActivity() {
    const [count, setCount] = useState();
    const [duration, setDuration] = useState();
    const [activityId, setActivityId] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(params.routineId, {activityId,count,duration, name,description});
        const response = await addActivityToRoutine(params.routineId, {activityId:Number(activityId),count: Number(count),duration:Number(duration), name, description})
        console.log(response);
    }

    return(
         <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="duration">Duration:  
                <input type="text" id="duration" value={count} onChange={(e) => setCount(e.target.value)} placeholder="duration"></input>
            </label>
            <label htmlFor="count">Count: 
                <input type="text" id="count" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="count"></input>
            </label>
            <label htmlFor="activityId">Activity Id: 
                <input type="text" id="activityId" value={activityId} onChange={(e) => setActivityId(e.target.value)} placeholder="activityId"></input>
            </label>
            <label htmlFor="description">Description: 
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description"></input>
            </label>
            <label htmlFor="name">Name: 
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"></input>
            </label>
            <input type="submit"></input>
        </form>
    
    </div>)
}