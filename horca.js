//Selectores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = "none";
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");



var palabras = ["ALURA", "AHORCADO", "HTML", "ORACLE", "JAVASCRIPT", "LOGICA", "PROGRAMACION", "DESAFIO"];
var ctx = document.getElementById('horca');
var tablero = ctx.getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
var numeroDeErrores = 8
let letraElegida = [];

//eventos

// captura el id 'iniciar-juego' en click y direcion el programa al metodo que incia el juego
document.getElementById("iniciar-juego").onclick = () => {
	iniciarJuego();
}

//captura el id "btn-guardar" guarda la palabra agregada y inicia el juego
document.getElementById("btn-guardar").onclick = () => {
	guardarPalabra();
}

//actualiza la pantalla cuando el usuario hace click en el boton "nuevo juego"
btnNuevoJuego.addEventListener("click", function (){
	location.reload();
});

//actualiza la pantalla cuando el usuario hace click boton "salir"
btnSalir.addEventListener("click", function (){
	location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el boton "cancelar"
btnCancelar.addEventListener("click", function (){
	location.reload();
});

//sortea la palabra que sera usada en el ahorcado
function escojerPalabraSecreta(){
	let palabra = palabras[Math.floor(Math.random() * palabras.length)]
	palabraSecreta = palabra
	return palabra
}

// verifica cual es la letra que el usuario hizo click
function verificarLetraClicada(key){
	if( letras.length < 1 || letras.indexOf(key) < 0){
		letras.push(key)
		return false
	}
	else {
		letras.push(key)
		return true
	}
}

function adicionarLetraCorrecta(i){
	palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letra){
	if(palabraSecreta.indexOf(letra) <= 0){
		errores -=1
	}
}

function verificarFinJuego(letra){

  if(letraElegida.length < palabraSecreta.length){
  	letrasIncorrectas.push(letra);

  	//valida si el usuario termino el numero de intentos
  	if (letrasIncorrectas.length > numeroDeErrores){
  		perdiste()
  	}
    else if(letraElegida.length < palabraSecreta.length){
    	adicionarLetraIncorrecta(letra)
		escribirLetraIncorrecta(letra, errores)
    }
  }	
}

//verifica si el usuario a ganado

function verificarVencedor(letra){
	letraElegida.push(letra.toUpperCase());
	if (letraElegida.length == palabraSecreta.length){

		ganaste()
	}
}

//impide que teclas como shift y otros, sean considerados errores y sean escritas
function verificarLetra(keyCode){
	if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90){
		return true
   } else {
	       return false
  }
}


//hace que los botones de la pantalla de home desaparezacan y los de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
	document.getElementById('div-desaparece').style.display = "none";
	document.getElementById('agregar-palabra').style.display = "block";

}

// guarda la palabra qu el usuario quiere agregar
function guardarPalabra(){
  
  //captura lo que usario a ingresado
   let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

//incluye la palabra que el usuario ingreso en el array de la palabras que seran sorteadas
     if(nuevaPalabra !== ""){
	     palabras.push(nuevaPalabra.toUpperCase());
	      alert('palabra guardada')

	// haz que los componentes de pantalla de gregar palabra desaparezcan
	document.getElementById("agregar-palabra").style.display = "none";
	iniciarJuego();
  }
  else{
 	alert('Ninguna Palabra ha sido ingresada')
  }

}

function iniciarJuego(){


  // hace iniciar el juego y agregar palabra desaparezca
  document.getElementById("div-desaparece").style.display = "none";
  //llama la funcion que dibuja el tablero del ahorcado
  dibujarTablero();

  //llama la funcion que sortea la palabra
  escojerPalabraSecreta();

  //llama la funcion que dibuja las lineas donde el usuario escribe
  dibujarLineas();

  // hace que los botones de nuevo juego y salir aparescan
  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

  // captura la letra que usuario escribio
  document.onkeydown = (e) => {
  	// pone la letra en letra mayuscula
  	let letra = e.key.toUpperCase()
  	//verifica si el usuario todavia no aperdido
  	if (letrasIncorrectas.length <= numeroDeErrores){
  	  if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)){
  	  	if (palabraSecreta.includes(letra)){
  	  		adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
  	  		for (let i = 0; i < palabraSecreta.length; i++){
  	  			if (palabraSecreta[i] === letra){
  	  			   escribirLetraCorrecta(i)
  	  			  verificarVencedor(letra)
  	  			}
  	  		}
  	  	}
  	  	//si el usuario cometio mas errores de los que son permitidos
  	  	// llama a las funciones qu edibujan el ahorcado y exibe el mensage de fin del juego
  	  	else {
  	  		if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
  	  			dibujarAhorcado(errores)
  	  		    verificarFinJuego(letra)
  	  	}
  	  }
  	}
  	else {
  		alert('has ingresado el limite de letras incorrectas')
  	}
  };
}