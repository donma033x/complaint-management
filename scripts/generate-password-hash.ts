import { hash } from "bcryptjs"

async function generateHash() {
  const password = "admin123"
  const hashedPassword = await hash(password, 12)
  console.log("Password:", password)
  console.log("Bcrypt Hash:", hashedPassword)
  console.log("\nCopy this hash to app/api/auth/login/route.ts")
}

generateHash()
