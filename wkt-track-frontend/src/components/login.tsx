import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useHistory} from "react-router-dom";
import {clearState, loginUser, userSelector} from "../features/User/UserSlice";
import * as Yup from "yup";
import { useEffect } from "react";
import { Fragment } from "react";

// Interface used by react-hook-form for the form types
type FormValues = {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
})

const Login = () => {
  const dispatch = useDispatch();
  // Define the userForm for react-hooks-form and adding the validation parameters contained in validationSchema
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });
  const history = useHistory();

  // Get data from the user slice state
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  // Used on submit of the login form
  // Dispatches the post request to the login api with the data from the form
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(loginUser(data));
  }

  // useEffect will only be triggered if
  // isSuccess and isError are updated
  useEffect(() => {
      if (isSuccess) {
        dispatch(clearState());
        history.push('/');
      }
      if (isError) {
        console.log(errorMessage);
        dispatch(clearState());
      }
    }, [isSuccess, isError]);

  return (
    <Fragment>
      <div>
        <div>
          <h2>Login</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <label
            htmlFor="Email"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            required
            {...register("email")}
          />
          <div>{errors.email?.message}</div>
          <label
            htmlFor="password"
            >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            {...register("password")}
          />
          <div>{errors.password?.message}</div>
          <button
            type="submit"
            >
            Login
          </button>
        </form>
        {errorMessage &&
        <div>{errorMessage}</div>
        }
      </div>
    </Fragment>
  )
}

export default Login;