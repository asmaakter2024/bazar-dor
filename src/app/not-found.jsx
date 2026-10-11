import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f4] px-5">
      <section className="w-full max-w-lg rounded-3xl border border-[#dfe9df] bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f3e9] text-4xl">
          🥬
        </div>

        <p className="mt-6 text-7xl font-extrabold tracking-tight text-[#16803c]">
          404
        </p>

        <h1 className="mt-3 text-2xl font-bold text-[#253128]">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#788078]">
          আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে অথবা ঠিকানাটি ভুল।
          বাজারদর দেখতে হোমপেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#16803c] px-6 py-3 font-semibold text-white transition hover:bg-[#116b32] focus:outline-none focus:ring-4 focus:ring-[#16803c]/20"
        >
          হোমপেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
