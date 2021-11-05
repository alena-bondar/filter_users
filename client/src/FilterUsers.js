import {nationalities, gender} from './data/data.js'

export default function FilterUsers(props) {

    function applyFilters(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form)
        let filterData = {
            gender: formData.get('gender'),
            nationality: formData.getAll('nationality'),
        }

        props.setFilter(filterData);
    }

    return (
        <form onSubmit={applyFilters}>
            <select name="gender" className="filterGender">
                {gender.map(item => {
                    return <option value={item} key={item}>{item}</option>
                })}
            </select>
            <select name="nationality" className="filterNationality" size="4" multiple>
                <option value="All">All</option>
                {nationalities .map(item => {
                    return <option value={item} key={item}>{item}</option>
                })}
            </select>
            <button type="submit" className="applyFilters">Apply filters</button>
        </form>
    )
}
