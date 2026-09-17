import type { FastifyInstance } from "fastify";
import {
  randomBytes,
  randomInt,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

type Meeting = {
  id: string;
  name: string;
  code: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

const meetings = new Map<string, Meeting>();

const CODE_CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const PASSWORD_CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

function generateCode(length = 8): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    result +=
      CODE_CHARACTERS[
        randomInt(CODE_CHARACTERS.length)
      ];
  }

  return result;
}

function generatePassword(length = 10): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    result +=
      PASSWORD_CHARACTERS[
        randomInt(PASSWORD_CHARACTERS.length)
      ];
  }

  return result;
}

function hashPassword(
  password: string,
  salt: string
): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(
  password: string,
  passwordHash: string,
  salt: string
): boolean {
  const hash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(
    passwordHash,
    "hex"
  );

  if (hash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(hash, storedHash);
}

function generateUniqueCode(): string {
  let code = "";

  do {
    code = generateCode();
  } while (meetings.has(code));

  return code;
}

export async function meetingRoutes(
  fastify: FastifyInstance
): Promise<void> {
  /*
   * CREATE MEETING
   * POST /meetings/create
   */
  fastify.post<{
    Body: {
      name?: string;
    };
  }>("/meetings/create", async (request, reply) => {
    try {
      const name =
        typeof request.body?.name === "string"
          ? request.body.name.trim()
          : "";

      if (!name) {
        return reply.status(400).send({
          success: false,
          message: "Meeting name is required.",
        });
      }

      if (name.length < 2) {
        return reply.status(400).send({
          success: false,
          message:
            "Meeting name must contain at least 2 characters.",
        });
      }

      if (name.length > 100) {
        return reply.status(400).send({
          success: false,
          message:
            "Meeting name cannot exceed 100 characters.",
        });
      }

      const code = generateUniqueCode();
      const password = generatePassword();

      const passwordSalt =
        randomBytes(16).toString("hex");

      const passwordHash = hashPassword(
        password,
        passwordSalt
      );

      const meeting: Meeting = {
        id: randomBytes(16).toString("hex"),
        name,
        code,
        passwordHash,
        passwordSalt,
        createdAt: new Date().toISOString(),
      };

      meetings.set(code, meeting);

      return reply.status(201).send({
        success: true,
        meeting: {
          id: meeting.id,
          name: meeting.name,
          code: meeting.code,
          password,
          createdAt: meeting.createdAt,
        },
      });
    } catch (error) {
      fastify.log.error(error);

      return reply.status(500).send({
        success: false,
        message: "Unable to create meeting.",
      });
    }
  });

  /*
   * JOIN MEETING
   * POST /meetings/join
   *
   * Requires:
   * {
   *   code: "D2MC7WQ3",
   *   password: "kHfov9wmqd"
   * }
   */
  fastify.post<{
    Body: {
      code?: string;
      password?: string;
    };
  }>("/meetings/join", async (request, reply) => {
    try {
      const code =
        typeof request.body?.code === "string"
          ? request.body.code
              .trim()
              .toUpperCase()
          : "";

      const password =
        typeof request.body?.password === "string"
          ? request.body.password
          : "";

      if (!code) {
        return reply.status(400).send({
          success: false,
          message: "Meeting code is required.",
        });
      }

      if (!password) {
        return reply.status(400).send({
          success: false,
          message: "Meeting password is required.",
        });
      }

      const meeting = meetings.get(code);

      if (!meeting) {
        return reply.status(404).send({
          success: false,
          message: "Meeting not found.",
        });
      }

      const validPassword = verifyPassword(
        password,
        meeting.passwordHash,
        meeting.passwordSalt
      );

      if (!validPassword) {
        return reply.status(401).send({
          success: false,
          message: "Incorrect meeting password.",
        });
      }

      return reply.status(200).send({
        success: true,
        meeting: {
          id: meeting.id,
          name: meeting.name,
          code: meeting.code,
        },
      });
    } catch (error) {
      fastify.log.error(error);

      return reply.status(500).send({
        success: false,
        message: "Unable to join meeting.",
      });
    }
  });

  /*
   * GET MEETING
   * GET /meetings/:code
   */
  fastify.get<{
    Params: {
      code: string;
    };
  }>("/meetings/:code", async (request, reply) => {
    const code = request.params.code
      .trim()
      .toUpperCase();

    const meeting = meetings.get(code);

    if (!meeting) {
      return reply.status(404).send({
        success: false,
        message: "Meeting not found.",
      });
    }

    return reply.status(200).send({
      success: true,
      meeting: {
        id: meeting.id,
        name: meeting.name,
        code: meeting.code,
        createdAt: meeting.createdAt,
      },
    });
  });
}