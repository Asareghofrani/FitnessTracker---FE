const url = 'https://fitnesstrac-kr.herokuapp.com/api'

// REGISTER 
export const register = async (username, password) => { 
    try{ 
      const response  = await fetch(`${url}/users/register`, {
        method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       username: username,
       password: password
     }
   )})
   const data = await response.json()
   localStorage.setItem("token", data.token)
   localStorage.setItem("curUser", username);
   if(response.ok) {
      alert("you have registerd successfully");
          }else{
     alert("Password Too Short! or already registered");
     }
 } catch (error){
     console.error(error)
     }
 } 
//  LOGIN
export const login = async (username, password) => {  
  try{ const response  = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     username: username,
     password: password
 })})
 const data = await response.json()
 console.log(data)
 localStorage.setItem("token", data.token);
 if(response.ok) {
  alert("you have logged in successfully");
   } else{
   alert ("Username or password is incorrect")
  };
 return data
} catch (error){
   console.error(error)
   }
} 
// GET USER 
export const getUser = async () => {
  try { 
   const response = await fetch(`${url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    })
    const data =  await response.json()
    return data;
  
  } catch (error) {
    console.error(error)
  }
}
// GET ALL ACTIVITIES
export const getAllActivities = async () => {
  try{
    const response = await fetch(`${url}/activities`, {
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const allActivities = await response.json()
    return allActivities
  }catch(error){
    console.error(error) 
  }
}
// GET ALL ROUTINES 
export const getRoutines = async () => {
  try {
    const response = await fetch(`${url}/routines`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const routines = await response.json();
    return routines;
    
  }catch(error){
    
  }
}

// CREATE NEW ACTIVITY 
export const createActivity = async (name, description) => {
  try{
    
    const response = await fetch(`${url}/activities`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: name,
        description: description
      }),
    })
    const newActivity = await response.json()
    if(!response.ok) {
      alert(`An activity with name ${name} already exists`);
      throw new Error(`Activity with name ${name} already exists`);
    } else {
      alert("The activity has been created successfully");
    }
    return newActivity
  }catch(error){

    return error;
  }
}

// CREATE NEW ROUTINE 
export const createNewRoutine = async (rName, rGoal) => {
    const bodyData = {
      name: rName,
      goal: rGoal,
      isPublic: true
    }
    try{
      const response = await fetch(`${url}/routines`, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    const newRoutine = await response.json() 
    return newRoutine 
    }catch(error){ 
      console.error(error) 
    }
}
// UPDATE ROUTINES
export const updateRoutine = async (token, name, goal, isPublic, activities, routineId ) => {
  try {
    const response = await fetch(`${url}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
        activities: activities
      })
    })
    const results = await response.json();
    console.log('testing updateRoutine', results)
    return results
  } catch (error) {
    console.error(error)
  }
}


//DELETE ROUTINES
export const deleteRoutine = async (token, routineId) => {
  try {
    const response = await fetch(`${url}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const results = response.json();
    return results
  } catch (e) {
    console.error(e)
  }
}


// UPDATE ACTIVITY OF ROUTINES
// export const UpdateRoutineActivity = async (count, duration) => {
//   const bodyData = {
//     count: count ,
//     duration: duration
//   }
//   try{
//     const response = await fetch(`${url}/routines/${RoutineId}/activity`, {
//       method: 'PATCH',
//       body: JSON.stringify(bodyData),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem("token")
//       }
//     })
//   const UpdatedRoutineActivity = await response.json() 
//   return UpdatedRoutineActivity 
//   }catch(error){ 
//     console.error(error) 
//   }
// }
// DELETE ACTIVIES OF ROUTINES
// export const DeleteRoutineActivity = async (rName, rGoal) => {
//     try{
//     const response = await fetch(`${url}/routines`, {
//       method: 'DELETE',
//       body: JSON.stringify(bodyData),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem("token")
//       }
//     })
//   const DeletedRoutineActivity = await response.json() 
//   return DeletedRoutineActivity
//   }catch(error){ 
//     console.error(error) 
//   }
// }

// ADD ACTIVITIES TO ROUTINES
export const addActivityToRoutine = async (routineId, {activityId, count, duration, name, description}) => {
  try {
    console.log("count", count);
    const response = await fetch(`${url}/routines/${activityId}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
        activityId: Number(activityId),
        count: Number(count), 
        duration: Number(duration),
      })
    })
    const results = response.json();
    return results
  } catch (error) {
    console.error(error)
    console.log('Error adding activitiy to routine')
  }
}
