import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginFunApi } from "../../store/auth/service";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigte = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "required!").required("Required"),
  });
  return (
    <div className="py-9">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          console.log(values);
          dispatch(
            loginFunApi({
              data: values,
              onSuccess: () => {
                navigte("/");
              },
            })
          );
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col w-[400px] rounded-lg  mx-auto bg-white shadow-2xl px-6 py-3">
            <h1 className="text-3xl text-center ">Login</h1>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" className=" border-2 h-12" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <label htmlFor="password">Password:</label>
            <Field name="password" type="text" className=" border-2 h-12" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <button
            
              type="submit"
              className="mt-8 h-9 w-32 mx-auto bg-purple-500 text-white rounded-md"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
