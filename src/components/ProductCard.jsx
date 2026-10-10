import Link from "next/link";
import React from "react";

const formatNumberBn = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value ?? 0);

const ProductCard = ({ product }) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
  const changePercent =
    product.change?.dir === "flat"
      ? "০.০%"
      : `${formatNumberBn(Math.abs(product.change?.pct))}%`;

  return (
    <Link href={`/product/${product?.slug}`}>
      <article className="rounded-2xl border border-[#dfe7df] bg-white p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-xl">
            {product.image || "🛒"}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#253128]">
              {product.nameBn}
            </h2>
            <p className="text-xs text-[#788078]">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-[#788078]">আজকের দাম</p>
            <p className="font-bold text-[#253128]">
              {formatNumberBn(product.today)} টাকা
            </p>
          </div>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${changeColor}`}
          >
            {changeIcon} {changePercent}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
