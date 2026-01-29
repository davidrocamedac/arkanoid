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
    }
    mostrar() {
        if (!this.visible) return

        fill(this.color)
        rect(this.x, this.y, this.w, this.h)

    }
}


class Pelota {
    constructor(x, y,r) {
        this.x = x
        this.y = y
        this.vx = -20
        this.vy = -10
        this.r=r
        this.color = "red"
        this.visible = true
    }
    mostrar() {
        if (!this.visible) return

        fill(this.color)
        circle(this.x, this.y, this.r)

    }
    mover(){

        this.y += this.vy
        this.x += this.vx
        this.rebotar()

    }
    rebotar(){
        if(this.x - this.r/2 <= 0 || this.x + this.r/2 >= width){
            this.vx *= -1
        }
        if(this.y - this.r/2 <= 0 || this.y + this.r/2 >= height){
            this.vy *= -1
        }
        
    }
}

let pelota= new Pelota(500, 300, 20)

let bloque1 = new Bloque(200, 100, 50, 10)
let bloque2 = new Bloque(260, 100, 50, 10)

function setup() {
    
    createCanvas(1000, 600)

}

function draw(){
    background(63, 197, 212)
    pelota.mover()
    pelota.mostrar()

    bloque1.mostrar() 
    bloque2.mostrar()

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
class Juegador {
    constructor() {

    }
}
class Pala {
    constructor() {

    }
}






