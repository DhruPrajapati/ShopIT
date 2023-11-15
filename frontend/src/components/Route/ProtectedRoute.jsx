import React, { Component, Fragment } from "react";

import { useSelector } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: component, ...rest }) => {
  const navigate = useNavigate();

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading === false ? (
        isAuthenticated === false ? (
          <Navigate to="/login" />
        ) : (
          <Route {...rest} element={<Component />} />
        )
      ) : null}
    </Fragment>
  );
};

export default ProtectedRoute;
