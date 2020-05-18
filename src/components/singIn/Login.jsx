import React from "react";
import { signInWithGoogle, auth } from "../../firebase";
import "./Login.scss";
import FormInput from "../form-input/formInput";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
    this.login()
  };


  login(){
    this.props.history.push("/");
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
      
        <span>כניסה</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <button className="custom-button" type="submit">
              Sign in
            </button>
            <button className="custom-button" onClick={signInWithGoogle}>
              sign with google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
