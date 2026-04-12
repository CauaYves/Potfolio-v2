import { prisma } from "./lib/prisma";

async function main() {
  await prisma.register.createMany({
    data: [
      {
        period: "2024 - 2025",
        description: "Trabalhei como líder técnico de desenvolvimento frontend na construção do novo Portal para os clubes e parques do Brasil. Alguns clientes finais foram: Flamengo, Palmeiras e Aldeia das águas."
      },
      {
        period: "Early 2023",
        description: "Desenvolvimento e integração de novos sistemas no núcleo Multiclubes. Implementação de lógicas complexas e layouts arrojados."
      },
      {
        period: "2022",
        description: "Estudos intensivos de Typescript, React e introdução aos bancos de dados relacionais."
      }
    ]
  });
  console.log("Seed concluída");
}

main().catch(console.error).finally(() => prisma.$disconnect());
