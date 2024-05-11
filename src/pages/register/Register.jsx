import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";

import toast, { Toaster } from 'react-hot-toast';
import {registerFunApi} from "../../store/auth/service";
import {useNavigate} from "react-router-dom";



const Register = () => {

const {isLoading}=useSelector((state)=>state.auth)


const navigate=useNavigate()
  const notify = () => toast('Here is your toast.');
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")

      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "required!")

      .required("Required"),
  });
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  // const [profileUrl, setProfileUrl] = useState("");
  // const [coverFotoUrl, setCoverFotoUrl] = useState("");

  const handleCoverChange = (event) => {
   
    // const file = event.target.files[0];
    // setCoverFile(file);
    // setCoverFotoUrl(URL.createObjectURL(file)); 
    const file = event.target.files[0];
    if (!file) {
      setCoverFile("");
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        console.log("File False", file);
        event.target.value = null;
        setCoverFile("");
        return false;
      } else {
        console.log("file true", file);
        setCoverFile(file);
      }
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const type = file.type.split("/")[0];
      if (type !== "image") {
        console.log("File False", file);
        // Handle invalid file type error
      } else {
        console.log("file true", file);
        setSelectedFile(file);
      }
    } else {
      console.log("No file selected");
      // Handle case where no file is selected
    }
  };
  
  return (
    <div className="min-h-screen  py-5">
      <div className="   ">
        <Formik
          initialValues={{
            username: "",
            email: "",
            fullName: "",
            password: "",
            profile: null,
            coverFoto: null,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
          
            // const { profile, coverFoto, ...allvalues } = values;
            console.log('file you are choose',selectedFile);
            // console.log(coverFotoUrl);
            console.log(values);
            const { profile,coverFoto, ...userData } = values;

          dispatch(
              registerFunApi({data:{...userData,
                avatar: selectedFile,
                coverImage: coverFile,},
                
                onSuccess: () => {
                  navigate('/login');
                },
              },
          
            )
            );
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col w-[400px] rounded-lg  mx-auto bg-white shadow-2xl px-6 py-3">
              <div className="relative mb-16">
                <div className="border-2 rounded-lg h-24">
                  {coverFile ? (
                    <img
                   
                      src={URL.createObjectURL(coverFile)}
                      alt="jj"
                      className="object-center  w-full h-full rounded-md"
                    />
                  ) : (
                    <label htmlFor="file">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                      </svg>
                      <input
                      name="coverFoto"
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleCoverChange}
                      />
                    </label>
                  )}
                </div>

                <div className="absolute z-30 flex justify-center items-center bg-white rounded-full h-28 w-28 top-10 left-0 right-0 mx-auto border-2">
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="jj"
                      className="object-cover h-28 w-28  rounded-full"
                    />
                  ) : (
                    <label htmlFor="file">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                      </svg>
                      <input
                      name="profile"
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e)=>handleFileChange(e)}
                      />
                    </label>
                  )}
                </div>
              </div>

              <label htmlFor="name">UserName:</label>
              <Field name="username" className=" border-2 h-12" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" className=" border-2 h-12" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <label htmlFor="fullName">FullName:</label>
              <Field name="fullName" type="text" className=" border-2 h-12" />
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}
              <label htmlFor="password">Password:</label>
              <Field name="password" type="text" className=" border-2 h-12" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}

<button
disabled={isLoading}
  type="submit"
  className="mt-8 h-9 w-32 mx-auto bg-purple-500 text-white rounded-md"
>
  {isLoading ? (
    "Loading..." // Placeholder text or other loading indication
  ) : (
 "Submit"
  )}
</button>

            </Form>
          )}
        </Formik>

       
      </div>
    </div>
  );
};

export default Register;
