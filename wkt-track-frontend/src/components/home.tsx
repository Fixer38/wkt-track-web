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
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )
    }
  }, [isLoggedIn])

  return (
    <div>

    </div>
  )
}

export default Home;