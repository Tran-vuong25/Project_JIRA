import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { SideBar } from "./side-bar/SideBar";
import { ScrollToTop } from "../components/scroll-to-top/scroll-to-top";

export function JiraTemplate() {
  return (
    <div
        style={{
          padding: "2.5rem 0 0 30rem",
        }}
    >
      <ScrollToTop>
        <SideBar />
        <Suspense
          fallback={<h2>Loading...</h2>}
        >
          <Outlet />
        </Suspense>
      </ScrollToTop>
    </div>
  );
}
