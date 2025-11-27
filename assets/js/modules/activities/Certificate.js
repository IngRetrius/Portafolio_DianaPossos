/**
 * CERTIFICATE.JS
 * Generador de certificado de logro con Canvas API
 *
 * @module activities/Certificate
 */

import { ActivityBase } from './ActivityBase.js';

/**
 * Certificate - Generador de certificado descargable
 *
 * @class Certificate
 * @extends ActivityBase
 */
export class Certificate extends ActivityBase {
    /**
     * Constructor de Certificate
     * @param {Object} config - Configuración
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.userName = '';
        this.canvas = null;
        this.ctx = null;
    }

    getHTML() {
        return `
            <div class="certificate">
                <div class="certificate__intro">
                    <div class="certificate__intro-icon">🎓</div>
                    <h2>¡Felicitaciones!</h2>
                    <p class="certificate__intro-text">
                        Has completado exitosamente el Proyecto Wordwall de
                        Fortalecimiento de Memoria a Corto Plazo.
                    </p>
                    <p class="certificate__intro-text">
                        Genera tu certificado personalizado de logro:
                    </p>

                    <form class="certificate__form" id="certificate-form">
                        <div class="certificate__form-group">
                            <label for="student-name">Ingresa tu nombre completo:</label>
                            <input type="text"
                                   id="student-name"
                                   class="certificate__input"
                                   placeholder="Ej: María García López"
                                   required
                                   autocomplete="name">
                        </div>
                        <button type="submit" class="btn btn--primary btn--large">
                            Generar Certificado
                        </button>
                    </form>
                </div>

                <div class="certificate__preview" style="display: none;">
                    <h3>Tu Certificado</h3>
                    <canvas id="certificate-canvas" width="1200" height="800"></canvas>

                    <div class="certificate__actions">
                        <button class="btn btn--primary" data-action="download-png">
                            📥 Descargar PNG
                        </button>
                        <button class="btn btn--secondary" data-action="new">
                            🔄 Generar Otro
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const form = this.container.querySelector('#certificate-form');
        const downloadPngBtn = this.container.querySelector('[data-action="download-png"]');
        const newBtn = this.container.querySelector('[data-action="new"]');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = this.container.querySelector('#student-name');
                if (nameInput && nameInput.value.trim()) {
                    this.userName = nameInput.value.trim();
                    this.generateCertificate();
                }
            });
        }

        if (downloadPngBtn) {
            downloadPngBtn.addEventListener('click', () => this.downloadPNG());
        }

        if (newBtn) {
            newBtn.addEventListener('click', () => {
                const intro = this.container.querySelector('.certificate__intro');
                const preview = this.container.querySelector('.certificate__preview');
                if (intro && preview) {
                    intro.style.display = 'block';
                    preview.style.display = 'none';
                }
                const nameInput = this.container.querySelector('#student-name');
                if (nameInput) {
                    nameInput.value = '';
                }
            });
        }
    }

    generateCertificate() {
        const intro = this.container.querySelector('.certificate__intro');
        const preview = this.container.querySelector('.certificate__preview');

        if (intro && preview) {
            intro.style.display = 'none';
            preview.style.display = 'block';
        }

        this.canvas = this.container.querySelector('#certificate-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        // Fondo
        this.drawBackground();

        // Borde decorativo
        this.drawBorder();

        // Contenido
        this.drawContent();

        // Marcar como completado
        setTimeout(() => this.complete(), 500);
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 1200, 800);
        gradient.addColorStop(0, '#f5f5f5');
        gradient.addColorStop(1, '#e0e0e0');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 1200, 800);

        // Patrón de fondo sutil
        this.ctx.globalAlpha = 0.05;
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1200;
            const y = Math.random() * 800;
            const size = Math.random() * 100 + 50;

            this.ctx.fillStyle = '#2196f3';
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }

    drawBorder() {
        // Borde externo
        this.ctx.strokeStyle = '#2196f3';
        this.ctx.lineWidth = 20;
        this.ctx.strokeRect(30, 30, 1140, 740);

        // Borde interno
        this.ctx.strokeStyle = '#ffc107';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(50, 50, 1100, 700);

        // Decoración en esquinas
        this.drawCornerDecoration(60, 60, 0);
        this.drawCornerDecoration(1140, 60, Math.PI / 2);
        this.drawCornerDecoration(1140, 740, Math.PI);
        this.drawCornerDecoration(60, 740, (Math.PI * 3) / 2);
    }

    drawCornerDecoration(x, y, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);

        this.ctx.fillStyle = '#ffc107';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(40, 0);
        this.ctx.lineTo(0, 40);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    drawContent() {
        const centerX = 600;

        // Título principal
        this.ctx.font = 'bold 72px Georgia, serif';
        this.ctx.fillStyle = '#2196f3';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CERTIFICADO DE LOGRO', centerX, 150);

        // Subtítulo
        this.ctx.font = '32px Georgia, serif';
        this.ctx.fillStyle = '#666';
        this.ctx.fillText('Proyecto Wordwall', centerX, 200);

        // Línea decorativa
        this.ctx.strokeStyle = '#ffc107';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(300, 230);
        this.ctx.lineTo(900, 230);
        this.ctx.stroke();

        // Texto "Se otorga a"
        this.ctx.font = '28px Georgia, serif';
        this.ctx.fillStyle = '#333';
        this.ctx.fillText('Se otorga el presente certificado a', centerX, 290);

        // Nombre del estudiante
        this.ctx.font = 'bold 56px Georgia, serif';
        this.ctx.fillStyle = '#2196f3';
        this.ctx.fillText(this.userName, centerX, 370);

        // Línea bajo el nombre
        this.ctx.strokeStyle = '#2196f3';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(250, 390);
        this.ctx.lineTo(950, 390);
        this.ctx.stroke();

        // Texto de reconocimiento
        this.ctx.font = '26px Georgia, serif';
        this.ctx.fillStyle = '#333';
        this.ctx.fillText('Por completar exitosamente el programa de', centerX, 450);
        this.ctx.fillText('Fortalecimiento de Memoria a Corto Plazo', centerX, 490);
        this.ctx.fillText('mediante actividades interactivas', centerX, 530);

        // Fecha
        const today = new Date();
        const dateStr = today.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        this.ctx.font = '24px Georgia, serif';
        this.ctx.fillStyle = '#666';
        this.ctx.fillText(`Fecha: ${dateStr}`, centerX, 600);

        // Firma (decorativa)
        this.ctx.font = 'italic 32px Georgia, serif';
        this.ctx.fillStyle = '#2196f3';
        this.ctx.fillText('Diana Rocío Possos Beltrán', centerX, 680);

        this.ctx.font = '20px Georgia, serif';
        this.ctx.fillStyle = '#666';
        this.ctx.fillText('Universidad de Cartagena', centerX, 710);
        this.ctx.fillText('Maestría en Recursos Digitales Aplicados a la Educación', centerX, 740);

        // Sello decorativo
        this.drawSeal(950, 650);
    }

    drawSeal(x, y) {
        // Círculo exterior
        this.ctx.strokeStyle = '#2196f3';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 60, 0, Math.PI * 2);
        this.ctx.stroke();

        // Círculo interior
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 50, 0, Math.PI * 2);
        this.ctx.stroke();

        // Texto en el sello
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillStyle = '#2196f3';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('WORDWALL', x, y - 10);

        this.ctx.font = '16px Arial';
        this.ctx.fillText('2025', x, y + 10);

        // Estrella en el centro
        this.ctx.fillStyle = '#ffc107';
        this.ctx.font = '28px Arial';
        this.ctx.fillText('★', x, y + 30);
    }

    downloadPNG() {
        if (!this.canvas) return;

        const link = document.createElement('a');
        const fileName = `certificado-${this.userName.replace(/\s+/g, '-').toLowerCase()}.png`;

        link.download = fileName;
        link.href = this.canvas.toDataURL('image/png');
        link.click();

        this.showFeedback(true, '¡Certificado descargado exitosamente!');
    }

    reset() {
        this.userName = '';
        this.isCompleted = false;
        this.render();
    }
}
