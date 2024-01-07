import { Avatar } from "antd";
import React, { useEffect } from "react";
import css from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { getLocal } from "../../utils";
import { USER_LOGIN } from "../../constants";
import { CardIcon } from "../../assets/icons/card.icon";
import { SettingIcon } from "../../assets/icons/setting.icon";
import { CreateIcon } from "../../assets/icons/create.icon";

const resp = getLocal(USER_LOGIN);
export function SideBar() {
  // useEffect({
  // },[])
  return (
    <div className={css["bgSideBar"]}>
      <div className={css["side-content"]}>
        <div className={css["side-layout"]}>
          <Avatar
            className={css["avatar"]}
            style={{ backgroundImage: `url("${resp.avatar}")` }}
          ></Avatar>
          <p>
            {resp.name} <br /> {resp.email}
          </p>
        </div>

        <div className={css["side-nav"]}>
          <Link to="#">
            <p>
              <span>
                <CardIcon />
              </span>{" "}
              Cyber Board
            </p>
          </Link>
          <Link to="home">
            <p className="active">
              <span>
                <SettingIcon />
              </span>{" "}
              Project management
            </p>
          </Link>
          <Link to="#">
            <p>
              <span>
                <CreateIcon />
              </span>{" "}
              Create project
            </p>
          </Link>
        </div>

        {/* <div className={css["side-nav"]}>
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
        </div> */}
      </div>
    </div>
  );
}
