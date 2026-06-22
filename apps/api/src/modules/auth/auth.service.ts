import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginInput, RegisterInput } from "@flux/shared";
import { AppError } from "../../shared/errors/app-error.js";
import { AuthRepository, type AuthUser } from "./auth.repository.js";

const publicUser = (user: AuthUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export class AuthService {
  constructor(private readonly authRepository = new AuthRepository()) {}

  async register(input: RegisterInput) {
    const existing = await this.authRepository.findByEmail(input.email);

    if (existing) {
      throw new AppError("EMAIL_TAKEN", "Этот email уже занят. Войдите или укажите другой.", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.authRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return this.createSession(user);
  }

  async login(input: LoginInput) {
    const user = await this.authRepository.findByEmail(input.email);

    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new AppError(
        "INVALID_CREDENTIALS",
        "Неверный email или пароль. Проверьте раскладку и Caps Lock.",
        401,
      );
    }

    return this.createSession(user);
  }

  async refresh(refreshToken: string) {
    const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret";

    try {
      const payload = jwt.verify(refreshToken, refreshSecret) as {
        sub: string;
        role: string;
        email: string;
      };
      const user = await this.authRepository.findById(payload.sub);

      if (!user) {
        throw new AppError("UNAUTHORIZED", "Сессия истекла. Войдите снова.", 401);
      }

      return this.createSession(user);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("UNAUTHORIZED", "Сессия истекла. Войдите снова.", 401);
    }
  }

  private createSession(user: AuthUser) {
    const accessSecret = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret";
    const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret";
    const accessTtl = (process.env.JWT_ACCESS_TTL ?? "15m") as jwt.SignOptions["expiresIn"];
    const refreshTtl = (process.env.JWT_REFRESH_TTL ?? "30d") as jwt.SignOptions["expiresIn"];
    const payload = { sub: user.id, role: user.role, email: user.email };

    return {
      user: publicUser(user),
      accessToken: jwt.sign(payload, accessSecret, { expiresIn: accessTtl }),
      refreshToken: jwt.sign(payload, refreshSecret, { expiresIn: refreshTtl }),
    };
  }
}
