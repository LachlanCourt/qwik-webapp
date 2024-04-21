const PrismaClient = require("@prisma/client").PrismaClient;
const fs = require("fs");
const crypto = require("crypto");

const insertGlobalAdmin = async () => {
  // Parse env variables
  fs.readFileSync(".env", "utf8")
    .split("\n")
    .forEach((envVar) => {
      const [key, value] = envVar.split("=");
      process.env[key] = value;
    });

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  const salt = crypto.randomUUID().replace(/-/g, "");

  const hashedPassword = Buffer.from(
    crypto.createHash("sha256").update(`${salt}${password}`).digest("hex")
  ).toString();

  const savePassword = `${salt}$${hashedPassword}`;

  const client = new PrismaClient();

  console.log(email);

  await client.$executeRaw`
  INSERT INTO "User" (
    "email", 
    "name", 
    "password", 
    "isGlobalAdmin"
  )
  SELECT ${email}, ${name}, ${savePassword}, 'true'
  WHERE NOT EXISTS (
      SELECT 1 
      FROM "User" 
      WHERE "email" = ${email}
  );`;

  await client.$disconnect();
};

insertGlobalAdmin()
  .then(() => {
    console.log("Global admin inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting global admin user:", error);
  });
