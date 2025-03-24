// app/admin/layout.tsx (✅ 서버 컴포넌트 유지)
import { ReactNode } from "react";
import AdminGuard from "../components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
