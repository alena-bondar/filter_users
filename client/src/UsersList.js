import useFetch from "react-fetch-hook";
import './index.css';

export default function UsersList(props) {

    const {isLoading, error, data} = useFetch('https://randomuser.me/api/?results=15&inc=gender,email,dob,name,picture,nat');
    if (isLoading) {
        return 'loading...'
    }
    if (error) {
        return 'error'
    }
    return (
        data.results.filter(user => {
            let filterData = props.filter;
            let success = true;
            if (filterData.gender) {
                success = filterData.gender === user.gender;
            }
            if (success && filterData.nationality) {
                success = filterData.nationality.includes(user.nat) || filterData.nationality.includes('All');
            }
            return success;
        }).map(user => {
            const dateUsers = new Date(user.dob.date).toISOString().split('T')[0];
            return (
                <div className="wrapper_user">
                    <img src={user.picture.large}/>
                    <p className="name">{user.name.first} {user.name.last}</p>
                    <p>{user.gender}</p>
                    <p>{user.email}</p>
                    <p>{dateUsers}</p>
                    <p>{user.nat}</p>
                </div>
            )
        })
    )
}