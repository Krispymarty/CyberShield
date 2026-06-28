"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/features/user/dashboard/Dashboard";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return <Dashboard />;
}