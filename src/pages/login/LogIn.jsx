import React, { useState } from "react";
import css from "./style-login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IconFace } from "../../assets/icons/IconFace";
import { IconTwitter } from "../../assets/icons/IconTwitter";
import { useFormik } from "formik";
import * as Y from "yup";
import { logIn } from "../../services/user.service";
import { setLocal } from "../../utils";
import { ACCESS_TOKEN } from "../../constants";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/user-slice.js";

const validationSchema = Y.object({
  email: Y.string()
    .email("Sai định dạng email")
    .required("Vui lòng nhập email"),
  password: Y.string().required("Vui lòng nhập password"),
});

export function LogIn() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [errorLogin, setErrorLogin] = useState({
    isError: false,
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: (values) => {
      // console.log(values);
      logIn(values)
        .then((resp) => {
          setLocal(ACCESS_TOKEN, resp.accessToken);

          dispatch(
            userLogin({
              email: resp.email,
            })
          );
          navigation("/projectmanagement");
        })
        .catch((err) => {
          setErrorLogin({
            isError: true,
            message: err.message,
          });
        });
    },
  });

  return (
    <>
      <div className={`${css["bg"]} ${"bg"}`} />

      <form onSubmit={formik.handleSubmit} className={css["bg-form"]}>
        <h1>Log In</h1>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={css["pErr"]}>{formik.errors.email}</p>
        )}

        <input
          id="password"
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={css["pErr"]}>{formik.errors.password}</p>
        )}

        {errorLogin.isError && (
          <p className={css["pErr"]}>{errorLogin.message}</p>
        )}

        <button type="submit" className={css["btnLogin"]}>
          Log In
        </button>
        <p>
          Do not have an account? <Link to={"/logUp"}>Sign up</Link> now!
        </p>
        <div className={css["btnItem"]}>
          <Link to={"https://www.facebook.com/"}>
            <IconFace />
          </Link>
          <Link>
            <IconTwitter />
          </Link>
        </div>
      </form>
    </>
  );
}
