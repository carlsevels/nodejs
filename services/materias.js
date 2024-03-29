const { Materias } = require('../models'); // Importa el modelo de usuario


// Función para encontrar materias
async function getMaterias() {
    try {
      // Busca materias
      const materias = await Materias.findAll();
      // const materaList =  materias.forEach(materia => {
      //   return materia.toJSON();
      // });
      return materias;
    } catch (error) {
      throw new Error('Error al encotrar materias');
    }
  }

  // Función para encontrar detalles de materia
async function getOneMaterias(id) {
  try {
    // Busca materias
    const materiasOne = await Materias.findOne({where: {id}});
    // const materaList =  materias.forEach(materia => {
    //   return materia.toJSON();
    // });
    return materiasOne;
  } catch (error) {
    throw new Error('Error al encotrar materias');
  }
}


  //Crear una materia
  async function createMaterias(nombre, hora, grupo) {
    try {  
      // Crea un nuevo usuario en la base de datos
      const newMateria = await Materias.create({
        nombre,
        hora,
        grupo,
      });
  
      return newMateria;
    } catch (error) {
      throw new Error('Error al registrar materia');
    }
  }

    //Eliminar una materia
    async function deleteMaterias(id) {
      try {  
        // Crea un nuevo usuario en la base de datos
        const deleteMateria = await Materias.destroy({where: {id}});
        return deleteMateria;
      } catch (error) {
        throw new Error('Error al registrar materia');
      }
    }

   //Edit una materia
   async function editMaterias(id, nombre, hora, grupo) {
    try {  
      // Busca la materia por su ID
      const materia  = await Materias.findByPk(id);

      // Si la materia no existe, lanza un error
      if (!materia) {
        throw new Error('Materia no encontrada');
      }

      await materia.update({ nombre, hora, grupo });

      return materia;
    } catch (error) {
      throw new Error('Error al editar materia');
    }
  }

  module.exports = { getMaterias, createMaterias, getOneMaterias, deleteMaterias, editMaterias };