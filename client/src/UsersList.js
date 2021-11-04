import useFetch from "react-fetch-hook";
import './index.css';

export default function UsersList() {

    const {isLoading, error, data} = useFetch('https://randomuser.me/api/?results=15&inc=gender,email,dob,name,picture,nat');
        if (isLoading){
            return 'loading...'
        }
        if(error){
            return 'error'
        }
    return (
            data.results.map(user => {
                const dateUsers = new Date(user.dob.date).toISOString().split('T')[0];
                return (
                    <div className="wrapper_user">
                        <img src={user.picture.large} alt="picture"/>
                        <p>{user.name.first}{user.name.last}</p>
                        <p>{user.gender}</p>
                        <p>{user.email}</p>
                        <p>{dateUsers}</p>
                    </div>
                )})
    )
}