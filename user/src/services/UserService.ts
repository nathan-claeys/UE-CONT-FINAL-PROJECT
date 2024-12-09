import { Repository } from "typeorm";
import {
  User,
  UserCreateDTO,
  LoginCredentials,
  AuthResponse,
} from "../models/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import { HttpError } from "../utils/errors";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async createUser(userData: UserCreateDTO): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      throw new HttpError(
        409,
        "User with this email or username already exists"
      );
    }

    const hashedPassword = await hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
      select: [
        "id",
        "email",
        "password",
        "username",
        "credits",
        "level",
        "experience",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      throw new HttpError(401, "Invalid credentials");
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    const token = sign({ userId: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    return user;
  }

  async updateCredits(userId: string, amount: number): Promise<User> {
    const user = await this.getUserById(userId);
    user.credits += amount;
    return await this.userRepository.save(user);
  }

  async gainExperience(userId: string, amount: number): Promise<User> {
    const user = await this.getUserById(userId);
    user.experience += amount;

    // Level up logic
    const experienceThreshold = user.level * 1000; // Simple level-up threshold
    if (user.experience >= experienceThreshold) {
      user.level += 1;
      user.experience -= experienceThreshold;
      // Could trigger additional rewards or notifications here
    }

    return await this.userRepository.save(user);
  }

  createQueryBuilder() {
    return this.userRepository.createQueryBuilder("user");
  }
}
