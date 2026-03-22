const { validateCedula } = require('../utils/validators');

describe('Pruebas Unitarias - Hotel Real Andino', () => {
  
  test('debe validar la cédula de Juan Grefa correctamente', () => {
    // Usamos tu número real registrado en Oracle
    const resultado = validateCedula('1501085094'); 
    expect(resultado).toBe(true);
  });

  test('debe rechazar una cédula con menos de 10 dígitos', () => {
    const resultado = validateCedula('123');
    expect(resultado).toBe(false);
  });

});