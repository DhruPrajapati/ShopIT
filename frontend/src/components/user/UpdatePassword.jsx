import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {

  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();


  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("password updated successfully");
      
 
      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
 
    const formData = new FormData(e.target);
    // formData.append("name", new Blob([JSON.stringify(name)]));
    // formData.append("email", new Blob([JSON.stringify(email)]));
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    console.log("this is dataFrom",   formData);
    dispatch(UpdatePassword( formData ));
  };
  return (
    <Fragment>
      <MetaData title={"Change Password"}/>

      <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
      
    </Fragment>
  )
}

export default UpdatePassword
