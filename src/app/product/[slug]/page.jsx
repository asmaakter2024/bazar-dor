// import React from "react";
// import baseUrl from "@/services/baseUrl";

// const getSingleProduct = async () => {
//   const res = await fetch(`${baseUrl}/products`);
//   const data = await res.json();
//   return data;
// };

// const ProductDetails = async ({ params }) => {
//   const { slug } = await params;
//   //console.log(slug);

//   const product = await getSingleProduct(slug);
//   console.log(product)

//   return <div>Details</div>;
// };

// export default ProductDetails;

import baseUrl from "@/services/baseUrl";
import Link from "next/link";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  return res.json();
};

const formatNumberBn = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const getMarketAverage = (market) =>
  (Number(market.min) + Number(market.max)) / 2;

const ProductDetails = async ({ params }) => {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <p>এই পণ্যটি পাওয়া যায়নি।</p>
      </main>
    );
  }

  const markets = [...(product.markets || [])].sort(
    (a, b) => getMarketAverage(a) - getMarketAverage(b),
  );

  const lowestPrice = Math.min(...markets.map((market) => Number(market.min)));
  const highestPrice = Math.max(...markets.map((market) => Number(market.max)));

  // প্রতিটি বাজারের min ও max-এর গড় নিয়ে সামগ্রিক গড় হিসাব
  const averagePrice =
    markets.length > 0
      ? markets.reduce((total, market) => total + getMarketAverage(market), 0) /
        markets.length
      : 0;

  const priceDifference = Number(product.today) - Number(product.yesterday);
  const isUp = priceDifference > 0;
  const isDown = priceDifference < 0;

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
  const unitName = product.unit === "kg" ? "কেজি" : product.unit;

  return (
    <main className="min-h-screen bg-[#f1f5f1] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-4 flex gap-2 text-sm">
          <Link href="/" className="text-green-700 hover:underline">
            হোম
          </Link>
          <span className="text-gray-500">→</span>
          <Link
            href={`/category/${product.category}`}
            className="text-green-700 hover:underline"
          >
            {product.categoryNameBn}
          </Link>
          <span className="text-gray-500">→</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        {/* Product heading */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#dfe7df] bg-white/80 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f1f5f1] text-3xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#253128]">
                {product.nameBn}
              </h1>
              <p className="text-sm text-[#788078]">
                প্রতি {unitName} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-[#253128]">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                {priceDifference !== 0 && (
                  <> · {formatNumberBn(Math.abs(priceDifference))} টাকা</>
                )}
              </p>
            </div>
          </div>

          <div className="min-w-24 rounded-2xl bg-[#f1f5f1] px-5 py-3 text-center">
            <p className="text-xs text-[#788078]">আজকের দাম</p>
            <p className="text-2xl font-bold text-[#253128]">
              {formatNumberBn(product.today)}
            </p>
            <p className="text-xs text-[#788078]">টাকা / {unitName}</p>

            <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
              {changeIcon} {formatNumberBn(Math.abs(product.change?.pct || 0))}%
            </p>
          </div>
        </section>

        {/* Price summary and markets */}
        <section className="mt-5 rounded-2xl border border-[#dfe7df] bg-white/80 p-4 sm:p-5">
          <h2 className="mb-3 font-bold text-[#253128]">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dfe7df] p-4">
              <p className="text-xs text-[#788078]">সর্বনিম্ন দাম</p>
              <p className="mt-1 font-bold text-green-700">
                {formatNumberBn(lowestPrice)} টাকা
              </p>
              <p className="text-xs text-[#788078]">
                বাজারের সর্বনিম্ন দরের ভিত্তিতে
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] p-4">
              <p className="text-xs text-[#788078]">সর্বোচ্চ দাম</p>
              <p className="mt-1 font-bold text-red-600">
                {formatNumberBn(highestPrice)} টাকা
              </p>
              <p className="text-xs text-[#788078]">
                বাজারের সর্বোচ্চ দরের ভিত্তিতে
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] p-4">
              <p className="text-xs text-[#788078]">গড় দাম</p>
              <p className="mt-1 font-bold text-green-700">
                {formatNumberBn(averagePrice)} টাকা
              </p>
              <p className="text-xs text-[#788078]">
                প্রতি {unitName}-এর হিসাব
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-6 font-bold text-[#253128]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-y border-[#dfe7df] text-[#788078]">
                    <th className="px-3 py-3">বাজার</th>
                    <th className="px-3 py-3">বিভাগ</th>
                    <th className="px-3 py-3 text-right">সর্বনিম্ন</th>
                    <th className="px-3 py-3 text-right">সর্বোচ্চ</th>
                    <th className="px-3 py-3 text-right">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={
                        index % 2 === 0
                          ? "border-b border-[#dfe7df] bg-white/50"
                          : "border-b border-[#dfe7df] bg-[#f1f5f1]"
                      }
                    >
                      <td className="px-3 py-3 text-[#253128]">
                        {market.market}
                      </td>
                      <td className="px-3 py-3 text-[#253128]">
                        {market.division}
                      </td>
                      <td className="px-3 py-3 text-right">
                        {formatNumberBn(market.min)} টাকা
                      </td>
                      <td className="px-3 py-3 text-right">
                        {formatNumberBn(market.max)} টাকা
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-[#253128]">
                        {formatNumberBn(getMarketAverage(market))} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-[#788078]">
              এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
