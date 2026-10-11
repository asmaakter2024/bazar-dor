 import React from "react";

 const LoadingPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f4] px-5">
      <section className="text-center">
        <div className="mx-auto flex  items-center justify-center rounded-4xl bg-white text-7xl shadow-sm p-8">
          😋 🥬 🥛 🍆 🌶️
        </div>

        <div className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-4 border-[#dfe9df] border-t-[#16803c]" />

        <h1 className="mt-5 text-xl font-bold text-[#253128]">
          বাজারদর লোড হচ্ছে
        </h1>

        <p className="mt-2 text-sm text-[#788078]">একটু অপেক্ষা করুন...</p>
      </section>
    </main>
  );
};

export default LoadingPage;
