import {nationalities, gender} from './data/data.js'
import React  from "react";
import {useLocation, useHistory} from "react-router-dom";

export default function FilterUsers() {
    let history = useHistory();
    const location = useLocation();
    let query = new URLSearchParams(location.search);

    function applyFilters(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form)

        const params = new URLSearchParams({
            gender: formData.get('gender'),
            nationality: formData.getAll('nationality')
        });
        history.push(location.pathname + "?" + params.toString());
    }

    let nationalityDefaultValues = query.get('nationality') ? query.get('nationality').split(','): [];
    return (
        <form onSubmit={applyFilters}>
            <select name="gender" className="filterGender" defaultValue={query.get('gender')}>
                {gender.map(item => {
                    return <option value={item} key={item}>{item}</option>
                })}
            </select>
            <select name="nationality" className="filterNationality" size="4" multiple defaultValue={nationalityDefaultValues}>
                <option value="All">All</option>
                {nationalities .map(item => {
                    return <option value={item} key={item}>{item}</option>
                })}
            </select>
            <button type="submit" className="applyFilters">Apply filters</button>
        </form>
    )
}
