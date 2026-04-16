// src/components/TerminosCondiciones.js
import React from 'react';
import '../CSS/terminosCondiciones.css';

const TerminosCondiciones = () => {
  return (
    <main className="terminos-wrapper">
      <section className="terminos-card">
        <h1 className="terminos-title">Términos y Condiciones</h1>
        <p className="terminos-updated">Última actualización: 26 de marzo de 2026</p>

        <div className="terminos-section">
          <h2>1. Aceptación del uso</h2>
          <p>
            Al acceder y utilizar Komuness, aceptas estos términos y condiciones.
            Si no estás de acuerdo con alguno de ellos, debes abstenerte de usar la plataforma.
          </p>
        </div>

        <div className="terminos-section">
          <h2>2. Finalidad de la plataforma</h2>
          <p>
            Komuness es un sistema comunitario para compartir publicaciones, eventos,
            emprendimientos y contenido de valor para la comunidad.
          </p>
        </div>

        <div className="terminos-section">
          <h2>3. Registro y cuentas</h2>
          <p>
            La información proporcionada al crear una cuenta debe ser veraz y actualizada.
            Cada usuario es responsable de mantener la confidencialidad de sus credenciales.
          </p>
        </div>

        <div className="terminos-section">
          <h2>4. Publicaciones y contenido</h2>
          <p>
            El usuario se compromete a publicar contenido respetuoso y legal.
            No se permite contenido ofensivo, engañoso, discriminatorio o que infrinja derechos de terceros.
          </p>
        </div>

        <div className="terminos-section">
          <h2>5. Uso de imágenes y archivos</h2>
          <p>
            Al subir archivos, declaras contar con los derechos o permisos necesarios para su uso.
            Komuness puede moderar o retirar contenido que incumpla estas condiciones.
          </p>
        </div>

        <div className="terminos-section">
          <h2>6. Pagos y funcionalidades premium</h2>
          <p>
            Algunas funcionalidades pueden requerir suscripción o pagos.
            Las condiciones de cobro, renovación y cancelación se mostrarán antes de confirmar cada compra.
          </p>
        </div>

        <div className="terminos-section">
          <h2>7. Privacidad</h2>
          <p>
            La plataforma tratará los datos personales conforme a buenas prácticas de seguridad
            y únicamente para fines operativos del servicio.
          </p>
        </div>

        <div className="terminos-section">
          <h2>8. Limitación de responsabilidad</h2>
          <p>
            Komuness no garantiza disponibilidad ininterrumpida del servicio y no se hace responsable
            por daños derivados del uso indebido de la plataforma por parte de terceros.
          </p>
        </div>

        <div className="terminos-section">
          <h2>9. Cambios en los términos</h2>
          <p>
            Estos términos pueden actualizarse en cualquier momento. Las modificaciones entran en vigencia
            desde su publicación en esta sección.
          </p>
        </div>

        <div className="terminos-section">
          <h2>10. Contacto</h2>
          <p>
            Para consultas relacionadas con estos términos puedes escribir a:
            <a href="mailto:komunesscr@gmail.com" className="terminos-link"> komunesscr@gmail.com</a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default TerminosCondiciones;