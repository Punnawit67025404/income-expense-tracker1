"use client";
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// กำหนดหน้าตาข้อมูลที่กราฟจะรับ
interface ChartData {
  name: string;   // ชื่อเดือน (Jan, Feb)
  income: number; // รายรับ
  expense: number;// รายจ่าย
}

export default function FinancialChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="income" fill="#6BCB0E" radius={[4, 4, 0, 0]} barSize={20} name="Income" />
          {/* Expense ใส่สีแดง */}
          <Bar dataKey="expense" fill="#FF1F1F" radius={[4, 4, 0, 0]} barSize={20} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}