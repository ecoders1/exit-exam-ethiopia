"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import Link from "next/link";

interface Department { id: string; name: string; icon: string; description: string; created_at: string; }

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("departments").select("*").order("name");
    setDepartments(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this department?")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("departments").delete().eq("id", id);
    await fetchData();
    setDeleting(null);
  };

  const filtered = departments.filter((d) => d.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{departments.length} total</p>
        </div>
        <Link href="/admin/departments/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Department
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="search" placeholder="Search departments…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No departments found. <Link href="/admin/departments/new" className="text-blue-500 hover:underline">Add one</Link></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Icon</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Description</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-3.5 text-2xl">{dept.icon || "📚"}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 max-w-xs truncate">{dept.description || "—"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/departments/${dept.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(dept.id)} disabled={deleting === dept.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-40">
                          {deleting === dept.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
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
