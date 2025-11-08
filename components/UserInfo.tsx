"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = ({ name }: { name: string }) => {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log("Signed out succesfully");
      toast.success("Signout successful!");
      router.push("/login");
    }
  };

  return (
    <div className="flex gap-5 items-center">
      <p>
        Hello, <span className="font-semibold">{name}</span>
      </p>
      <button
        onClick={handleSignOut}
        className="bg-red-600 p-2 cursor-pointer text-white hover:bg-red-500"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;
