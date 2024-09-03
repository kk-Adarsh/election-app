"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const LogoutButton = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const logout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    } finally {
      setLogoutLoading(true);
    }
  };
  return (
    <DropdownMenuItem
      onClick={logout}
      className={logoutLoading ? "justify-center" : undefined}
    >
      {logoutLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Logout"
      )}
    </DropdownMenuItem>
  );
};

export default LogoutButton;
