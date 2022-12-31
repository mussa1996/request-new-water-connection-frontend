import { useHistory } from "react-router-dom";
const LogoutActions=()=> {
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("userToken");
        history.push("/login");
    };
    return { logout };
}
export default LogoutActions;