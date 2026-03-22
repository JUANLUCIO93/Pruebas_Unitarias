// __tests__/integracion.test.js
const { validateCedula } = require('../utils/validators');

describe('Actividad B: Pruebas de Integración - Hotel Real Andino', () => {
  
  test('Debe integrar la lógica de validación con el flujo de inicio de sesión', () => {
    // Simulamos el valor capturado por el componente TextInput de la cédula
    const valorDeInput = '1501085094'; 
    
    // Integramos con la función de validación del sistema
    const esValido = validateCedula(valorDeInput);

    // Si es válido, la integración permite disparar la alerta de "Éxito"
    expect(esValido).toBe(true);
  });
});