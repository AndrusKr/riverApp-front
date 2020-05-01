import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react";
import Rivers from "./Rivers";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: !!localStorage.getItem("jwt"),
      open: false
    };
  }

  login = () => {
    axios.post("http://localhost:8080/api/v1/auth/login", {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      const jwtToken = response.data["token"];
      if (jwtToken !== null) {
        localStorage.setItem("jwt", jwtToken);
        this.setState({isAuthenticated: true});
      } else {
        this.setState({open: true});
      }
    })
      .catch(err => console.error(err))
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const imgBg = require('../static/login-bg.jpg');
    const imgStyle = {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${imgBg})`,
      width: '100%',
      height: '100%',
    };
    if (this.state.isAuthenticated === true) {
      return (<Rivers/>)
    } else {
      return (
        <div id="login" style={imgStyle}>
          <h3 className="text-center text-white pt-5">Login form</h3>
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <div className="form-group">
                    <input type="text" name="username" onChange={this.handleChange} className="form-control"
                           placeholder="username"/>
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" onChange={this.handleChange} className="form-control"
                           placeholder="password"/>
                  </div>
                  <input type="submit" name="submit" onClick={this.login} className="btn btn-info btn-md"
                         value="Login"/>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default Login;
