"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { authClient, signIn } from "../../../lib/auth-client";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message ||
            "সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।",
        );
      } else {
        toast.success("সাইন ইন সফল হয়েছে!");
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWith = async (provider) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) toast.error(error.message || "সোশ্যাল সাইন ইন করা যায়নি।");
    } catch {
      toast.error("সোশ্যাল সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  const inputClass =
    "mt-1 h-9 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/15";

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8 text-[#26332a]">
      <ToastContainer position="top-center" autoClose={3500} />

      <div className="mx-auto w-full max-w-[360px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold">সাইন ইন</h1>
          <p className="mt-1 text-sm text-[#788078]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন
          </p>
        </header>

        <section className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-5">
          <form onSubmit={onSubmit} className="space-y-3.5">
            <label className="block text-sm">
              ইমেইল
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>

            <label className="block text-sm">
              পাসওয়ার্ড
              <input
                required
                minLength={8}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-9 w-full rounded-lg bg-[#078b43] font-semibold text-white shadow-[0_3px_5px_#078b4350] transition hover:bg-[#06783a] disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
            </button>
          </form>

          <div className="my-3 flex items-center gap-3 text-xs text-[#788078]">
            <span className="h-px flex-1 bg-[#dfe7df]" />
            অথবা
            <span className="h-px flex-1 bg-[#dfe7df]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => signInWith("google")}
              className="h-9 rounded-lg border border-[#dfe7df] text-xs font-semibold hover:bg-[#f1f6f2]"
            >
              <span className="mr-1 text-sm font-bold text-[#4285f4]">G</span>
              Google দিয়ে
            </button>
            <button
              type="button"
              onClick={() => signInWith("github")}
              className="h-9 rounded-lg border border-[#dfe7df] text-xs font-semibold hover:bg-[#f1f6f2]"
            >
              <span className="mr-1">◉</span>
              GitHub দিয়ে
            </button>
          </div>

          <p className="mt-3 text-center text-xs">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="font-medium text-[#078b43]">
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <p className="mt-5 text-center text-sm text-[#788078]">
          <Link href="/" className="hover:text-[#078b43]">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}
