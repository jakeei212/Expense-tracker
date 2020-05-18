import React, { Component } from "react";
import FormInput from "../form-input/formInput";
import { auth, createUserProfileDocument } from "../../firebase";
import "./signUp.scss";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {  email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { email });

      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
      });
      this.props.history.push('/')
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {  email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
       
        <span>הרשמה</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
   
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <button className="custom-button" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
