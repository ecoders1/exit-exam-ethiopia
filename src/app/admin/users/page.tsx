"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Loader2, User, Calendar } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  created_at: string;
  universities?: { name: string };
  departments?: { name: string };
}

export default function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*, universities(name), departments(name)")
        .order("created_at", { ascending: false });
      setUsers(data ?? []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{users.length} registered</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="search" placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No students found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Student</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">University</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Department</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.full_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{user.universities?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{user.departments?.name ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
