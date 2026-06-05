// src/pages/api/contacto.js
export const prerender = false; // <-- ESTA ES LA LÍNEA MÁGICA QUE FALTABA

import nodemailer from 'nodemailer';

export const POST = async ({ request }) => {
    try {
        const data = await request.formData();
        const nombre = data.get('nombre');
        const email = data.get('email');
        const mensaje = data.get('mensaje');

        if (!nombre || !email || !mensaje) {
            return new Response(JSON.stringify({ error: "Todos los campos son obligatorios." }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: import.meta.env.EMAIL_USER,
                pass: import.meta.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: import.meta.env.EMAIL_USER,
            to: import.meta.env.EMAIL_USER, 
            subject: `Nuevo mensaje de tu portafolio de: ${nombre}`,
            text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: "¡Mensaje enviado correctamente!" }), { status: 200 });

    } catch (error) {
        console.error("Error al enviar:", error);
        return new Response(JSON.stringify({ error: "Hubo un problema. Intenta más tarde." }), { status: 500 });
    }
};