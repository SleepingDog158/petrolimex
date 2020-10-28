import Axios from "axios";
import React, { Component } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    const { cookies } = this.props;
    const { token, role } = cookies;

    this.state = {
      username: "",
      password: "",
      isLogin: token ? true : false,
      role: role ? role : null,
    };
  }

  onChangeText = (text, type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "username":
        return this.setState({ username: text });
      case "password":
        return this.setState({ password: text });
    }
  };

  onLogin = async (event) => {
    event.preventDefault();
    const { setCookie } = this.props;
    let { username, password } = this.state;
    try {
      const { data } = await Axios.post("http://localhost:6060/login", {
        username,
        password,
      });
      const { token, role, userId } = data;
      if (token) {
        setCookie("token", token, { path: "/" });
        if (role) {
          setCookie("role", role, { path: "/" });
          setCookie("userId", userId, { path: "/" });
        }
        this.setState({
          isLogin: true,
          role: role,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onLogout = async () => {
    const { removeCookie } = this.props;
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    removeCookie("userId", { path: "/" });
    this.setState({
      isLogin: false,
      role: null,
    });
    document.location.reload();
  };

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
          onLogout: this.onLogout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default (props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "role",
    "userId",
  ]);
  return (
    <AuthProvider
      cookies={cookies}
      setCookie={setCookie}
      removeCookie={removeCookie}
      {...props}
    />
  );
};
