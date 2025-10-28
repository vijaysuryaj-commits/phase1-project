import { useNavigate, useLocation, useParams } from "react-router-dom";

export function withRouter (Component){
    return function ComponentWithRouterProp(props){
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} location={location} navigate={navigate} params={params} />
    }
    
}