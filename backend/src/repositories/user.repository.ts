import User from "../models/User.js"

export const createUser = (data: any) => User.create(data)
export const findUserByEmail = (email: string) => User.findOne({ email })
export const findUserById = (id: string) => User.findById(id)
