   
import React, { useEffect, useState } from "react";
import { getRoutines, createNewRoutine, deleteRoutine, updateRoutine } from "./api";
import {Link} from 'react-router-dom';
const cardStyle = {
  backgroundColor: '#4c6d72',
  color: '#CCC',
  padding: '20px',
  margin: '20px' ,
  borderRadius: "2%"
}
const Routines = ({loggedInUsername}) => {
    console.log("logged in username",loggedInUsername);
    const [routines, setRoutines] = useState([]);
    const [showEditForm,setShowEditForm] = useState(false);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [editingRoutine, setEditingRoutine] = useState({});
    const [newName, setNewName] = useState("");
    const [newGoal, setNewGoal] = useState("");
    
    const token = localStorage.getItem("token");
    const editRoutineForm = () => {
      return (<form onSubmit={async (e) => {
        e.preventDefault();
        const response = await updateRoutine(localStorage.getItem("token"),newName,newGoal,editingRoutine.isPublic,editingRoutine.activities,editingRoutine.routineId)
        loadRoutines();
      }}>
        <label htmlFor="newName">Enter the new name: 
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} id="newName"></input>
        </label>
        <label htmlFor="newGoal">Enter the new goal:
          <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} id="newGoal"></input>
        </label>
        <input type="submit"/>
      </form>
  )
    }
    


    const loadRoutines = async() => {
        const routines = await getRoutines();
        setRoutines(routines);
    }

    useEffect(() => {
      loadRoutines();
    }, []);


    const handleDelete = async (e) => {
      try {
        const response = await DeleteRoutines(id, localStorage.getItem("token"));
      } catch (e) {
        console.log(e);
      }
      await fetchNewRoutines();
    };

    const handleEdit = async (e) => {
      try {
        const response = await UpdateRoutines(id, localStorage.getItem("token"));
      } catch (e) {
        console.log(e);
      }
      await fetchNewRoutines();
    };




    const renderRoutines = () => {
        return (
          <div
            style={{
              marginTop: 20
            }}
          >
            {routines.map(routine => {
                const { name, id: routineId, creatorName, goal, activities,isPublic } = routine;

                return (
                   <div id="cardStyle" style={cardStyle} key={routineId}>
                     <div>Name: {name}</div>
                     <div>Goal: {goal}</div>
                     <div> Creator name: {creatorName}</div>
                     
                     <div style={{display:"flex", rowGap:"16px"}}>
                     {creatorName === localStorage.getItem("loggedInUsername") && <button onClick={async () =>{
                        await deleteRoutine(localStorage.getItem("token"), routineId);
                        loadRoutines();

                     }  }>Delete Routine</button>}
                     {creatorName === localStorage.getItem("loggedInUsername") && <button><Link to={`/Routines/${routineId}`} style={{textDecoration: "none", color:"black"}}>Add Activity</Link></button>}
                     {creatorName === localStorage.getItem("loggedInUsername") && <button onClick={() => {
                      setEditingRoutine({
                        isPublic,
                        activities,
                        routineId
                      })
                      setShowEditForm(true)
                     }}>Edit Routine</button>}
                     </div>
                     
                      <div>
                        <div>Activities for this routine:</div>
                         {activities.map(activity => {
                            const { id: activityId ,description, duration, count, name, routineId } = activity;
                            return (
                                <div id="cardStyle" style={cardStyle} key={activityId}>
                                    <div>Activity name: {name}</div>
                                    <div>Activity description: {description}</div>
                                    <div>Activity count: {count}</div>
                                    <div>Activity duration: {duration}</div>
                                    {localStorage.getItem("loggedInUsername") === creatorName && <button> Add Activity</button>}
                                    {localStorage.getItem("loggedInUsername") === creatorName && <button> Update Activity</button>}
                                    {localStorage.getItem("loggedInUsername") === creatorName && <button> Remove Activity</button>}
                                </div>
                            )

                         })}
                      </div>
                   </div>
                );
             })}
          </div>
        )
    }

    const createRoutine = async () => {
        try {
            const response = await createNewRoutine(name, goal);
            loadRoutines();
        } catch(err) {
            console.error("error creating: ", err);
        }
    }
    const renderForm = () => {
        return (
          <div>
            <div>Create a new Routine:</div>
            <div>
              Name: 
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              Goal: 
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} />
            </div>
            <button onClick={() => createRoutine()}>Create</button>
          </div>
        )};

    return (
      <>
        <div id="forms">
            {token ? renderForm() : <p>Please Log In to Create a New Routine</p>}
        </div>
        {showEditForm ? editRoutineForm(): null}

        {renderRoutines()}
      </>
    );
};
export default Routines;