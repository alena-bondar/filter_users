const Users = (props) => {

return props.allUsers.map((user) => {
        const dateUsers = new Date(user.dob.date).toISOString().split("T")[0];
        return (
            <div className="wrapper_user" key={user.email}>
                <img src={user.picture.large} alt="picture"/>
                <p className="name">
                    {user.name.first} {user.name.last}
                </p>
                <p>{user.gender}</p>
                <p>{user.email}</p>
                <p>{dateUsers}</p>
                <p>{user.nat}</p>
            </div>
        );
    });
}

export default Users