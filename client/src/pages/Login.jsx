import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
// css
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// components
import { FormRow, Logo } from "../components";
// utils
import axiosFetch from "../utils/axiosFetch";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await axiosFetch.post("/auth/login", data);
    console.log(res);

    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "Submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="mtt_bwr@yahoo.com" />
        <FormRow type="password" name="password" defaultValue="" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
