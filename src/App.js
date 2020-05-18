import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Login from "./components/singIn/Login";
import SignUp from "./components/singUp/signUp";
import { auth, createUserProfileDocument } from "./firebase";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import AllBills from "./pages/bills/allBills";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props; //for deconstruction instead passing this.props...
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      setCurrentUser({ currentUser: userAuth });
      console.log(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.props.currentUser.currentUser);
    return (
      <div className="App">
        <Header />
        <div className="Content">
          <Switch>
            <Route
              exact
              path="/signin"
              render={() =>
                this.unsubscribeFromAuth === null ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...this.props} />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={() =>
                this.props.currentUser.currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <SignUp />
                )
              }
            />
            <Route
              exact
              currentUser={this.props.currentUser}
              path="/"
              component={Home}
            />
            <Route
              exact
              currentUser={this.props.currentUser}
              path="/bills"
              component={AllBills}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: setCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
