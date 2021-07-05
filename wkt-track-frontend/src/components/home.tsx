import {Fragment, useCallback} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../features/User/UserSlice";

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
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )
    }
  }, [isLoggedIn])

  return (
    <Fragment>
      <div>
        <div className="navbar">
          <Link to="/">Home</Link>
          {renderIfLoggedIn()}
        </div>
        <h1>Home</h1>
      </div>
    </Fragment>
  )
}

export default Home;