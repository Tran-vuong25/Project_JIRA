import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { SideBar } from "./side-bar/SideBar";
import css from './jira-template.module.css'

export function JiraTemplate() {
  return (
    <>
      <div className={css['j-layout']}>
        <SideBar />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
