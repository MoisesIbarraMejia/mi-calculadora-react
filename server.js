import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import sqlite3 from 'sqlite3'; // 1. Importamos SQLite

const app = express();
app.use(cors());
app.use(express.json());

// 2. Conectamos o creamos el archivo de la Base de Datos
const db = new sqlite3.Database('./calculadora.db', (err) => {
    if (err) console.error("Error al abrir BD:", err.message);
    else console.log("Conectado con éxito a SQLite (calculadora.db)");
});

// 3. Creamos la tabla para el historial si no existe
db.run(`CREATE TABLE IF NOT EXISTS historial (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expresion TEXT,
    resultado TEXT,
    nota TEXT DEFAULT ''
)`);

// [PROCESO PYTHON] - Tu ruta anterior se queda igual
app.post('/api/proceso-python', (req, res) => {
    const { num1, num2 } = req.body;
    const pythonProcess = spawn('python', ['proceso.py', num1, num2]);
    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => { dataToSend += data.toString(); });
    pythonProcess.on('close', () => {
        res.json({ resultado: dataToSend.trim() });
    });
});

// ==========================================
//            RUTAS DEL CRUD
// ==========================================

// A. CREATE: Guardar un nuevo cálculo en la BD
app.post('/api/historial', (req, res) => {
    const { expresion, resultado } = req.body;
    const sql = `INSERT INTO historial (expresion, resultado) VALUES (?, ?)`;
    
    db.run(sql, [expresion, resultado], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, mensaje: "Guardado correctamente" });
    });
});

// B. READ: Obtener todos los registros guardados
app.get('/api/historial', (req, res) => {
    const sql = `SELECT * FROM historial ORDER BY id DESC`;
    
    db.all(sql, [], (err, filas) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// C. UPDATE: Editar una nota o comentario de un cálculo específico
app.put('/api/historial/:id', (req, res) => {
    const { id } = req.params;
    const { nota } = req.body;
    const sql = `UPDATE historial SET nota = ? WHERE id = ?`;
    
    db.run(sql, [nota, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Nota actualizada con éxito", filasModificadas: this.changes });
    });
});

// D. DELETE: Eliminar un cálculo del historial
app.delete('/api/historial/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM historial WHERE id = ?`;
    
    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Registro eliminado", filasBorradas: this.changes });
    });
});

app.listen(3000, () => {
    console.log('Servidor con CRUD corriendo en http://localhost:3000');
});
