import React, {
  Fragment,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/ProductActions";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("product deleted succesfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: " ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    if (!Array.isArray(products)) {
      return data;
    }
    console.log("this is producy", products);

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product.id}`}
              className="btn btn-primary py-1">
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                className="px-3"
                bordered
                striped
                hover
                data={setProducts()}
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
