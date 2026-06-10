"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Search, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Exam {
  id: string; title: string; year: number; pages: number;
  downloads: number; is_published: boolean;
  universities?: { name: string };
  departments?: { name: string };
}

export default function AdminExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("exams")
      .select("*, universities(name), departments(name)")
      .order("created_at", { ascending: false });
    setExams(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this exam?")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("exams").delete().eq("id", id);
    await fetchData();
    setDeleting(null);
  };

  const togglePublish = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from("exams").update({ is_published: !current }).eq("id", id);
    await fetchData();
  };

  const filtered = exams.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.universities?.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.departments?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{exams.length} total</p>
        </div>
        <Link href="/admin/exams/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Exam
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="search" placeholder="Search exams…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No exams found. <Link href="/admin/exams/new" className="text-blue-500 hover:underline">Add one</Link></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">University</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Department</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Year</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white max-w-[200px] truncate">{exam.title}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{exam.universities?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{exam.departments?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{exam.year}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => togglePublish(exam.id, exam.is_published)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${exam.is_published ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200"}`}>
                        {exam.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {exam.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/exams/${exam.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(exam.id)} disabled={deleting === exam.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-40">
                          {deleting === exam.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
