import prisma from "../../lib/prisma";
import { updateTransaction } from "../../actions";
import { redirect } from "next/navigation";

// หน้านี้ต้องรับ params เพื่อดูว่าจะแก้ ID ไหน
export default async function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  // ค้นหาข้อมูลแค่ 1 รายการ (ใช้ findUnique)
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    redirect("/edit");
  }

  const dateString = transaction.date.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Edit Transaction</h1>
      </div>

      <form action={updateTransaction} className="space-y-6">
        <input type="hidden" name="id" value={transaction.id} />

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            defaultValue={transaction.amount}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
          <input
            name="category"
            type="text"
            defaultValue={transaction.category}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={transaction.name}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
          <input
            name="date"
            type="date"
            defaultValue={dateString}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-4 mt-6">
            <a href="/edit" className="w-full text-center py-4 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</a>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
            Update
            </button>
        </div>
      </form>
    </div>
  );
}