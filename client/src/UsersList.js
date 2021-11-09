import axios from "axios";
import "./index.css";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
const API_URL = "https://randomuser.me/api";
const USERS_URL =
    API_URL + "?results=15&?inc=gender,email,dob,name,picture,nat,id";
let filterUrl = '';

export default function UsersList() {

    const [allUsers, setAllUsers] = useState([]);

    const location = useLocation();
    let query = new URLSearchParams(location.search);

    let newFilterUrl = USERS_URL;

    if (query.get("nationality") && query.get("nationality") !== "All") {
        newFilterUrl = newFilterUrl + "&nat=" + query.get("nationality");
    }
    if (query.get("gender")) {
        newFilterUrl = newFilterUrl + "&gender=" + query.get("gender");
    }

    const getRes = (filterUrl) => {
        axios.get(filterUrl)
            .then((response) => {
                debugger;
                const users = response.data.results;
                setAllUsers(users)
            })
            .catch((error) => console.log(`Error: ${error}`))
    }

    useEffect(() => {
        if (newFilterUrl !== filterUrl) {
            filterUrl = newFilterUrl;
            getRes(newFilterUrl);
        }
    });

    return allUsers.map((user) => {
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
