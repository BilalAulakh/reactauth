export const createProductApi = createAsyncThunk(
    "product/addProduct",
    async ({ data, onSuccess }) => {
      console.log("total data is ", data);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/products/get-allproduct",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "Content-type": "multipart/form-data",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*", // GET, POST, PUT, DELETE, OPTIONS
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        console.log("response in registerFunApi => ", response.data);
  
        if (response.data.success === true) {
          toast.success(response.data.message);
  
          console.log(response.data.message);
          if (onSuccess) {
            onSuccess();
          }
  
          return response.data.data;
        } else {
          console.log("Error response in registerFunApi  => ", response.data);
          const err =
            response?.data?.message ||
            response?.message ||
            "Something went wrong!";
          console.log("err: ", err);
          toast.error(err);
          throw new Error(err);
        }
      } catch (error) {
        console.log("Error in registerFunApi ", error);
        let err =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!";
        if (err === "Network Error") {
          err = "Please check your internet connection";
        }
        // toast.error(err);
        throw new Error(err);
      }
    }
  );