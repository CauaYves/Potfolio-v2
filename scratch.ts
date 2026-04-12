import { prisma } from "./lib/prisma";

async function main() {
  const imgs = await prisma.image.findMany();
  console.log('Images count:', imgs.length);
  if(imgs.length > 0) {
    console.log('First image buffer size:', imgs[0].data ? imgs[0].data.length : 'null');
    console.log('First 20 bytes:', imgs[0].data?.subarray(0, 20));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
