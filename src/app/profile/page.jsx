"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const updateProfile = async (event) => {
    event.preventDefault();
    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: updatedName });
      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
      } else {
        toast.success("প্রোফাইল আপডেট হয়েছে।");
        setName("");
        await refetch();
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/sign-in"),
        },
      });
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f1f6f2] px-4 py-10 text-[#26332a]">
        <div className="mx-auto max-w-[554px] text-sm text-[#788078]">
          প্রোফাইল লোড হচ্ছে…
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f1f6f2] px-4 py-10 text-[#26332a]">
        <div className="mx-auto max-w-[554px] rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-6">
          <p>প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
          <Link href="/sign-in" className="mt-3 inline-block text-[#078b43]">
            সাইন ইন করুন →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-10 text-[#26332a]">
      <ToastContainer position="top-center" autoClose={3500} />

      <div className="mx-auto w-full max-w-[554px]">
        <header className="mb-5">
          <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
          <p className="mt-1 text-xs text-[#788078]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        <section className="mb-4 flex items-center gap-3 rounded-xl border border-[#dfe7df] bg-[#fbfdfb] p-4">
          {user.image ? (
            <Image
              src={user.image}
              height={50}
              width={50}
              alt="প্রোফাইল ছবি"
              className="h-[54px] w-[60px] rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-[54px] w-[60px] items-center justify-center rounded-xl bg-[#e8efe9] text-xl font-semibold text-[#078b43]">
              {(user.name || user.email || "?").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="truncate text-sm text-[#788078]">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            ↪ {isSigningOut ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
          </button>
        </section>

        <section className="rounded-xl border border-[#dfe7df] bg-[#fbfdfb] p-4">
          <h2 className="mb-6 font-semibold">তথ্য</h2>
          <form onSubmit={updateProfile}>
            <label htmlFor="profile-name" className="block px-4 text-sm">
              নাম
            </label>
            <input
              id="profile-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={user.name || "আপনার নাম লিখুন"}
              minLength={3}
              className="mt-1 h-[31px] w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
            />
            <button
              type="submit"
              disabled={isSaving}
              className="mt-3 h-8 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-[0_3px_5px_#078b4350] transition hover:bg-[#06783a] disabled:cursor-wait disabled:opacity-70"
            >
              {isSaving ? "আপডেট হচ্ছে…" : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
