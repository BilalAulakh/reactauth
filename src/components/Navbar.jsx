import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserDetail } from "../store/auth/service";


import {
  TEPopover,
  TEPopoverToggler,
  TEPopoverContent,
  TERipple,
} from "tw-elements-react";
// import {data} from 'autoprefixer';
// Import your action creator

const Navbar = () => {
  const dispatch = useDispatch();
  const { dataFetched, user,isAuthenticated } = useSelector((state) => state.auth);
  console.log("current user is", user);

  
  useEffect(() => {
    const accessToken = localStorage.getItem("acessToken");
    // console.log('acessToken',accessToken)
    if (accessToken && !dataFetched) {
      dispatch(getCurrentUserDetail({accessToken})); 
    }
  }, [dispatch, dataFetched]);

  return (
    <div className="relative">
      <nav className="bg-pink-300 border-gray-200 dark:bg-gray-900 w-[800px] rounded-lg mx-auto z-40 fixed top-8 right-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:flex md:items-center gap-3 md:w-auto" id="navbar-default">
          <TEPopover className=" md:text-center">
      <TERipple rippleColor="light">
        <TEPopoverToggler className=" rounded-full bg-danger p-4 h-14 w-14  pb-2.5  border-2 shadow-2xl  bg-slate-200 flex justify-center ">
           {user?.user?.fullName}
        </TEPopoverToggler>
      </TERipple>

      <TEPopoverContent placement="top" className="z-40">
      
        <div className="p-4 text-[#212529] rounded-b-lg shadow-[0_0px_3px_0_rgba(0,0,0,0.07),0_2px_2px_0_rgba(0,0,0,0.04)] bg-white bg-clip-padding border border-t-0 border-neutral-100 empty:hidden dark:text-white dark:border-0 dark:bg-neutral-700">
        
          <h3 className="py-2 px-4 mb-0 ">
          {user?.user?.username}
        </h3>


        </div>
      </TEPopoverContent>
    </TEPopover>
    
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-pink-300 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-pink-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
           
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
