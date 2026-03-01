"use server";
import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTransaction(formData: FormData) {
  // ดึงค่าจากฟอร์มที่ user กรอก
  const rawAmount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as string; // "income" หรือ "expense"
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;

  // แปลงวันที่ (ถ้า user ไม่กรอก เอาวันปัจจุบัน)
  const date = dateStr ? new Date(dateStr) : new Date();

  // ถ้าเป็นรายจ่าย ให้ amount เป็นค่าติดลบ, รายรับเป็นบวก
  const amount = type === "expense" ? -Math.abs(rawAmount) : Math.abs(rawAmount);

  // สั่งบันทึกลง Database
  await prisma.transaction.create({
    data: {
      name,
      amount,
      category,
      date,
    },
  });

  // สั่งให้หน้า Dashboard รีเฟรชข้อมูลใหม่
  revalidatePath("/");

  // บันทึกเสร็จ เด้งกลับไปหน้าแรก
  redirect("/");
}

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

export async function updateTransaction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const rawAmount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as string; // "income" หรือ "expense"
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  const date = dateStr ? new Date(dateStr) : new Date();

  // ถ้าเป็นรายจ่าย ให้ amount เป็นค่าติดลบ, รายรับเป็นบวก
  const amount = type === "expense" ? -Math.abs(rawAmount) : Math.abs(rawAmount);

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
  redirect("/edit");
}