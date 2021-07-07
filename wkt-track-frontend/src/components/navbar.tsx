import {useSelector} from "react-redux";
import {userSelector} from "../features/User/UserSlice";
import {Fragment, useCallback} from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    const { isLoggedIn } = useSelector(
        userSelector
    );

    const renderIfLoggedIn = useCallback(() => {
        if(isLoggedIn)
        {
            return (
                <li className="mr-6">
                    <Link className="font-sans text-blue-500 hover:text-blue-800" to="/logout">Logout</Link>
                </li>
            )
        }
        else {
            return (
                <Fragment>
                    <li className="mr-6">
                        <Link className="font-sans text-blue-500 hover:text-blue-800" to="/signup">Signup</Link>
                    </li>
                    <li className="mr-6">
                        <Link className="font-sans text-blue-500 hover:text-blue-800" to="/login">Login</Link>
                    </li>
                </Fragment>
            )
        }
    }, [isLoggedIn])

    return (
        <div>
            <ul className="flex">
                <li className="mr-6">
                    <Link className="font-sans text-blue-500 hover:text-blue-800" to="/">Home</Link>
                </li>
                {renderIfLoggedIn()}
            </ul>
        </div>
    )
}

export default Navbar;