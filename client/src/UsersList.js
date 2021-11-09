import axios from "axios";
import "./index.css";
import React, {useEffect, useState} from "react";
import Users from "./Users"
import GetParams from "./services/GetParams"
const API_URL = "https://randomuser.me/api";
const USERS_URL =
    API_URL + "?results=15&?inc=gender,email,dob,name,picture,nat,id";
let filterUrl = '';

export default function UsersList() {

    const [allUsers, setAllUsers] = useState([]);

    let query = GetParams();

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

    return (
        <>
        <Users allUsers={allUsers}/>
        <GetParams />
        </>
    )
}

