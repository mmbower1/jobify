import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { checkDefaultTheme } from "../App";
// css
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Dashboard";
// components
import { BigSidebar, SmallSidebar, Navbar } from "../components";
// axios
import axiosFetch from "../utils/axiosFetch";

export const dashboardLoader = async () => {
  try {
    const { data } = await axiosFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: "Matt" };
  // const { user } = useLoaderData();
  // const [showSidebar, setShowSidebar] = useState(false);
  // const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  // const navigate = useNavigate();

  // const toggleDarkTheme = () => {
  //   const newDarkTheme = !isDarkTheme;
  //   setIsDarkTheme(newDarkTheme);
  //   document.body.classList.toggle("dark-theme", newDarkTheme);
  //   localStorage.setItem("darkTheme", newDarkTheme);
  // };

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  const logoutUser = async () => {
    // navigate("/");
    await axiosFetch.get("/auth/logout");
    toast.success("Logging out..");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        // showSidebar,
        // isDarkTheme,
        // toggleDarkTheme,
        // toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
