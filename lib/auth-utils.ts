import { hash, compare } from "bcryptjs"
import { promises as fs } from "fs"
import { join } from "path"

const SALT_ROUNDS = 12

// Function to get the correct data directory path
function getDataDirPath(): string {
  // Try different possible paths for the data directory
  const possiblePaths = [
    join(process.cwd(), "data"),
    "/app/data",
  ]

  for (const path of possiblePaths) {
    try {
      // Check if directory exists
      fs.accessSync(path)
      return path
    } catch (e) {
      continue
    }
  }

  // If no existing directory found, return default path
  return possiblePaths[0]
}

// Function to get the correct data file path
function getDataFilePath(): string {
  return join(getDataDirPath(), "complaints-data.json")
}

// Function to get the password file path
function getPasswordFilePath(): string {
  return join(getDataDirPath(), "admin-password.json")
}

async function readDataFile() {
  try {
    const dataFile = getDataFilePath()
    const data = await fs.readFile(dataFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading data file:", error)
    // Return a default structure if file doesn't exist or is invalid
    return { categories: [], complaints: [], updatedAt: Date.now() }
  }
}

async function writeDataFile(data: any) {
  try {
    const dataFile = getDataFilePath()
    // Ensure the data directory exists
    const dataDir = getDataDirPath()
    await fs.mkdir(dataDir, { recursive: true })
    
    // Write file with proper formatting
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8")
    console.log("[v0] Data file updated successfully")
  } catch (error) {
    console.error("Error writing data file:", error)
    throw error
  }
}

async function readPasswordFile(): Promise<{ passwordHash: string; updatedAt: number }> {
  try {
    const passwordFile = getPasswordFilePath()
    const data = await fs.readFile(passwordFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log("[v0] Password file not found or invalid, using default")
    // Return default password hash for "admin123" if file doesn't exist
    return { 
      passwordHash: await hash("admin123", SALT_ROUNDS),
      updatedAt: Date.now()
    }
  }
}

async function writePasswordFile(data: { passwordHash: string; updatedAt: number }): Promise<void> {
  try {
    const passwordFile = getPasswordFilePath()
    const dataDir = getDataDirPath()
    
    // Ensure the data directory exists
    await fs.mkdir(dataDir, { recursive: true })
    
    // Write file with proper formatting
    await fs.writeFile(passwordFile, JSON.stringify(data, null, 2), "utf-8")
    console.log("[v0] Password file updated successfully")
  } catch (error) {
    console.error("Error writing password file:", error)
    throw error
  }
}

export async function hashPassword(password: string): Promise<string> {
  const hashed = await hash(password, SALT_ROUNDS)
  console.log("[v0] Password hashed, length:", hashed.length)
  return hashed
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  console.log("[v0] Verifying password, hash length:", hashedPassword?.length || 0)
  return await compare(password, hashedPassword)
}

export async function getAdminPasswordHash(): Promise<string> {
  try {
    const data = await readPasswordFile()
    console.log("[v0] Loaded password hash from file, length:", data.passwordHash.length)
    return data.passwordHash
  } catch (error) {
    console.error("Error getting admin password hash:", error)
    // Fallback to default password
    return await hash("admin123", SALT_ROUNDS)
  }
}

export async function setAdminPasswordHash(newHash: string): Promise<void> {
  console.log("[v0] Setting admin password hash, length:", newHash.length)
  try {
    const data = {
      passwordHash: newHash,
      updatedAt: Date.now()
    }
    await writePasswordFile(data)
    console.log("[v0] Password hash set successfully in file")
  } catch (error) {
    console.error("Error setting admin password hash:", error)
    throw error
  }
}
