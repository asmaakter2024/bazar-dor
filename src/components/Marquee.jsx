import React from "react";
import MarqueeText from "react-marquee-text";

const Marquee = ({ products }) => {
  console.log(products);
  return (
    <div className="bg-base-300">
      <MarqueeText direction="right" duration={10}>
        {products.map((product) => (
          <div key={product?.id}>
            <p className="mr-12">●{product?.nameBn}</p>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
