const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
export const adminSeed = async () => {
  try {
    await db.user.create({
      data: {
        email: 'admin4sda@.com',
        password: 'admin1234',
      }
    })
    console.log('Admin seeded successfully')
  } catch (error) {
    console.error("Error seeding", error);
  } finally {
    await db.$disconnect();
  }
}

adminSeed();