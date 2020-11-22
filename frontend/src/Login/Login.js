import {Redirect} from "react-router-dom";
import "../App.css";
import NavigationBar from "../Commons/NavigationBar";
import {
  login,
  authenticate,
  isAuthenticated,
} from "../Commons/Utils/authHelper";

import {useEffect, useState} from "react";

function Login() {
  const [values, setValues] = useState({
    user: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const {name, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    login({name, password})
      .then((data) => {
        if (data.error) {
          alert(data.error);
          setValues({...values, error: data.error});
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("error in login"));
  };

  const redirectOperation = () => {
    if (didRedirect) {
      return <Redirect to="/topics" />;
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="col-md-6 col-lg-3 col-sm-11 col-11 mx-auto">
          <form>
            <div className="center-content column ">
              <h1 className="text-white mb-5">Log In</h1>
              <input
                placeholder="Name"
                type="text"
                onChange={handleOnChange("name")}
              ></input>

              <input
                placeholder="Password"
                type="password"
                onChange={handleOnChange("password")}
                className="password"
              ></input>
              <button onClick={onSubmit} className="btn btn_home login">
                {loading ? <i class="fas fa-spinner fa-pulse"></i> : "LOGIN"}
              </button>
            </div>
          </form>

          {redirectOperation()}
        </div>
      </div>
    </>
  );
}

export default Login;
