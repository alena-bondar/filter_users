import useFetch from "react-fetch-hook";
import './index.css';
import {useLocation} from "react-router-dom";
import React from "react";

const API_URL = 'https://randomuser.me/api';
const USERS_URL = API_URL + '?results=15&?inc=gender,email,dob,name,picture,nat,id';

export default function UsersList() {
    const location = useLocation();
    let query = new URLSearchParams(location.search);

    let filterUrl = USERS_URL;

    if (query.get('nationality') && query.get('nationality') !== 'All') {
        filterUrl = filterUrl + '&nat=' + query.get('nationality');
    }
    if (query.get('gender')) {
        filterUrl = filterUrl + '&gender=' + query.get('gender');
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
                    <img src={user.picture.large} alt="picture"/>
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