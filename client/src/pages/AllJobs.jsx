import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
// css
import { toast } from "react-toastify";
// components
import { JobsContainer, SearchContainer } from "../components";
import axiosFetch from "../utils/axiosFetch";

export const allJobsLoader = async () => {
  try {
    const { data } = await axiosFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
