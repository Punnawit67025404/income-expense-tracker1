import prisma from "../lib/prisma";
import { deleteTransaction } from "../actions";
import { Trash2, Plus, Pencil } from "lucide-react"; 
import Link from "next/link";

export default async function EditPage() {
  // ดึงข้อมูลทั้งหมดมาแสดง (ใช้ findMany)
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Transactions</h1>
        <Link href="/create" className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
             <Plus size={16} /> Add
        </Link>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100 text-sm">
              <th className="py-4 pl-4 font-medium">Name</th>
              <th className="py-4 font-medium">Date</th>
              <th className="py-4 font-medium">Amount</th>
              <th className="py-4 pr-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                <td className="py-4 pl-4 font-medium text-gray-900">{t.name}</td>
                <td className="py-4 text-sm text-gray-500">
                    {t.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </td>
                <td className={`py-4 font-medium ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {t.amount.toLocaleString()}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex justify-end items-center gap-2">
                    
                    {/* ปุ่มแก้ไข (Link ไปหน้า [id]) */}
                    <Link 
                      href={`/edit/${t.id}`} 
                      className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Pencil size={16} />
                    </Link>

                    {/* ปุ่มลบ */}
                    <form action={deleteTransaction}>
                      <input type="hidden" name="id" value={t.id} />
                      <button 
                          type="submit"
                          className="p-2 border border-red-100 bg-red-50 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}