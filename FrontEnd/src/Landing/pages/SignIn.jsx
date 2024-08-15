import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Header from "../partials/Header";
import "../css/style.css";

function SignIn() {
  const navigate = useNavigate();
  // toastify
  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };
  // const id = useSelector((state) => state.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    if (data.email === "") {
      toast.error("please enter email", toastOptions);
      return;
    }
    if (data.password === "") {
      toast.error("please enter password", toastOptions);
      return;
    }
    handleSubmission();
  };

  const handleToken = (token) => {
    localStorage.setItem("erp_admin_token", token);
    const user = jwtDecode(token);
  };


  const handleSubmission = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/login`,
        data,
        {
          header: {
            "content-type": "application/json",
          },
        }
      );
      if (res.data.data.token) {
        toast.success(`Welcome`, toastOptions);
        const token = res.data.data.token;
        const decodedToken = jwtDecode(token);
        handleToken(token);
        // setId(decodedToken.id)
        console.log(decodedToken.id, "decondetoken id");
        // dispatch({ type: 'SET_USER_ID', payload: decodedToken.id });
        // dispatch(setUserDetails(decodedToken.id));
        // console.log(id, "iddddddddddd5656656565656");
        navigate("/erp/dashboard");
      } else {
        toast.error("try again", toastOptions);
      }
    } catch (error) {
      toast.error("Login failed ", toastOptions);
    }
  };

  // const handleSubmission = async () => {

  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`, data, {
  //       header: {
  //         "content-type": "application/json",
  //       },
  //     });
  //     if (res.data.data.token) {
  //       toast.success(`Welcome`, toastOptions);
  //       const token = res.data.data.token;
  //       const decodedToken = jwtDecode(token);
  //       console.log(decodedToken);
  //       handleToken(token);
  //       setId(decodedToken.id); // Assuming decodedToken has id property
  //       console.log(id , "iddddddddddddddddddddddddddddd")
  //       dispatch({ type: 'SET_USER_ID', payload: decodedToken.id }); // Dispatch action to store id in Redux store
  //       navigate('/erp/dashboard');
  //     } else {
  //       toast.error("try again", toastOptions);
  //     }
  //   } catch (error) {
  //     toast.error("Login failed ", toastOptions);
  //   }
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to make entrepreneurism easier.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleValidation}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        value={data.email}
                        onChange={handleChange}
                        id="email"
                        type="email"
                        name="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <input
                        value={data.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
