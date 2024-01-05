import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { exit } from 'node:process';

const prisma = new PrismaClient();

async function seed() {
  // users
  await prisma.user.createMany({
    data: [
      { name: 'Test user 1', email: 'testUser1@mail.test' },
      { name: 'Test user 2', email: 'testUser2@mail.test' },
      { name: 'Test user 3', email: 'testUser3@mail.test' },
    ],
    skipDuplicates: true,
  });

  // profiles
  await prisma.profile.createMany({
    data: [
      {
        bio: 'User 1 profile',
        userId: 1,
      },
      {
        bio: 'User 2 profile',
        userId: 2,
      },
      {
        bio: 'User 3 profile',
        userId: 3,
      },
    ],
    skipDuplicates: true,
  });

  // post categories
  await prisma.postCategory.createMany({
    data: [
      { name: 'Computers' },
      { name: 'TV' },
      { name: 'Storage' },
      { name: 'Accessories' },
    ],
    skipDuplicates: true,
  });

  // posts
  await prisma.post.createMany({
    data: [
      {
        authorId: 1,
        content: 'Post 1 text',
        id: String(uuid()),
        categoryId: 1,
        createdAt: '2024-01-05T09:55:47.730Z',
        published: true,
        title: 'Post 1 title',
        updatedAt: '2024-01-05T09:56:26.611Z',
        tags: 'tag 1',
        viewsCount: 0,
      },
      {
        authorId: 2,
        content: 'Post 2 text',
        id: String(uuid()),
        categoryId: 3,
        createdAt: '2024-01-05T09:56:26.611Z',
        published: false,
        title: 'Post 2 title',
        updatedAt: '2024-01-05T09:56:26.611Z',
        tags: 'tag 2,tag 3',
        viewsCount: 0,
      },
    ],
    skipDuplicates: true,
  });
}

seed()
  .catch((error) => {
    console.error(error);
    exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
