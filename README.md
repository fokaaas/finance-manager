# Finance Manager

This application is powerful and scalable REST API for finance management.

Check out **Swagger Documentation**: https://finance-manager-d7x9.onrender.com/api

**Image**: https://hub.docker.com/r/stbasarab/finance-manager

**Tech Stack**:
- NestJS
- PostgreSQL
- Prisma ORM
- JWT
- Passport.js
- Docker
- Swagger

## How to set up it locally?

Firstly, clone this repo:

```bash
git clone https://github.com/fokaaas/finance-manager.git
```

Then install **pnpm** globally:

```bash
npm install -g pnpm
```

Install dependencies in project directory:

```bash
pnpm install
```

Create .env file with environment variables, that has this structure:

```dotenv
DATABASE_URL=
PORT=
```

Apply schema to your database:

```bash
pnpm prisma migrate
```

Run application:

```bash
pnpm start:dev
```

## Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PaymentType {
  INCOME
  EXPENSE
}

model Payment {
  id          String      @id @default(uuid())
  type        PaymentType
  amount      Float
  description String
  category    Category?   @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  categoryId  String?     @map("category_id")
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  @@map("payments")
}

model Category {
  id          String    @id @default(uuid())
  name        String
  description String?
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  payments    Payment[]

  @@map("categories")
}
```

## Dockerization

Check out **Dockerfile** with docker-compose to create image.