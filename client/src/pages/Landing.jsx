import React from "react";
import { Link } from "react-router-dom";

import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Keep track of your job applications with the Mern stack using crud
            functionality and json web token user authentication. From Udemy,
            thanks to John Smilga for creating this course.
          </p>
          <Link to="/register" className="btn reguster-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />'
      </div>
    </Wrapper>
  );
};

export default Landing;
