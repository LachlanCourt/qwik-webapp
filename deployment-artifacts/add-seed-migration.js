const fs = require("fs");
const crypto = require("crypto");

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

const migrationScript = `
INSERT INTO "User" (
  "email", 
  "name", 
  "password", 
  "isGlobalAdmin"
)
SELECT '${email}', '${name}', '${savePassword}', 'true'
WHERE NOT EXISTS (
    SELECT 1 
    FROM "User" 
    WHERE "email" = '${email}'
);`;

const date = new Date();

const padValue = (value) => value.toString().padStart(2, "0");

const migrationName = `${date.getFullYear()}${padValue(
  date.getMonth()
)}${padValue(date.getDate())}${padValue(date.getHours())}${padValue(
  date.getMinutes()
)}${padValue(date.getSeconds())}_seed_user`;

fs.mkdirSync(`./prisma/migrations/${migrationName}/`);

fs.writeFile(
  `./prisma/migrations/${migrationName}/migration.sql`,
  migrationScript,
  (err) => {
    if (err) console.log(err);
    else {
      console.log(`Migration Created Successfully.`);
    }
  }
);
