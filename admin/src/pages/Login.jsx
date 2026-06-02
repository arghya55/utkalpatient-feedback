import { useState } from "react";
import API from "../service/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {

  const navigate =
  useNavigate();

  const [text,setText] =
  useState("");

  const [password,setPassword] =
  useState("");

  const loginHandler =
  async(e)=>{

    e.preventDefault();

    try{

      const response =
      await API.post(
        "/admin/login",
        {
          text,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate(
        "/analytics"
      );

    }catch(error){

      alert(
        "Invalid Credentials"
      );

    }

  };

  return(

    <div className="login-container">

      <form
      className="login-card"
      onSubmit={loginHandler}
      >

        <h2>
          Utkal Hospital
        </h2>

        <p>
          Admin Login
        </p>

        <input
        type="text"
        placeholder="Username"
        value={text}
        onChange={(e)=>
        setText(e.target.value)
        }
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
        setPassword(e.target.value)
        }
        />

        <button
        type="submit"
        >
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;