import ProductCard from "../../../components/ProductCard";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import { notFound } from "next/navigation";

const getCategoryProducts = async (categorySlug) => {
  const res = await fetch(`${baseUrl}/products?category=${categorySlug}`);
  return res.json();
};

const getCategories = async () => {
  const res = await fetch(`${baseUrl}/categories`);
  return res.json();
};

const CategoryProducts = async ({ params, searchParams }) => {
  const { categorySlug } = await params;
  const { sort = "default" } = await searchParams;

  const products = await getCategoryProducts(categorySlug);
  const categories = await getCategories();

  const currentCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  const sortedProducts = [...products];

  if (sort === "price-low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "price-high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  } else if (sort === "change") {
    sortedProducts.sort(
      (a, b) => Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0),
    );
  }

  if(!currentCategory){
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex">
        <Link className="text-green-500" href="/">
          Home
        </Link>
        <span>→</span>
        <p>{currentCategory?.nameBn}</p>
      </div>

      {/* Header */}
      <div className="flex items-center pt-2">
        <div>
          <p className="text-4xl">{currentCategory?.icon}</p>
        </div>

        <div>
          <p className="text-2xl font-bold">{currentCategory?.nameBn}</p>
        </div>
      </div>

      <div className="pt-3">
        <p>{sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
      </div>

      {/* Sort bar */}
      <form
        method="GET"
        className="flex items-center justify-end gap-2 text-sm text-[#788078] mt-4 mb-4"
      >
        {/* <label htmlFor="sort">সাজান</label> */}

        <button
          type="submit"
          className="rounded-lg bg-green-700 px-3 py-1.5 text-white"
        >
          সাজান
        </button>

        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="rounded-lg border border-[#d7ded7] bg-white px-3 py-1.5 text-sm text-[#253128] outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
          <option value="change">দামের পরিবর্তন</option>
        </select>
      </form>

      {/* Products */}
      <div className="grid grid-cols-3 gap-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
