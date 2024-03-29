// services/authService.js
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Importa el modelo de usuario

// Función para registrar un nuevo usuario
async function registerUser(firstName, lastName, email, password) {
  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    return newUser;
  } catch (error) {
    throw new Error('Error al registrar al usuario');
  }
}

// Función para iniciar sesión
async function loginUser(email, password) {
  try {
    // Busca el usuario por correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verifica la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
}

module.exports = { registerUser, loginUser };