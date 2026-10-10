import ProductCard from "../../../components/ProductCard";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import React from "react";

const getCategoryProducts = async (categorySlug) => {
  const res = await fetch(`${baseUrl}/products?category=${categorySlug}`);
  const data = await res.json();
  return data;
};

const getCategories = async () => {
  const res = await fetch(`${baseUrl}/categories`);
  const data = res.json();
  return data;
};

const CategoryProducts = async ({ params }) => {
  const { categorySlug } = await params;
  //console.log(categorySlug);

  const CategoryProducts = await getCategoryProducts(categorySlug);
  //console.log(CategoryProducts);

  const categories = await getCategories();

  const currentCategory = categories.find((c) => c.slug == categorySlug);
  console.log(currentCategory);
  return (
    <div className="max-w-7xl mx-auto  w-full">
      {/* breadCrumb */}
      <div className="flex">
        <Link className="text-green-500" href={"/"}>
          Home
        </Link>
        <span>→</span>
        <p>{currentCategory?.nameBn}</p>
      </div>
      {/* Header */}
      <div className="flex items-center pt-2">
        {/* left */}
        <div>
          <p className="text-4xl">{currentCategory?.icon}</p>
        </div>
        {/* right */}
        <div>
          <p className="text-2xl font-bold">{currentCategory.nameBn}</p>
        </div>
      </div>
      <div className="pt-3">
        <p>{CategoryProducts?.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
      </div>

      {/* Sort bar */}
      <section className="mt-5 flex justify-end rounded-2xl border border-[#dfe7df] bg-white/80 px-4 py-3  mb-5">
        <label className="flex items-center gap-2 text-sm text-[#788078]">
          সাজান
          <select
            defaultValue="default"
            className="rounded-lg border border-[#d7ded7] bg-white px-3 py-1.5 text-sm text-[#253128] outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="change">দামের পরিবর্তন</option>
          </select>
        </label>
      </section>

      {/* Products */}
      <div className="grid grid-cols-3 gap-3">
        {CategoryProducts.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
