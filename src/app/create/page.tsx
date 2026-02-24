"use client";

import { addTransaction } from "../actions"; // เรียกใช้ระบบหลังบ้าน

export default function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Add new transaction</h1>
      </div>

      {/* เปลี่ยนจาก onSubmit เป็น action */}
      <form action={addTransaction} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Enter Amount (+ Income, - Expense)</label>
          <input
            name="amount" // สำคัญ! ต้องตรงกับใน actions.ts
            type="number"
            step="0.01"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex. -500 (จ่าย) or 10000 (รับ)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
          <input
            name="category"
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex. Food"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex. ข้าวกะเพรา"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
          <input
            name="date"
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-medium py-4 rounded-xl mt-4 hover:bg-gray-800 transition-colors"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}