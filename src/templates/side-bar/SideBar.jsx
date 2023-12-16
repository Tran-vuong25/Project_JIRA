import { Avatar } from "antd";
import React from "react";
import css from "./sidebar.module.css";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <div className={css["bgSideBar"]}>
      <div className={css["side-content"]}>
        <div className={css["side-layout"]}>
          <Avatar className={css["avatar"]}></Avatar>
          <p>name | email</p>
        </div>

        <div className={css["side-nav"]}>
          <Link>
            <p>
              <span></span>
              Cyber Board
            </p>
          </Link>
          <Link>
            <p className="active">
              <span></span>
              Project management
            </p>
          </Link>
          <Link>
            <p>
              <span></span>
              Create project
            </p>
          </Link>
        </div>

        <div className={css["side-nav"]}>
          <Link>
            <p>
              <span></span>
              Release
            </p>
          </Link>
          <Link>
            <p>
              <span></span>
              Issues and filters
            </p>
          </Link>
          <Link>
            <p>
              <span></span>
              Pages
            </p>
          </Link>
          <Link>
            <p>
              <span></span>
              Reports
            </p>
          </Link>
          <Link>
            <p>
              <span></span>
              Components
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
