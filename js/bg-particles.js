const canvasFondo = document.getElementById("bg-canvas");
const ctxFondo = canvasFondo.getContext("2d");

const escalaFondo = Math.min(window.devicePixelRatio || 1, 2);
let anchoFondo = window.innerWidth;
let altoFondo = window.innerHeight;
canvasFondo.width = anchoFondo * escalaFondo;
canvasFondo.height = altoFondo * escalaFondo;
canvasFondo.style.width = anchoFondo + "px";
canvasFondo.style.height = altoFondo + "px";
ctxFondo.setTransform(escalaFondo, 0, 0, escalaFondo, 0, 0);

const coloresFondo = ["#5ddc8f", "#5ddc8f", "#5ddc8f", "#ca6405"];
// 75% de los puntos en verde, 25% en cobre — mismo truco que usa Ben Scott con su paleta

const anchoPantallaFondo = window.innerWidth;
const esMobileFondo = anchoPantallaFondo <= 800;

const numeroDeParticulasFondo = esMobileFondo ? 70 : 150;
const radioMaximoFondo = esMobileFondo ? 1.1 : 1.5;
const opacidadMaximaFondo = esMobileFondo ? 0.5 : 0.6;

const particulasFondo = [];

for (let i = 0; i < numeroDeParticulasFondo; i++) {
    particulasFondo.push({
        x: Math.random() * anchoFondo,
        y: Math.random() * altoFondo,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radio: Math.random() * radioMaximoFondo,
        color: coloresFondo[Math.floor(Math.random() * coloresFondo.length)],
        opacidad: Math.random() * opacidadMaximaFondo + 0.1,
    });
}

function actualizarFondo() {
    particulasFondo.forEach((particula) => {
        particula.x += particula.vx;
        particula.y += particula.vy;

        if (particula.x < 0 || particula.x > anchoFondo) {
            particula.vx = -particula.vx;
        }
        if (particula.y < 0 || particula.y > altoFondo) {
            particula.vy = -particula.vy;
        }
    });
}

function dibujarFondo() {
    ctxFondo.clearRect(0, 0, anchoFondo, altoFondo);

    particulasFondo.forEach((particula) => {
        ctxFondo.globalAlpha = particula.opacidad;
        ctxFondo.fillStyle = particula.color;
        ctxFondo.beginPath();
        ctxFondo.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);
        ctxFondo.fill();
    });

    ctxFondo.globalAlpha = 1;
}

function animarFondo() {
    actualizarFondo();
    dibujarFondo();
    requestAnimationFrame(animarFondo);
}

animarFondo();