import UsersList from './UsersList';
import FilterUsers from './FilterUsers';

import './index.css';
import {useState} from "react";

export default function App() {
    const [filter, setFilter] = useState({});

    return (
        <div>
            <div className="filterUsers">
                <FilterUsers setFilter={setFilter} />
            </div>
            <div className="usersList">
                <UsersList filter={filter} />
            </div>
        </div>
    )
}

