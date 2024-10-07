/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import {
  exampleMenuItems,
  exampleRestaurant,
  exampleTable,
} from './ExampleRestaurant';

const prisma = new PrismaClient();

async function main() {
  // Add stuff

  const category = await prisma.categories.create({
    data: {
      title: 'Entree',
    },
  });

  await prisma.restaurant.upsert({
    where: {
      name: exampleRestaurant.name,
      id: 'exampleRestaurant',
    },
    create: {
      name: exampleRestaurant.name,
      previousAvgOrderCount: exampleRestaurant.previousAvgOrderCount,
      newAvgOrderCount: exampleRestaurant.newAvgOrderCount,
      location: {
        create: {
          id: 'fakeTown',
          town: 'fakeTown',
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
