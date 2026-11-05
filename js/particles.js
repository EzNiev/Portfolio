const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

const esTactil = window.innerWidth <= 800;
// En pantallas retina el canvas se dibuja más nítido, con tope en 2 para no gastar batería
const escala = Math.min(window.devicePixelRatio || 1, 2);

let ancho = window.innerWidth;
let alto = window.innerHeight;

function ajustarCanvas() {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = ancho * escala;
    canvas.height = alto * escala;
    canvas.style.width = ancho + "px";
    canvas.style.height = alto + "px";
    ctx.setTransform(escala, 0, 0, escala, 0, 0);
}
ajustarCanvas();

let numeroDeParticulas;
let distanciaMaxima;
let radioMouse;
let radioBase;
let opacidadMaxima;
let opacidadReposo;
let radioLuz;

if (!esTactil) {
    // Desktop: efecto completo con el mouse
    numeroDeParticulas = 300;
    distanciaMaxima = 100;
    radioMouse = 320;
    radioBase = 1.3;
    opacidadMaxima = 0.95;
    opacidadReposo = 0.04;
    radioLuz = 450;
} else {
    // Celular: las partículas flotan solas y el dedo hace de "mouse" mientras toca la pantalla
    numeroDeParticulas = 90;
    distanciaMaxima = 90;
    radioMouse = 170;
    radioBase = 1.1;
    opacidadMaxima = 0.9;
    opacidadReposo = 0.4;
    radioLuz = 220;
}

const particulas = [];

for (let i = 0; i < numeroDeParticulas; i++) {
    particulas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * (esTactil ? 0.5 : 0.8),
        vy: (Math.random() - 0.5) * (esTactil ? 0.5 : 0.8),
        radio: radioBase,
    });
}

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

// Qué tanto se nota el efecto del puntero: en desktop siempre 1, en celular sube al tocar y baja al soltar
let influencia = esTactil ? 0 : 1;
let tocando = false;

window.addEventListener("mousemove", (evento) => {
    if (esTactil) return;
    mouse.x = evento.clientX;
    mouse.y = evento.clientY;
});

function moverDedo(evento) {
    const toque = evento.touches[0];
    if (!toque) return;
    mouse.x = toque.clientX;
    mouse.y = toque.clientY;
    tocando = true;
}

window.addEventListener("touchstart", moverDedo, { passive: true });
window.addEventListener("touchmove", moverDedo, { passive: true });
window.addEventListener("touchend", () => { tocando = false; }, { passive: true });
window.addEventListener("touchcancel", () => { tocando = false; }, { passive: true });

window.addEventListener("resize", () => {
    // En celular el resize salta al esconder la barra del navegador; solo reajustamos si cambió el ancho
    if (esTactil && window.innerWidth === ancho) return;
    ajustarCanvas();
});

// Si la pestaña no se ve, se pausa la animación para ahorrar batería
let animando = true;
document.addEventListener("visibilitychange", () => {
    animando = !document.hidden;
    if (animando) animar();
});

function actualizar() {
    if (esTactil) {
        influencia += ((tocando ? 1 : 0) - influencia) * 0.08;
    }

    particulas.forEach((particula) => {
        particula.x += particula.vx;
        particula.y += particula.vy;

        if (particula.x < 0 || particula.x > ancho) {
            particula.vx = -particula.vx;
        }
        if (particula.y < 0 || particula.y > alto) {
            particula.vy = -particula.vy;
        }
    });
}

function dibujar() {
    ctx.clearRect(0, 0, ancho, alto);

    particulas.forEach((particula) => {
        let opacidad = opacidadReposo;

        if (!esTactil || influencia > 0.01) {
            const dx = particula.x - mouse.x;
            const dy = particula.y - mouse.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            let cerca = 1 - distancia / radioLuz;
            if (cerca < 0.04) cerca = 0.04;
            if (cerca > opacidadMaxima) cerca = opacidadMaxima;

            opacidad = esTactil ? opacidadReposo + (cerca - opacidadReposo) * influencia : cerca;
            if (opacidad < opacidadReposo && esTactil) opacidad = opacidadReposo;
        }

        ctx.fillStyle = `rgba(93, 220, 143, ${opacidad})`;
        ctx.beginPath();
        ctx.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);
        ctx.fill();
    });
}

function dibujarLineas() {
    if (esTactil && influencia < 0.02) return;

    for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
            const a = particulas[i];
            const b = particulas[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < distanciaMaxima) {
                const distMouseA = Math.sqrt((a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2);
                const distMouseB = Math.sqrt((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2);

                if (distMouseA < radioMouse && distMouseB < radioMouse) {
                    const distanciaPromedio = (distMouseA + distMouseB) / 2;
                    let opacidadLinea = 1 - distanciaPromedio / radioMouse;
                    opacidadLinea *= 0.7;
                    if (esTactil) opacidadLinea *= influencia;

                    ctx.strokeStyle = `rgba(93, 220, 143, ${opacidadLinea})`;
                    ctx.lineWidth = 0.4;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
    }
}

function animar() {
    if (!animando) return;
    actualizar();
    dibujar();
    dibujarLineas();
    requestAnimationFrame(animar);
}

animar();
