import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
// css
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// components
import { FormRow, Logo } from "../components";
// utils
import axiosFetch from "../utils/axiosFetch";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await axiosFetch.post("/auth/register", data);
    console.log(res);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "Submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Matt" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Bower"
        />
        <FormRow type="text" name="location" defaultValue="" />
        <FormRow type="email" name="email" defaultValue="mtt_bwr@yahoo.com" />
        <FormRow type="password" name="password" defaultValue="" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
