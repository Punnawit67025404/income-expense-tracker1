import prisma from "./lib/prisma";
import Link from "next/link";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import FinancialChart from "./components/FinancialChart"; // อย่าลืม import เข้ามา!

const formatMoney = (amount: number) => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default async function Home() {
  // 1. ดึงข้อมูลทั้งหมด
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });

  // --- ส่วนคำนวณตัวเลขรวม ---
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expense;

  // --- ส่วนเตรียมข้อมูลกราฟ (Group by Month) ---
  // สร้างตาราง 6 เดือนย้อนหลังรอไว้ก่อน (จะได้มีกราฟโชว์แม้ไม่มีข้อมูล)
  const chartDataMap = new Map();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthName = d.toLocaleString('default', { month: 'short' }); // Jan, Feb
    chartDataMap.set(monthName, { name: monthName, income: 0, expense: 0 });
  }

  // วนลูปเอาข้อมูลจริงไปหยอดใส่แต่ละเดือน
  transactions.forEach((t) => {
    const monthName = t.date.toLocaleString('default', { month: 'short' });
    if (chartDataMap.has(monthName)) {
      const current = chartDataMap.get(monthName);
      if (t.amount > 0) {
        current.income += t.amount;
      } else {
        // Expense ในกราฟต้องเป็นค่าบวกเพื่อให้แท่งกราฟสูงขึ้น (แต่เป็นสีแดง)
        current.expense += Math.abs(t.amount); 
      }
    }
  });

  // แปลงจาก Map เป็น Array เพื่อส่งให้กราฟ
  const chartData = Array.from(chartDataMap.values());

  // -------------------------------------------

  return (
    <div className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </header>

      {/* Grid Cards (เหมือนเดิม) */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 col-span-3 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <Wallet size={20} />
            <span className="font-medium">Account Balance</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatMoney(balance)} THB</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 col-span-3 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <TrendingUp size={20} />
            <span className="font-medium">Income</span>
          </div>
          <div className="text-3xl font-bold text-green-600">+{formatMoney(income)} THB</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 col-span-3 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4 text-gray-500">
            <TrendingDown size={20} />
            <span className="font-medium">Expense</span>
          </div>
          <div className="text-3xl font-bold text-red-500">{formatMoney(expense)} THB</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* --- ส่วนกราฟ (แก้ไขตรงนี้) --- */}
        <div className="col-span-3 lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
          <h2 className="text-lg font-bold mb-4">Financial Summary</h2>
          <div className="h-[350px] w-full">
            {/* ส่งข้อมูล chartData ที่เราคำนวณไว้เข้าไป */}
            <FinancialChart data={chartData} />
          </div>
        </div>

        {/* ส่วน Recent Transactions (เหมือนเดิม) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 col-span-3 lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Recent Transactions</h2>
            <Link href="/create" className="text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              + Add new
            </Link>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-auto pr-2">
            {transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No transactions yet.</p>
            ) : (
              transactions.map((t) => (
                <div key={t.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold bg-opacity-50" style={{backgroundColor: t.amount > 0 ? '#dcfce7' : '#fee2e2', color: t.amount > 0 ? '#166534' : '#991b1b'}}>
                      {t.category.substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">
                        {t.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-sm ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}{formatMoney(t.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}