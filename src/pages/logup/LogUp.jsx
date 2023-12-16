import { useFormik } from "formik";
import React, { useState } from "react";
import * as css from "./style-logup.module.css";
import * as Y from "yup";
import { Link, useNavigate } from "react-router-dom";
import { logUp } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/user-slice";

const validationSchema = Y.object({
  email: Y.string()
    .email("Sai định dạng email")
    .required("Vui lòng nhập email"),
  passWord: Y.string()
    .required("Vui lòng nhập password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  cfPassW: Y.string()
    .required("Vui lòng nhập lại pass word")
    .oneOf([Y.ref("passWord"), null], "Pass word chưa đúng"),
  name: Y.string()
    .max(30, "Tên đăng nhập tối đa 30 ký tự")
    .min(10, "Tên đăng nhập ít nhất 10 ký tự")
    .required("Tên không được bỏ trống"),
  phoneNumber: Y.string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Sai định dạng số điện thoại")
    .required("Số điện thoại không được bỏ trống"),
});

export function LogUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [errorLogup, setErrorLogup] = useState({
    isError: false,
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      cfPassW: "",
      name: "",
      phoneNumber: "",
    },

    validationSchema,

    onSubmit: (values) => {
      // console.log(values);

      logUp(values)
        .then((resp) => {
          // console.log(resp);
          dispatch(
            userLogin({
              name: resp.name,
            })
          );

          navigate("/");
        })
        .catch((err) => {
          setErrorLogup({
            isError: true,
            message: "email đã được đăng ký",
          });
        });
    },
  });

  return (
    <>
      <div className={`${css["bg"]} ${"bg"}`} />

      <form onSubmit={formik.handleSubmit} className={css["bg-form"]}>
        <h1>Log Up</h1>
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
          id="passWord"
          // type="password"
          placeholder="Pass Word"
          {...formik.getFieldProps("passWord")}
        />
        {formik.touched.passWord && formik.errors.passWord && (
          <p className={css["pErr"]}>{formik.errors.passWord}</p>
        )}
        <input
          id="cfPassW"
          // type="cfPassW"
          placeholder="Confirm Pass Word"
          {...formik.getFieldProps("cfPassW")}
        />
        {formik.touched.cfPassW && formik.errors.cfPassW && (
          <p className={css["pErr"]}>{formik.errors.cfPassW}</p>
        )}
        <input
          id="name"
          type="name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p className={css["pErr"]}>{formik.errors.name}</p>
        )}
        <input
          id="phoneNumber"
          type="phoneNumber"
          placeholder="Phone Number"
          {...formik.getFieldProps("phoneNumber")}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className={css["pErr"]}>{formik.errors.phoneNumber}</p>
        )}
        <div className="btnLogUp">
          {errorLogup.isError && (
            <p className={css["pErr"]}>{errorLogup.message}</p>
          )}

          <Link to={"/"}>
            <button type="submit" className={css["btn"]}>
              Log In
            </button>
          </Link>
          <button type="submit" className={css["btn"]}>
            Log Up
          </button>
        </div>
      </form>
    </>
  );
}
