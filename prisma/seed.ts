/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient, UserType } from '@prisma/client';
import {
  exampleMenuItems,
  exampleRestaurant,
  exampleTable,
} from './ExampleRestaurant';

const prisma = new PrismaClient();
import exampleUser from '../session.json';

async function main() {
  // Add stuff

  const category = await prisma.categories.create({
    data: {
      title: 'Entree',
    },
  });

  await prisma.restaurant.upsert({
    where: {
      id: 'exampleRestaurant',
    },
    create: {
      id: 'exampleRestaurant',
      name: exampleRestaurant.name,
      previousAvgOrderCount: exampleRestaurant.previousAvgOrderCount,
      newAvgOrderCount: exampleRestaurant.newAvgOrderCount,
      location: {
        connectOrCreate: {
          where: {
            id: 'fakeTown',
            town: 'fakeTown',
          },
          create: {
            id: 'fakeTown',
            town: 'fakeTown',
          },
        },
      },
      menu: {
        create: {
          menuItems: {
            create: [
              {
                title: exampleMenuItems.title,
                availability: exampleMenuItems.availability,
                description: exampleMenuItems.description,
                price: exampleMenuItems.price,
                categoriesId: category.id,
              },
            ],
          },
        },
      },
      tables: {
        create: [
          {
            tableNumber: exampleTable.tableNumber,
          },
        ],
      },
    },
    update: {
      name: exampleRestaurant.name,
    },
  });

  const exampleEmails = [
    'yahdiiel.saldana@gmail.com',
    'yahdiielo@gmail.com',
    'timothy.mendez@upr.edu',
    'tmendezf@asu.edu',
    'luiggi12.lv@gmail.com',
  ];

  for (const email of exampleEmails) {
    const num = Math.floor(Math.random() * 100);
    const formattedNum = ('0' + num).slice(-2);
    await prisma.user.upsert({
      where: {
        name: exampleUser.user.name,
        email: email,
      },
      create: {
        email: email,
        name: exampleUser.user.name,
        role: UserType.EMPLOYEE,
        image: exampleUser.user.image,
        isActive: true,
        restaurants: {
          connect: {
            id: 'exampleRestaurant',
          },
        },
        accounts: {
          create: {
            ...exampleUser.account,
            provider: 'google',
            providerAccountId:
              exampleUser.account.providerAccountId.slice(
                exampleUser.account.providerAccountId.length - 2,
              ) + formattedNum,
          },
        },
      },
      update: {
        email: email,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
