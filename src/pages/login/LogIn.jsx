import React from "react";
import css from "./style-login.module.css";

export function LogIn() {
  return (
    <>
      <div className={`${css["bg"]} ${"bg"}`} />
      <form>
        <h1>Login</h1>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn btn-primary" type="button">
          Log In
        </button>
      </form>
    </>
  );
}
