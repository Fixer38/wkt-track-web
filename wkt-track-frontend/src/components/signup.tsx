import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {userSelector} from "../features/User/UserSlice";
import {useEffect} from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
      userSelector
  );
  const onSubmit = (data) => {
    dispatch(signupUser(data));
  }

  // useEffect will only be triggered if
  // isSuccess and isError are updated
  useEffect(() => {
    if(isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
    if(isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
}


export default Signup;