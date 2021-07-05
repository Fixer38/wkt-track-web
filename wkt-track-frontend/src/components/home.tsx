import {Fragment, useCallback} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../features/User/UserSlice";
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";

// TODO: Separate navbar into navbar component do display it on all pages
// TODO: Create proper design with Figma

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);

const Home = () => {
  const classes = useStyles();
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
          <Button color="inherit"><Link to="/signup">Signup</Link></Button>
          <Button color="inherit"><Link to="/login">Login</Link></Button>
        </Fragment>
      )
    }
  }, [isLoggedIn])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Wkt-Track
          </Typography>
          <Button color="inherit"><Link to="/home">Home</Link></Button>
          {renderIfLoggedIn()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Home;