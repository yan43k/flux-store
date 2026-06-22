import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { prisma } from "../../shared/prisma/client.js";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "CUSTOMER" | "ADMIN";
};

const mapUser = (user: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}): AuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  passwordHash: user.passwordHash,
  role: user.role === "ADMIN" ? "ADMIN" : "CUSTOMER",
});

const DEMO_PASSWORD = "FluxStore2026!";
const demoPasswordHash = bcrypt.hashSync(DEMO_PASSWORD, 12);

const mockUsers: AuthUser[] = [
  {
    id: "mock-admin",
    name: "Администратор",
    email: "admin@flux.store",
    passwordHash: demoPasswordHash,
    role: "ADMIN",
  },
  {
    id: "mock-customer",
    name: "Иван Покупатель",
    email: "pokupatel@flux.store",
    passwordHash: demoPasswordHash,
    role: "CUSTOMER",
  },
  {
    id: "mock-test",
    name: "Тестовый пользователь",
    email: "test@flux.store",
    passwordHash: demoPasswordHash,
    role: "CUSTOMER",
  },
];

const useMockAuth = () => process.env.AUTH_MODE === "mock";

export class AuthRepository {
  async findByEmail(email: string) {
    if (useMockAuth()) {
      return mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    return user ? mapUser(user) : null;
  }

  async create(input: Pick<AuthUser, "name" | "email" | "passwordHash">) {
    if (useMockAuth()) {
      const user: AuthUser = {
        id: `mock-${randomUUID()}`,
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        role: "CUSTOMER",
      };

      mockUsers.push(user);
      return user;
    }

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        role: "CUSTOMER",
      },
    });

    return mapUser(user);
  }
}
