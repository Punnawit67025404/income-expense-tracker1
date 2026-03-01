"use client";
import { useState } from "react";
import { addTransaction } from "../actions";

export default function CreatePage() {
  const [type, setType] = useState<"income" | "expense">("income");

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-400">เพิ่มรายการใหม่</h1>
      </div>

      <form action={addTransaction} className="space-y-6">

        {/* ===== TOGGLE รายรับ / รายจ่าย ===== */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-2xl p-1 gap-1">
          <button
            type="button"
            onClick={() => setType("income")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              type === "income"
                ? "bg-green-500 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
             รายรับ
          </button>
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              type === "expense"
                ? "bg-red-500 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
             รายจ่าย
          </button>
        </div>

        {/* Badge บอกประเภท */}
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            type === "income"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              type === "income" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {type === "income"
            ? "บันทึกเป็นรายรับ — ยอดจะถูกบวก (+) เข้าบัญชี"
            : "บันทึกเป็นรายจ่าย — ยอดจะถูกหัก (−) ออกจากบัญชี"}
        </div>

        {/* hidden input ส่งค่า type ไปให้ actions.ts */}
        <input type="hidden" name="type" value={type} />

        {/* ===== Amount ===== */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            จำนวนเงิน
          </label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
              type === "income"
                ? "border-gray-200 focus:ring-green-500"
                : "border-gray-200 focus:ring-red-400"
            }`}
            placeholder="เช่น 500"
          />
        </div>

        {/* ===== Category ===== */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            หมวดหมู่
          </label>
          <input
            name="category"
            type="text"
            required
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
              type === "income"
                ? "border-gray-200 focus:ring-green-500"
                : "border-gray-200 focus:ring-red-400"
            }`}
            placeholder="เช่น Food, เงินเดือน"
          />
        </div>

        {/* ===== Name ===== */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            ชื่อรายการ
          </label>
          <input
            name="name"
            type="text"
            required
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
              type === "income"
                ? "border-gray-200 focus:ring-green-500"
                : "border-gray-200 focus:ring-red-400"
            }`}
            placeholder="เช่น ข้าวกะเพรา"
          />
        </div>

        {/* ===== Date ===== */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            วันที่
          </label>
          <input
            name="date"
            type="date"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
              type === "income"
                ? "border-gray-200 focus:ring-green-500"
                : "border-gray-200 focus:ring-red-400"
            }`}
          />
        </div>

        {/* ===== Submit ===== */}
        <button
          type="submit"
          className={`w-full text-white font-semibold py-4 rounded-xl mt-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
            type === "income"
              ? "bg-black hover:bg-gray-800"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {type === "income" ? " บันทึกรายรับ" : " บันทึกรายจ่าย"}
        </button>
      </form>
    </div>
  );
}
