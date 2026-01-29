
var posX= 40
var posY= 40
// setup -> funcion que se ejecuta una sola vez al inicio del programa
function setup() {
    createCanvas(700, 500)
   
}

// draw -> funcion que se ejecuta cada frame. (Bucle infinito)
// width -> devuelve el ancho del lienzo
// height -> devuelve el alto del lienzo

// Circle -> crea un circulo con (posicion X, posicion Y, tamaño)


var posXOjoDerecho = 370
var posXOjoIzquierdo = 0

var ultimoTiempo=0;

function draw() {
    background(63, 197, 212)
    // noStroke() // quita el borde
    // strokeWeight(4) // grosor del borde
    // stroke("orange") // da un borde
    // fill(174, 88, 245) //cambiar color

    // posXOjoDerecho+=1

    // circle(width/2-20,height/2,40)
    // circle(posXOjoDerecho, height/2,40)

    // stroke("black")
    // circle(width/2-30,height/2,20)
    // circle(width/2+30,height/2,20)

    // stroke("orange")

    // arc(width/2, height/2 + 70, 200, 100, 0, PI , CHORD); //boca

    // ellipse()// eclipse
    // line() // linea
    // rect() //rectangulo

    // Cada 3 segundos aparece un circulo de derecha a izquierda. milis()

    // la Y random 
    
    if (millis() - ultimoTiempo > 3000) {
        posY=random(0, height)
        posX= width
        tamaño+=10
        ultimoTiempo=millis()
    }
    posX-=5
    
    stroke("orange") // da un borde
    fill(174, 88, 245) //cambiar color
    circle(mouseX, mouseY, tamaño)

    // mouseX -> posicion X del raton
    // mouseY ->  posicion Y del raton

}
var tamaño=0

function mouseClicked() {
  tamaño=30
}
