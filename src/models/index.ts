import { initDB } from "./init"

export * from "./user"
export * from "./project"

export const dbconnection = initDB()
