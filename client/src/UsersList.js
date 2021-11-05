import useFetch from "react-fetch-hook";
import './index.css';

const API_URL = 'https://randomuser.me/api';
const USERS_URL = API_URL + '?results=15&?inc=gender,email,dob,name,picture,nat,id';

export default function UsersList(props) {
    let filterData = props.filter;
    let filterUrl = USERS_URL;

    if (filterData.nationality && filterData.nationality.length && filterData.nationality !== 'All') {
        filterUrl = filterUrl + '&nat=' + filterData.nationality.join(',');
    }
    if (filterData.gender) {
        filterUrl = filterUrl + '&gender=' + filterData.gender;
    }
    const {isLoading, error, data} = useFetch(filterUrl);
    if (isLoading) {
        return 'loading...'
    }
    if (error) {
        return 'error'
    }

    return (
        data.results.map(user => {
            const dateUsers = new Date(user.dob.date).toISOString().split('T')[0];
            return (
                <div className="wrapper_user" key={user.email}>
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