import prisma from "../lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ActivityPage() {
  // ดึงข้อมูลจริงจาก DB
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Activity</h1>
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
              <th className="py-4 font-medium">Category</th>
              <th className="py-4 pr-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
               <tr><td colSpan={4} className="text-center py-8 text-gray-400">No transactions found</td></tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-4 font-medium text-gray-900">{t.name}</td>
                  <td className="py-4 text-sm text-gray-500">
                    {t.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 text-sm text-gray-500">{t.category}</td>
                  <td className={`py-4 pr-4 text-right font-bold ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} THB
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}