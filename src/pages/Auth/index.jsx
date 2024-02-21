import React, { useState } from "react";
import "../../styles/login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import smkhebat from "../../assets/images/smkhebat.png";
import wikramalogo from "../../assets/images/wikrama-logo.png";
import bogorlogo from "../../assets/images/bogor.png";

const Login = () => {

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response && response.data) {
        if (response.status === 200) {
          document.cookie = `token=${response.data.data.token}; path=/`;
          toast.success("Login berhasil");
          setTimeout(() => {
            window.location.href = "/jadwal-pemberangkatan";
          }, 2000);
        } else if (response.status === 419) {
          toast.error("Ada masalah dengan CSRF Token");
        } else if (response.status === 500) {
          toast.error("Ada masalah internal");
        } else if (response.status === 401) {
          toast.error("Email atau password salah");
        } else {
          toast.error("Ada masalah");
        }
      } else {
        toast.error("Ada masalah dalam merespon permintaan");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="main-container">
      <Toaster />
      <div className="left">
        <center>
          <form action="" className="form-login" onSubmit={handleSubmit}>
            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <div style={{ height: "20px" }}></div>
            <label htmlFor="">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div style={{ height: "30px" }}></div>
            <button type="submit">SIGN IN</button>
          </form>
          <p className="lupa-password">
            Forgot password? Click{" "}
            <span>
              <a href="">here</a>
            </span>
          </p>
          {error && <p>{error}</p>}
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
      </div>    </div>
  );
};

export default Login;