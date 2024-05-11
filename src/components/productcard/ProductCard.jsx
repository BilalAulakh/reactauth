import React from "react";
import img3 from "../../images/img3.jpeg";
const ProductCard = () => {
  const detail = [
    {
      imges: img3,
      title: "product 1",
      price: 22,
      status: "pending",
    },
    {
      imges: img3,
      title: "product 2",
      price: 30,
      status: "reject",
    },
    {
      imges: img3,
      title: "product 3",
      price: 40,
      status: "pending",
    },
    {
      imges: img3,
      title: "product 4",
      price: 44,
      status: "pending",
    },
    {
      imges: img3,
      title: "product 1",
      price: 22,
      status: "pending",
    },
    {
      imges: img3,
      title: "product 1",
      price: 22,
      status: "pending",
    },
  ];
  return (
    <div className="  w-full ">
      
      <div className="grid grid-cols-4 gap-3 place-items-center">
        {detail.map((val, index) => (
          <div key={index}>
            <div className="border-2  p-5 bg-slate-300 rounded-lg ">
              <img src={val.imges} alt="hfhf" className="h-32 w-32" />
              <h1 className="text-2xl">{val.title}</h1>

              <p>{val.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
