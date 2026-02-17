// Identificar las class necesarias para arkanoid
// Classes: Bloque , pelota, jugador/pala, juego

// Bloque: rect
// Atributos: 

// ancho
// alto
// x
// y
// color
// visible (true/false)
// vidas

// mostrar() -> condiciones con visible
// soltarObjeto() 

// Pelota

//Atributos:
// radio
// x
// y
// color
// vx
// vy

// metodos

// rebote()
// mover()
// mostrar()
// perder()

// Pala/jugador

// Atributos
// ancho
// alto
// x
// y
// velocidad


// metodos:
// mover()
// mostrar()


// Juego
// Atributos:

// Jugador
// Bloques 
// Pelota
// estado (true/false)
// puntuacion
// vidas
// TextoPuntuacion

// Metodos
// EmpezarJuego() -> empezar de 0
// PerderVida() -> reincia pala/bola
// GanarMapa()
// MostrarElemJuego()

class Bloque {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = "white"
        this.visible = true
        this.vida = Math.floor(Math.random() * 5) + 1
    }
    mostrar() {
        if (!this.visible) return
        stroke("black")

        this.actualizarColor()
        rect(this.x, this.y, this.w, this.h)
        noStroke()

    }
    perderVida() {
        this.vida -= 1
        if (this.vida <= 0) {
            this.visible = false
        }

    }
    actualizarColor() {
        switch (this.vida) {
            case 1:
                fill("white")
                break;
            case 2:
                fill("yellow")
                break;
            case 3:
                fill("blue")
                break;
            case 4:
                fill("red")
                break;
            case 5:
                fill("black")
                break;

            default:
                break;
        }
    }
}


class Pelota {
    constructor(x, y, r, sonido) {
        this.x = x
        this.y = y
        this.vx = -7
        this.vy = -5
        this.prevX = x
        this.prevY = y
        this.r = r
        this.color = "red"
        this.visible = true
        this.tiempoReinicio = 0;
        this.activarMovimiento = false;
        this.sonido=sonido
    }
    mostrar() {
        if (!this.visible) return

        stroke("black")
        fill(this.color)
        circle(this.x, this.y, this.r)
        noStroke()

    }
    mover(sonido) {

        this.prevX = this.x
        this.prevY = this.y

        this.y += this.vy
        this.x += this.vx
        this.rebotar(sonido)

        if (millis() - this.tiempoReinicio > 1000 && this.activarMovimiento) {
            this.vx = random(-1, 1) * 3
            // this.vx = 0
            this.vy = 5
            this.activarMovimiento = false
        }

    }

    reiniciar() {
        this.activarMovimiento = true
        this.vx = 0
        this.vy = 0
        this.x = width / 2
        this.y = height / 2
        this.tiempoReinicio = millis()

    }
    rebotar(sonido) {


        // izquierda
        if (this.x - this.r / 2 <= 0) {
            this.x = this.r / 2
            this.vx *= -1
        }

        // derecha
        if (this.x + this.r / 2 >= width) {
            this.x = width - this.r / 2
            this.vx *= -1
        }

        // arriba
        if (this.y - this.r / 2 <= 0) {
            this.y = this.r / 2
            this.vy *= -1
        }

        // abajo
        if (this.y + this.r / 2 >= height) {
            this.reiniciar()
            sonido.play();
        }



    }

    rebotePala(jugador) {
        let colision =
            this.x + this.r / 2 > jugador.x &&
            this.x - this.r / 2 < jugador.x + jugador.w &&
            this.y + this.r / 2 > jugador.y &&
            this.y - this.r / 2 < jugador.y + jugador.h

        if (colision && this.vy > 0) {
            let centro = jugador.x + jugador.w / 2
            let distancia = (this.x - centro) / (jugador.w / 2)
            this.vx = distancia * 6
            this.vy *= -1
        }

    }

    reboteBloque(bloque) {

        if (!bloque.visible) return;

        let colision =
            this.x + this.r / 2 > bloque.x &&
            this.x - this.r / 2 < bloque.x + bloque.w &&
            this.y + this.r / 2 > bloque.y &&
            this.y - this.r / 2 < bloque.y + bloque.h

        if (!colision) return


        if (this.prevY + this.r / 2 <= bloque.y) {
            this.vy *= -1
            bloque.perderVida()
            return
        }

        else if (this.prevY - this.r / 2 >= bloque.y + bloque.h) {
            this.vy *= -1
            bloque.perderVida()
            return
        }

        else if (this.prevX + this.r / 2 <= bloque.x) {
            this.vx *= -1
            bloque.perderVida()
            return
        }

        else if (this.prevX - this.r / 2 >= bloque.x + bloque.w) {
            this.vx *= -1
            bloque.perderVida()
            return
        }

    }
}


class Jugador {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 7
        this.color = "black"
        this.pressIzquierda = false
        this.pressDerecha = false
    }

    moverPala() {
        this.x = constrain(mouseX, 0, width - this.w)
    }

    mostrarPala() {

        stroke("white")
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)
        noStroke()
    }

}

let jugador = new Jugador(450, 550, 100, 10)

let bloques = []


let mySound;

function preload() {
    //soundFormats("wav");
    mySound = loadSound("healsound.wav");
}
let pelota = new Pelota(500, 300, 10)

function setup() {

    createCanvas(1000, 600)
    for (let indexX = 20; indexX < width - 20; indexX += 70) {
        for (let indexY = 100; indexY < 200; indexY += 20) {

            bloques.push(new Bloque(indexX, indexY, 50, 10))

        }



    }

}

function draw() {
    background(63, 197, 212)

    pelota.mover(mySound)
    pelota.mostrar()
    pelota.rebotePala(jugador)

    jugador.mostrarPala()
    jugador.moverPala()

    bloques.forEach(element => {
        if (!element.visible) return;
        element.mostrar()
        pelota.reboteBloque(element)
    });


}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}

class Juego {
    constructor() {

    }
}






