import React, { Component } from "react";
import "./css/LandingPage.css";
import logo from "../assets/BigLogo.png";
import { AuthContext } from "../contexts/Auth";
import { useHistory, useLocation } from "react-router-dom";
class LandingPage extends Component {
  render() {
    let auth = this.context;
    return (
      <div className="container-fluid wrapper d-flex justify-content-center align-items-center">
        <div className="container d-flex flex-row form-custom shadow-lg p-0">
          <div className="col-6 left-custom"></div>
          <form className="col-6 d-flex h-100 flex-column justify-content-center align-items-center bg-white">
            <img src={logo} className="w-75 mb-5" />

            <div className="input-wrapper d-flex flex-row w-75 mb-4">
              <input
                required
                className="w-100 input-custom"
                type="text"
                value={auth.username}
                onChange={(event) =>
                  auth.onChangeText(event.target.value, "username")
                }
              />
              <span className="input-label">Tên đăng nhập</span>
            </div>
            <div className="input-wrapper d-flex flex-row w-75 mb-4">
              <input
                required
                className="w-100 input-custom"
                type="password"
                value={auth.password}
                onChange={(event) =>
                  auth.onChangeText(event.target.value, "password")
                }
              />
              <span className="input-label">Mật khẩu</span>
            </div>

            <button
              className="w-75 p-2 btn mt-4 btn-outline-primary shadow btn-custom font-weight-bold"
              onClick={auth.onLogin}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }
}

LandingPage.contextType = AuthContext;

export default (props) => {
  const history = useHistory();
  const location = useLocation();
  return <LandingPage history={history} location={location} {...props} />;
};
