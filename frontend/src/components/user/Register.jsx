import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../actions/userActions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/image/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", name);
    formData.set("password", name);
    formData.set("avatar", avatar);
    dispatch(login(email, password));
  };
  return <div></div>;
};

export default Register;
