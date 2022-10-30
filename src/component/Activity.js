function Activity({activityId ,description, duration, count, name, routineId})  {
    return (
        <div id="cardStyle" style={cardStyle} key={activityId}>
        <div>Activity name: {name}</div>
        <div>Activity description: {description}</div>
        <div>Activity count: {count}</div>
        <div>Activity duration: {duration}</div>
        {loggedInUsername === creatorName && <button> Add Activity</button>}
        {loggedInUsername === creatorName && <button> Update Activity</button>}
        {loggedInUsername === creatorName && <button> Remove Activity</button>}
    </div>
    )
}