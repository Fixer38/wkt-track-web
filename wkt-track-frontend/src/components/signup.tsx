import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {clearState, signupUser, userSelector} from "../features/User/UserSlice";
import {useEffect} from "react";
import { Fragment } from "react";

type FormValues = {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
      userSelector
  );
  const onSubmit: SubmitHandler<FormValues> = (data) => {
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

  return (
      <Fragment>
        <div>
          <div>
            <h2>Sign up</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >

            <label
                htmlFor="username"
            >
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              {...register("username", { required: true})}
            />

            <label
              htmlFor="email"
            >
            </label>
            <input
              id="email"
              type="text"
              autoComplete="email"
              required
              {...register("email", { required: true})}
            />

            <label
                htmlFor="password"
            >
            </label>
            <input
              id="password"
              type="password"
              required
              {...register("password", { required: true})}
            />
          </form>
        </div>
      </Fragment>
  )
}


export default Signup;