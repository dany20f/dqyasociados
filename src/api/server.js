require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa Resend con la clave API desde las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// Middlewares
app.use(cors());
app.use(express.json()); // Para manejar solicitudes con JSON
app.use(express.urlencoded({ extended: true })); // Para manejar solicitudes con formularios (URL-encoded)

// Ruta para enviar el formulario de correo
app.post('/enviar-correo', async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    // Validar los campos obligatorios
    if (!nombre || !email || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados.' });
    }

    try {
        // Enviar el correo electrónico usando Resend
        const { data, error } = await resend.emails.send({
            from: 'DQ & Asociados <onboarding@resend.dev>',
            to: 'danielwfq@gmail.com', // Cambia este correo al destinatario deseado
            subject: `Formulario Web - ${asunto}`,
            html: `
                <h1>Nuevo mensaje de contacto</h1>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
        });

        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'Hubo un error al enviar el correo.' });
        }

        res.status(200).json({ message: 'El correo se envió correctamente.', data });
    } catch (err) {
        console.error('Error inesperado:', err);
        res.status(500).json({ error: 'Hubo un error en el servidor al enviar el correo.' });
    }
});

// Configuración de la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Ruta para cargar el archivo index.html
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
    res.sendFile(indexPath);
});
// Manejar solicitudes con cuerpo JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Manejar solicitudes URL-encoded (formularios)
app.use(express.json()); // Manejar solicitudes con JSON

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
