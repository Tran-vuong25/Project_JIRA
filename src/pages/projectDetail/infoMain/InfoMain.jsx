import React from "react";
import css from "./infoMain.module.css";
import { SearchOutlined } from "@ant-design/icons";

export function InfoMain(props) {
  const { data } = props;

  const renderAvatar = () => {
    if (data) {
      return (data.members.map((member, index) => {
        return (
          <div key={index} className={css["avatar"]}>
            <img
              style={{ width: 30, height: 30, borderRadius: 15 }}
              src={member.avatar}
              alt=""
            />
          </div>
        );
      }));
    }
  };
  return (
    <div>
      <h1>{data.projectName}</h1>
      <div className={css["info"]}>
        <div className={css["search-block"]}>
          <input className={css["search"]} type="text" />
          <SearchOutlined style={{ fontSize: "1.5rem" }} />
        </div>
        <div className={css["avatar-group"]}>{renderAvatar()}</div>
        <div className={css["text"]}>Only My Issues</div>
        <div className={css["text"]}>Recently Updated</div>
      </div>
    </div>
  );
}
