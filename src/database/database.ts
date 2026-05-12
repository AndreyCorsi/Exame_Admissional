import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "../../database.db");
const schemaPath = path.resolve(__dirname, "./schema.sql");

const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, "utf-8");
db.exec(schema);

// Migrations — add new nullable columns if they don't exist yet
const migrations = [
  "ALTER TABLE exame_funcionario ADD COLUMN tipo_exame TEXT",
  "ALTER TABLE Alerta ADD COLUMN mensagem TEXT",
];
for (const sql of migrations) {
  try { db.exec(sql); } catch (_) { /* column already exists */ }
}

export default db;