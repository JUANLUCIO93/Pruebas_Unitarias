const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: "SUCURSAL",             // Usuario de tu esquema
  password: "ora1234",    // La clave real
  connectString: "localhost:1521/FREEPDB1" // El servicio que vimos en propiedades
};

async function validarUsuario(correo, cedula) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Usamos TRIM en AMBOS lados para asegurar coincidencia exacta
    const sql = `SELECT * FROM EMPLEADO 
                 WHERE TRIM(LOWER(CORREO_EMPLEADO)) = LOWER(:correo) 
                 AND TRIM(CEDULA_EMPLEADO) = :cedula`;
    
    const result = await connection.execute(sql, { 
      correo: correo.trim(), 
      cedula: cedula.trim() 
    });

    console.log("Filas encontradas:", result.rows.length); // Esto te dirá si encontró a Juan
    return result.rows.length > 0; 
  } catch (err) {
    console.error("❌ Error en la consulta:", err);
    return false;
  } finally {
    if (connection) await connection.close();
  }
}

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Verificando en Oracle: ${email}`);

  // Pasamos el email y el password (que será la cédula) a la función
  const esValido = await validarUsuario(email, password);

  if (esValido) {
    res.json({ 
      success: true, 
      message: "Bienvenido al Hotel Real Andino",
      user: email 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: "Cédula o correo no encontrados" 
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor conectado a Oracle y listo para el Hotel");
});