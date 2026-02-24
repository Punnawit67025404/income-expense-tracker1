"use server";

import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function addTransaction(formData: FormData) {
  // ดึงค่าจากฟอร์มที่ user กรอก
  const amount = parseFloat(formData.get("amount") as string);
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  
  // แปลงวันที่ (ถ้า user ไม่กรอก เอาวันปัจจุบัน)
  const date = dateStr ? new Date(dateStr) : new Date();

  // ตรวจสอบว่า type (รายรับ/รายจ่าย) เป็นอะไร
  // สมมติ: ถ้าเลือก Expense เราจะคูณ -1 เข้าไปที่ amount ให้เป็นค่าติดลบ
  // แต่ใน UI เรายังไม่มีปุ่มเลือก Type เดี๋ยวผมพาทำแบบง่ายก่อนคือ ใส่ลบเอง หรือ ใส่บวกเอง

  // สั่งบันทึกลง Database
  await prisma.transaction.create({
    data: {
      name,
      amount, // ถ้าใส่ -500 มันก็จะเก็บ -500
      category,
      date,
    },
  });

  // สั่งให้หน้า Dashboard รีเฟรชข้อมูลใหม่
  revalidatePath("/");
  
  // บันทึกเสร็จ เด้งกลับไปหน้าแรก
  redirect("/");
}
// ... (โค้ดเดิม) ...

export async function deleteTransaction(formData: FormData) {
  // ดึง ID ที่ซ่อนอยู่ในปุ่มลบ
  const id = parseInt(formData.get("id") as string);

  // สั่งลบใน Database
  await prisma.transaction.delete({
    where: { id },
  });

  // สั่งรีเฟรชหน้าเว็บทุกหน้าที่มีข้อมูล
  revalidatePath("/");
  revalidatePath("/activity");
  revalidatePath("/edit");
}
// ... (โค้ดเดิม) ...

export async function updateTransaction(formData: FormData) {
  const id = parseInt(formData.get("id") as string); // รับ ID ว่าจะแก้ตัวไหน
  const amount = parseFloat(formData.get("amount") as string);
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  const date = dateStr ? new Date(dateStr) : new Date();

  // สั่ง Update ข้อมูลใน Database
  await prisma.transaction.update({
    where: { id },
    data: {
      name,
      amount,
      category,
      date,
    },
  });

  revalidatePath("/");
  revalidatePath("/edit");
  redirect("/edit"); // แก้เสร็จให้เด้งกลับไปหน้ารายการ Edit
}