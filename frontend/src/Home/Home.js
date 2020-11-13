import "../App.css";
import "./Home.css";
import home_img from "../assets/quizly.png";
import {Link} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="col-md-6 mx-auto">
          <div className="center-content column">
            <img
              src={home_img}
              className="img-fluid animtaion_vert mb-5"
              alt=""
            />

            <div className="mt-3 align-row">
              <Link className="btn btn_register mr-4" to="/register">
                REGISTER
              </Link>
              <Link className="btn btn_login" to="/login">
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
