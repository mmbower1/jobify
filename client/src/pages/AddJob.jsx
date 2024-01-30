import React from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
// import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axiosFetch from "../utils/axiosFetch";

export const addJobAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axiosFetch.post("/jobs", data);
    toast.success("Job added successfully");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "Submitting...";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="Job status"
            name="jobStatus"
            // defaultValue={JOB_TYPE.FULL_TIME}
            // list={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
