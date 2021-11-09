/*import {useLocation} from "react-router-dom";

export default function useQueryParams(params){
    const location = useLocation();
    let query = new URLSearchParams(location.search);
    const requestParams = params.map(param => ({[param]: query.get(param)}))
    return Object.assign({}, ...requestParams)

}*/


