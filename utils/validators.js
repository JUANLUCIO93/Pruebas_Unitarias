const validateCedula = (cedula) => {
  if (!cedula) return false;
  // Verifica que tenga 10 dígitos y sean solo números
  return cedula.length === 10 && !isNaN(cedula);
};

// Esta línea es la que permite que el test "vea" la función
module.exports = { validateCedula };