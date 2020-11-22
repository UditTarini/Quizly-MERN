import {useState} from "react";
import {Link} from "react-router-dom";
import "../App.css";
import NavigationBar from "../Commons/NavigationBar";
import {register} from "../Commons/Utils/authHelper";

function Register() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const {name, password, error, loading, success} = values;

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    register({name, password})
      .then((data) => {
        if (data.error) {
          alert(data.error);
          setValues({...values, error: data.error, success: false});
        } else {
          setValues({
            ...values,
            // to clear all field after submit
            name: "",
            password: "",
            error: "",
            loading: true,
            success: true,
          });
        }
      })
      .catch(() => {
        console.log("error in register");
      });
  };

  const successMsg = () => {
    return (
      <div className="alert success-reg" role="alert">
        Account created successfully. <br />{" "}
        <Link to="/login"> Login here </Link>
      </div>
    );
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="col-md-6 col-lg-3 col-sm-11 col-11 mx-auto">
          <form>
            <div className="center-content column">
              <h1 className="text-white mb-5">Create an account</h1>

              {success && successMsg()}

              <input
                placeholder="Name"
                type="text"
                onChange={handleOnChange("name")}
              ></input>
              <input
                placeholder="Password"
                type="password"
                onChange={handleOnChange("password")}
              ></input>

              <button className="btn btn_home reg" onClick={onSubmit}>
                {loading ? <i class="fas fa-spinner fa-pulse"></i> : "REGISTER"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
