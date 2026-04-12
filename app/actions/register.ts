"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRegister(formData: FormData) {
  try {
    const period = formData.get("period") as string | null;
    const description = formData.get("description") as string | null;
    const files = formData.getAll("images") as File[];
    
    console.log("Arquivos recebidos pelo form:", files.length, files.map(f => f.name + ' - ' + f.size));

    const validFiles = files.filter((f) => f.size > 0);
    console.log("Arquivos válidos para upload:", validFiles.length);

    const imagesData = await Promise.all(
      validFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return { data: buffer };
      })
    );

    await prisma.register.create({
      data: {
        period: period || undefined,
        description: description || undefined,
        images: {
          create: imagesData
        }
      }
    });

    revalidatePath("/registro");
    revalidatePath("/");

    return { 
      success: true, 
      message: "Registro inserido com sucesso!"
    };
  } catch (error) {
    console.error("Erro ao criar registro:", error);
    return { success: false, message: "Ocorreu um erro ao cadastrar o registro." };
  }
}

export async function getRegisters() {
  try {
    const registers = await prisma.register.findMany({
      orderBy: { id: 'desc' },
      include: {
        images: true,
      }
    });

    // Precisamos converter os Buffers para base64 para que o React Client consiga renderizar nas tags <img> do HTML.
    const registersWithImages = registers.map((reg) => ({
      ...reg,
      images: reg.images.map((img) => {
        if (!img.data) return { ...img, data: null };
        const base64 = Buffer.from(img.data).toString('base64');
        return { ...img, data: `data:image/png;base64,${base64}` };
      }),
    }));

    return registersWithImages;
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return [];
  }
}

