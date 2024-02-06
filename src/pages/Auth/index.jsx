import React, { useEffect } from "react";
import "../../styles/login.css";
import smkhebat from "../../assets/images/smkhebat.png";
import wikramalogo from "../../assets/images/wikrama-logo.png";
import bogorlogo from "../../assets/images/bogor.png";
import { toast } from "react-hot-toast";

const Login = () => {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("id", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <div className="main-container">
      <div className="left">
        <center>
          <form action="" className="form-login">
            <label htmlFor="">Username</label>
            <br />
            <input type="text" placeholder="masukkan username"/>
            <div style={{ height: "20px" }}></div>
            <label htmlFor="">Password</label>
            <br />
            <input type="password" placeholder="masukkan password"/>
            <div style={{ height: "30px" }}></div>
            <button>SIGN IN</button>
          </form>
          <p className="lupa-password">
            Lupa password? klik{" "}
            <span>
              <a href="">disini</a>
            </span>
          </p>
        </center>
      </div>
      <div className="right">
        <p className="tanggal">{formattedDate}</p>
        <br />
        <p className="sim-pkl">
          Sistem Informasi Manajemen <span>Praktek Kerja Lapangan</span>
        </p>
        <div className="logo-list">
          <img src={smkhebat} alt="" />
          <img src={wikramalogo} alt="" />
          <img src={bogorlogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
