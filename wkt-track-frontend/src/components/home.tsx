import {Fragment, useCallback} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../features/User/UserSlice";

// TODO: Separate navbar into navbar component do display it on all pages
// TODO: Create proper design

const Home = () => {
  const { isLoggedIn } = useSelector(
    userSelector
  );

  const renderIfLoggedIn = useCallback(() => {
    if(isLoggedIn)
    {
      return <Link to="/logout">Logout</Link>
    }
    else {
      return (
        <Fragment>
          <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/signup">Signup</Link>
          </li>
          <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/login">Login</Link>
          </li>
        </Fragment>
      )
    }
  }, [isLoggedIn])

  return (
    <div>
      <ul className="flex">
        <li className="mr-6">
          <Link className="text-blue-500 hover:text-blue-800" to="/">Home</Link>
        </li>
        {renderIfLoggedIn()}
      </ul>
    </div>
  )
}

export default Home;