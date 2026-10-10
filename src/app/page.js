import Image from "next/image";
import baseUrl from "@/services/baseUrl";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const products = await getProducts();
  const downProducts = products.filter((p) => p.change.dir == "down");
  console.log(downProducts);

  const upProducts = products.filter((p) => p.change.dir == "up");
  console.log(upProducts);

  return (
    <div>
      <Marquee products={products}></Marquee>

      <div className="w-full max-w-7xl mx-auto space-y-8 space-x-8">
        {/* up products */}
        <div>
          <p>আজ দাম বেড়েছে</p>
          <div className="grid grid-cols-3 gap-3">
            {upProducts.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>

        {/* down products */}
        <div>
          <p>আজ দাম কমেছে</p>
          <div className="grid grid-cols-3 gap-3">
            {downProducts.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>

        {/* all products */}
        <div>
          <p>সব পণ্য</p>
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
