import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {clearState, signupUser, userSelector} from "../features/User/UserSlice";
import {useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Fragment } from "react";

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
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });
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
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              {...register("username")}
            />

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
            <button
              type="submit"
              >
              Signup
            </button>
          </form>
        </div>
      </Fragment>
  )
}


export default Signup;