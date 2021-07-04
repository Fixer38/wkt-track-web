import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {clearState, signupUser, userSelector} from "../features/User/UserSlice";
import {useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Fragment } from "react";

// Interface used by react-hook-form for the form types
type FormValues = {
  username: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters')
      .max(30, 'Username must not exceed 30 characters'),
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must not exceed 30 characters')
      .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must contain at least 8 characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
})

const Signup = () => {
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
  // Used on submit of the signup form
  // Dispatches the post request to the signup api with the data from the form
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
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              {...register("username")}
            />
            <div>{errors.username?.message}</div>
            <label
              htmlFor="email"
            >
            </label>
            Email
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
              Signup
            </button>
          </form>
          {errorMessage &&
          <div>{errorMessage}</div>
          }
        </div>
      </Fragment>
  )
}


export default Signup;