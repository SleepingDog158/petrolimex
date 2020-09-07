import React, { Component } from "react";
import { STATION, ADMIN, CLIENT } from "../constants";

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLogin: true,
      role: CLIENT,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.setIsLogin = this.setIsLogin.bind(this);
    this.setRole = this.setRole.bind(this);
  }

  setIsLogin(isLogin) {
    this.setState({ isLogin });
  }

  setRole(role) {
    this.setState({ role });
  }

  onChangeText(text, type) {
    switch (type) {
      case "username":
        return this.setState({ username: text });
      case "password":
        return this.setState({ password: text });
    }
  }

  onLogin(event) {
    event.preventDefault();
    let { username, password } = this.state;
    console.log(username, password);

    // save cookies
    // auth sign
    // role

    // call api
    this.setState({
      isLogin: true,
    });

    this.setRole(CLIENT);
  }

  componentDidMount() {
    // call api login
    // check auth sign exist
    // send auth sign to server
    // role is correct

    switch (this.state.role) {
      case ADMIN:
        this.setRole(ADMIN);
        break;
      case CLIENT:
        this.setRole(CLIENT);
        break;
      case STATION:
        this.setRole(STATION);
        break;
      default:
        this.setIsLogin(false);
    }
  }

  render() {
    let { isLogin, role, username, password } = this.state;
    return (
      <AuthContext.Provider
        value={{
          username: username,
          password: password,
          isLogin: isLogin,
          role: role,
          onLogin: this.onLogin,
          onChangeText: this.onChangeText,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
