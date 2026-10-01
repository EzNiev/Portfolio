const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const anchoPantalla = window.innerWidth;

let numeroDeParticulas;
let distanciaMaxima;
let radioMouse;

if (anchoPantalla > 800) {
  // Desktop: efecto completo
  numeroDeParticulas = 300;
  distanciaMaxima = 100;
  radioMouse = 320;
} else {
  // Celular/tablet chica: muchas menos partículas y sin líneas
  // (tampoco hay mouse real, así que el hover no aplica)
  numeroDeParticulas = 60;
  distanciaMaxima = 0;
  radioMouse = 0;
}

const particulas = [];

for (let i = 0; i < numeroDeParticulas; i++) {
    particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radio: 1.3,
    });
}

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

window.addEventListener("mousemove", (evento) => {
    mouse.x = evento.clientX;
    mouse.y = evento.clientY;
});

function actualizar() {
    particulas.forEach((particula) => {
        particula.x += particula.vx;
        particula.y += particula.vy;

        if (particula.x < 0 || particula.x > canvas.width) {
            particula.vx = -particula.vx;
        }
        if (particula.y < 0 || particula.y > canvas.height) {
            particula.vy = -particula.vy;
        }
    });
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((particula) => {
        let opacidad = 1;

        if (mouse.x !== null) {
            const dx = particula.x - mouse.x;
            const dy = particula.y - mouse.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            opacidad = 1 - distancia / 200;
            if (opacidad < 0.1) opacidad = 0.2;
            if (opacidad > 0.6) opacidad = 1;
        }

        ctx.fillStyle = `rgba(93, 220, 143, ${opacidad})`;
        ctx.beginPath();
        ctx.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);
        ctx.fill();
    });
}

function dibujarLineas() {
    for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
            const a = particulas[i];
            const b = particulas[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < distanciaMaxima && mouse.x !== null) {
                const distMouseA = Math.sqrt((a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2);
                const distMouseB = Math.sqrt((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2);

                if (distMouseA < radioMouse && distMouseB < radioMouse) {
                    const distanciaPromedio = (distMouseA + distMouseB) / 2;
                    let opacidadLinea = 1 - distanciaPromedio / radioMouse;
                    opacidadLinea *= 0.4; // tope general: nunca del todo opaca

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
    actualizar();
    dibujar();
    dibujarLineas();
    requestAnimationFrame(animar);
}

animar();