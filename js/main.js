//Declaración e inicialización de funciones flecha para mostrar alertas por pantalla y mensajes por consola.
const alerta = (mensaje) => { alert(mensaje); }
const consola = (mensaje) => { console.log(mensaje); }

//Función principal de Von Neumann.
function vonNeumann(){

    let cantidadDigitos = solicitarDigitos();
    let semilla = solicitarSemilla(cantidadDigitos);
    let tamañoSemilla = semilla.length;
    let cantNumeros = solicitarCantidadDeNumeros();
    let nuevoNumero = obtenerNuevoNumero(tamañoSemilla, semilla,cantidadDigitos);
    let numerosAleatorios = "Números aleatorios obtenidos: {" + nuevoNumero + " ";

    for( i = 2 ; i <= cantNumeros ; i++ ){

        let tamañoNumero = nuevoNumero.length;
        nuevoNumero = obtenerNuevoNumero(tamañoNumero, nuevoNumero, cantidadDigitos);
        if(i != cantNumeros){
            numerosAleatorios = numerosAleatorios.concat(", " + nuevoNumero + " ");
        } else {
            numerosAleatorios = numerosAleatorios.concat(", " + nuevoNumero + "}");
        }
        
    }

    consola(numerosAleatorios);
    alerta(numerosAleatorios);
}

//FUNCIONES PARA EL MÉTODO DE VON NEUMANN.

//Función para solicitar la cantidad de dígitos que se quiere tener en los números pseudoaleatorios generados.
function solicitarDigitos(){

    let cantidadDigitos

    do{
        cantidadDigitos = parseInt(prompt("Ingrese la cantidad de dígitos que desea que tengan los números generados (Debe ser múltiplo de 2 y distinto de 0)"))
        if(!(cantidadDigitos % 2 == 0)){
            alerta("Por favor, ingrese un número que sea múltipo de 2");
        }
        if(cantidadDigitos==0){
            alerta("Por favor, ingrese un número distinto de 0.");
        }
        if(!Number.isInteger(cantidadDigitos)){
            alerta("Por favor, ingrese solo números.");
        }
    }while((!(cantidadDigitos % 2 == 0)) || (!Number.isInteger(cantidadDigitos)) || (cantidadDigitos==0));

    consola(cantidadDigitos);
    return cantidadDigitos;

}

//Función para solicitar la semilla inicial.
function solicitarSemilla(cantidadDigitos){

    let semilla;
    //Se solicita la semilla con la cual se comenzará con la generación de los números pseudoaleatorios.
    do{
        semilla = parseInt(prompt("Ingrese la semilla (Número con más de "+ (cantidadDigitos-1) +" dígitos)"));
        consola(semilla);
        consola(semilla.toString());
        consola((semilla.toString()).length);
        if((semilla.toString()).length <= (cantidadDigitos-1)){
            alerta("Por favor, ingrese un número con más de "+ (cantidadDigitos-1) +" dígitos para que se puedan generar un mínimo de 100 números correctamente.");
        }
        if(!Number.isInteger(semilla)){
            alerta("Por favor, ingrese solo números.");
        }
    }while(((semilla.toString()).length <= (cantidadDigitos-1)) || (!Number.isInteger(semilla)));

    //Se transforma el tipo de dato a String para poder utilizar los métodos propios del objeto.
    let semillaString = semilla.toString();
    consola("Semilla ingresada: " + semillaString);
    

    //Si la semilla tiene menos de la cantidad de dígitos ingresada, se completan los dígitos faltantes con ceros.
    if(semillaString.length < cantidadDigitos){
        consola("La semilla tiene menos de "+ (cantidadDigitos-1) +" números, se completan los dígitos faltantes con 0");
        do{
            semillaString = semillaString.concat(0);
        }while(semillaString.length < cantidadDigitos);
        consola("Nueva semilla: " + semillaString);
    }

    //Si la semilla está compuesta por más de la cantidad de dígitos ingresada, se toman los primeros digitos correspondientes a la cantidad de dígitos ingresada.
    if(semillaString.length > cantidadDigitos){
        consola("La semilla tiene más de "+ cantidadDigitos +" números, se toman los 10 primeros dígitos.");
        semillaString = semillaString.substring(0,cantidadDigitos);
        consola("Nueva semilla: " + semillaString);
    }

    return semillaString;
}

//Función para solicitar la cantidad de números pseudoaleatorios a generar.
function solicitarCantidadDeNumeros(){

    let cantNumeros;

    //Se solicita la cantidad de números pseudoaleatorios a generar.
    do{
        cantNumeros = parseInt(prompt("Ingrese la cantidad de números a generar"));
        if(!Number.isInteger(cantNumeros)){
            alerta("Por favor, ingrese solo números.");
        }
    }while(!Number.isInteger(cantNumeros));
    consola("Cantidad de números a generar: " + cantNumeros);

    return cantNumeros;

}

//Función para obtener un número del doble de la cantidad de dígitos ingresada por medio del cuadrado de una semilla.
function obtenerCuadrado(semilla,cantidadDigitos){

    //Se calcula el número al cuadrado y se transforma el tipo de dato a String para poder utilizar los métodos propios del objeto.
    let numeroAlCuadrado  = (semilla*semilla).toString();
    consola("Número al cuadrado: " + numeroAlCuadrado);

    //Si el número al cuadrado tiene menos del doble de la cantidad de dígitos ingresados, se completan los dígitos faltantes con ceros.
    if(numeroAlCuadrado.length < (cantidadDigitos*2)){
        consola("el numero al cuadrado tiene menos de "+ (cantidadDigitos*2) +" números, se completan los dígitos faltantes con 0");
        do{
            numeroAlCuadrado = numeroAlCuadrado.concat(0);
        }while(numeroAlCuadrado.length < (cantidadDigitos*2));
        consola("Nuevo número al cuadrado: " + numeroAlCuadrado);
    }

    //Si el número al cuadrado tiene más del doble de la cantidad de dígitos ingresados, se toman los primeros 20 dígitos.
    if(numeroAlCuadrado.length > (cantidadDigitos*2)){
        consola("El número al cuadrado tiene más de "+ (cantidadDigitos*2) +" números, se toman los "+ (cantidadDigitos*2) +" primeros dígitos.");
        numeroAlCuadrado = numeroAlCuadrado.substring(0,(cantidadDigitos*2));
        consola("Nuevo número al cuadrado: " + numeroAlCuadrado);
    }

    return numeroAlCuadrado;

}

//Función para obtener el tamaño del String del medio del número al cuadrado generado.
function obtenerCaracterDelMedio(tamañoCuadrado, tamañoSemilla){
    return ((tamañoCuadrado - tamañoSemilla) / 2);
}

//Función para generar un nuevo número pseudoaleatorio.
function obtenerNuevoNumero(tamañoSemilla,semilla,cantidadDigitos){

    let numeroAlCuadrado = obtenerCuadrado(semilla,cantidadDigitos);
    let tamañoCuadrado = numeroAlCuadrado.length;
    let caracterDelMedioIzq = obtenerCaracterDelMedio(tamañoCuadrado,tamañoSemilla);
    let nuevoNumero = (numeroAlCuadrado.substring(caracterDelMedioIzq, caracterDelMedioIzq + tamañoSemilla));

    return nuevoNumero;
}