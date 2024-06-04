import mongoose from 'mongoose';

// Definición del esquema del usuario
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

// Definición del modelo del usuario
export const UserModel = mongoose.model('User', UserSchema);

// Función para obtener todos los usuarios
export const getUsers = () => UserModel.find().exec();

// Función para obtener un usuario por email
export const getUsersByEmail = (email: string) => UserModel.findOne({ email }).exec();

// Función para obtener un usuario por token de sesión
export const getUsersBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken }).exec();

// Función para obtener un usuario por ID
export const getUserById = (id: string) => UserModel.findById(id).exec();

// Función para crear un usuario
export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());

// Función para eliminar un usuario por ID
export const deleteUserById = (id: string) =>  UserModel.findByIdAndDelete({_id:id });
// Función para actualizar un usuario por ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values).exec();