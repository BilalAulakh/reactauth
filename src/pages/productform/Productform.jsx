import React, { useRef, useState } from "react";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
const Productform = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(2, "Too Short!").required("Required"),
    productPrice: Yup.string().required("Required"),
    // Add validation for image file if needed
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...Array.from(files),
    ]);
  };

  const handleDelete = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (file, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen py-20 flex justify-center items-center ">
      <div>
        <Formik
           initialValues={{
            productName: "",
            productPrice: "",
          }}
          validationSchema={ProductSchema}
          onSubmit={async (values) => {
            // Dispatch action to save product details and uploaded files
            console.log("Form submitted with values:", values);
            console.log("Uploaded files:", selectedFiles);
            // Example dispatch
            // dispatch(saveProduct(values, selectedFiles));
          }}
        >
          {({ errors, touched }) => (

            <div>
   <div className="mb-16">
                <div className="flex justify-center items-center bg-white  p-4     mx-auto border-2">
                  <button onClick={handleButtonClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-24  h-24 p-4 border-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <input
                    id="files"
                    name="files"
                    type="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {/* Display selected files */}
                  {selectedFiles.map((file, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <div
                        className="h-20 w-20 absolute top-4 right-3 border-none cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        {/* Delete icon */}
                      </div>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-4 m-2 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>


                  <Form className="flex flex-col w-[400px]  rounded-lg mx-auto bg-white px-6 py-3">
           

              <label htmlFor="productName">Product Name:</label>
              <Field name="productName" className="border-2 h-12" />
              {errors.productName && touched.productName && (
                <div>{errors.productName}</div>
              )}

              <label htmlFor="productPrice">Product Price:</label>
              <Field
                name="productPrice"
                type="text"
                className="border-2 h-12"
              />
              {errors.productPrice && touched.productPrice && (
                <div>{errors.productPrice}</div>
              )}

              <button
                type="submit"
                className="mt-8 h-9 w-32 mx-auto bg-purple-500 text-white rounded-md"
              >
                Submit
              </button>
            </Form>
            </div>
        
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Productform;
