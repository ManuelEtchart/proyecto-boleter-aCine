
//Simulador Boletería Cine

//En principio declaramos algunas variables por si en algún futuro 
//estos datos cambian

const precioBase = 500;

const precioSectorAlto = 1000;

const precioSectorMedio = 1500;

const precioSectorBajo = 500;

const filas = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const columnas = 15;

//Comenzamos con la función "inicio"

function inicio(){

	const compra = document.querySelector(".compra");

	//Una función "error" para cuando no se ingresa lo deseado en algun campo
	//o estos se dejan vacios

	function error(){
		compra.innerHTML = `<button class="volver">Volver a Inicio</button>
							<h1>Error. Recargue la página e intente nuevamente</h1>
							`;

		$(".compra h1").css({"color": "red"}).animate({"font-size": "3rem"},2000).fadeOut(1000).fadeIn(1000).fadeOut(1000).animate({"font-size": "2.5rem"},1000).fadeIn(1000);

		const volver = document.querySelector(".volver");

		volver.addEventListener("click", inicio);

		document.script.stop();
	};

	const url = "peliculas.json";

	const cartelera = document.querySelector(".cartelera");

	//Acá realizamos nuestra llamada AJAX para traer datos estáticos de mi archivo JSON
	//de forma asincrónica 

	$.getJSON(url, function(respuesta, estado){

		if(estado === "success"){

			let peliculas = respuesta;

			//Acá creamos los bloques de código que darán inicio al simulador

			peliculas.forEach((pelicula) => {
		
				const div = document.createElement("div");
		
				div.setAttribute("class", "pelicula");
		
				const titulos = document.createElement("p");
		
				titulos.setAttribute("class", "titulo");
		
				titulos.innerText = pelicula.nombre;
		
				const imgs = document.createElement("img");
		
				imgs.setAttribute("src", `media/${pelicula.img}.jpg`);
		
				imgs.setAttribute("alt", pelicula.img);
				
				const trailer = document.createElement("button");
		
				trailer.innerText = "Ver Tráiler";
		
				div.appendChild(titulos);
		
				div.appendChild(trailer);
		
				div.appendChild(imgs);
		
				cartelera.appendChild(div);
		
			});

			compra.innerHTML = ``;

			$(".mensaje").slideUp(1);

			//Acá creamos el evento en los botones "ver trailer" para modificar el DOM, 
			//que aparezca el trailer correspondiente y que haga scroll hasta el trailer
			//Además, agregamos una animación para ver/ocultar el tráiler

			const botonesTrailer = document.querySelectorAll("button");

			const trailers = document.querySelector(".trailer");

			for(let i = 0; i < botonesTrailer.length ; i+=1){
				botonesTrailer[i].addEventListener("click", () => {
					trailers.innerHTML = `  <h1> Tráiler "${peliculas[i].nombre}"</h1>
											<div>
												${peliculas[i].trailer}
											</div>
											<button id="verOcultar">Ver/Ocultar</button>
											`;
					window.scroll(0,1000);

					const verOcultar = document.querySelector("#verOcultar");

					verOcultar.addEventListener("click", () => {
						$(".trailer div").slideToggle(1000);
					});				
				});
			};


			// Acá empiezaría el simulador crando el evento en cada título			

			const titulos = document.querySelectorAll(".titulo");

			for(let i = 0; i < titulos.length; i+=1){
				titulos[i].addEventListener("click", () => {

					cartelera.innerHTML = ``;

					trailers.innerHTML = ``;

					//Se crea este bloque de código que contiene este formulario para ingresar distintos datos a utilizar

					compra.innerHTML = `
										<h1>${peliculas[i].nombre}</h1>
										<form>
											<img src="media/${peliculas[i].img}.jpg" alt="${peliculas[i].img}">
											<ul>
												<li>
													<label>Nombre: </label>
													<input type="text" name="nombre" id="nombre" placeholder="Nombre">
												</li>
												<li>
													<label>Apellido: </label>
													<input type="text" name="apellido" id="apellido" placeholder="Apellido">
												</li>
												<li>
													<label>Documento de Identidad: </label>
													<input type="text" name="dni" id="dni" placeholder="DNI">
												</li>
												<li>
													<label>Idioma:</label>
													<div>
														<input type="radio" name="idioma" id="castellano" class="idioma">
														<p>Castellano</p>
													</div>
													<div>
														<input type="radio" name="idioma" id="inglesSub" class="idioma">
														<p>Inglés - Subtitulado Castellano</p>
													</div>
												</li>
												<li id="funcion"></li>
												<li>
													<button class="continuar1">Continuar</button>
												</li>
											</ul>
										</form>
										`;

					let funcionElegida;

					const castellano = document.querySelector("#castellano");

					//Acá agregamos los eventos para que se despleguen las correspondientes opciones

					castellano.addEventListener("click", () => {
						const funcion =  document.querySelector("#funcion");

						funcion.innerHTML = `
														<label>Funciones:</label>
														<select>
															<option selected="select" disabled>Castellano</option>
															<option>${peliculas[i].castellano.funciones.f1.fechaHora}</option>
															<option>${peliculas[i].castellano.funciones.f2.fechaHora}</option>															
														</select>
													`;
						funcionElegida = document.querySelector("select");
					});

					const inglesSub = document.querySelector("#inglesSub");

					inglesSub.addEventListener("click", () => {
						const funcion =  document.querySelector("#funcion");

						funcion.innerHTML = `
														<label>Funciones:</label>
														<select>
															<option selected="select" disabled>Inglés - Subtitulado Castellano</option>
															<option>${peliculas[i].inglesSub.funciones.f1.fechaHora}</option>
															<option>${peliculas[i].inglesSub.funciones.f2.fechaHora}</option>
														</select>
													`;
						funcionElegida = document.querySelector("select");							
					});					
					
					//Acá guardo datos para utilizarlos despues

					const datos = document.querySelectorAll("input");

					//Acá creo todo lo que seria las butacas y creo los eventos para elegir la butaca deseada
					//y que se pueda cambiar la eleccion

					const continua1 = document.querySelector(".continuar1");

					continua1.addEventListener("click", continuar1);

					function continuar1(){

						compra.innerHTML = ``;

						const sala = document.querySelector(".sala");

						if(datos[0].value === "" || datos[1].value === "" || datos[2].value === "" || funcionElegida === undefined){
							error();
						};

						switch (funcionElegida.value) {
							case "Inglés - Subtitulado Castellano":
							case "Castellano":
								error();								
								break;
						};

						sala.innerHTML = `<h1>${funcionElegida.value}</h1>
											<div class="aforo"></div>
											<div class="pantalla">PANTALLA</div>
											<button class="continuar2">Continuar</button>
											`;


						for(let i = 0; i < filas.length; i+=1){
							$(".aforo").append(`<div class="fila" id="${filas[i]}"></div>`);

							for(let j = 1; j < columnas + 1; j+=1){
								$(".aforo .fila").last().append(`
																<div>${filas[i]}-${j}</div>
																`);
							};
						};

						$(".aforo .fila div:nth-child(3)").attr("class", "vacioDerecha");
						$(".aforo .fila div:nth-child(12)").attr("class", "vacioDerecha");

						const filaDivs = document.querySelectorAll(".fila div");						

						let butacaReservadas;

						//Acá hago resaltar las butacas ya reservadas dependiendo en la elección realizada anteriormente

						if(funcionElegida.value === peliculas[i].castellano.funciones.f1.fechaHora){
							butacaReservadas = peliculas[i].castellano.funciones.f1.reservadas;
						}else if(funcionElegida.value === peliculas[i].castellano.funciones.f2.fechaHora){
							butacaReservadas = peliculas[i].castellano.funciones.f2.reservadas;
						}else if(funcionElegida.value === peliculas[i].inglesSub.funciones.f1.fechaHora){
							butacaReservadas = peliculas[i].inglesSub.funciones.f1.reservadas;
						}else if(funcionElegida.value === peliculas[i].inglesSub.funciones.f2.fechaHora){
							butacaReservadas = peliculas[i].inglesSub.funciones.f2.reservadas;
						};
							
						for(butacas of butacaReservadas){
							
							const butaca = Array.from(filaDivs).find(butaca => butaca.innerText == butacas);
							
							butaca.setAttribute("id", "butacaReservada");
						};
						 
						let butacaSeleccionada = "";

						//Acá hago la selección o deselección de las butucas por el usuario

						for(filaDiv of filaDivs){
							filaDiv.addEventListener("click", (e) => {
												
								if(e.target.className === "butacaElegida"){
									e.target.setAttribute("class", "");
								}else if(e.target.className === "vacioDerecha butacaElegida"){
									e.target.setAttribute("class", "vacioDerecha");
								}else if(e.target.id === "butacaReservada" && e.target.className === "vacioDerecha"){
									e.target.setAttribute("class", "vacioDerecha");
								}else if(e.target.id === "butacaReservada"){
									e.target.setAttribute("class", "");
								}else if(e.target.className === "vacioDerecha"){
									e.target.setAttribute("class", "vacioDerecha butacaElegida");
								}else{
									e.target.setAttribute("class", "butacaElegida");
								};
					
								butacaSeleccionada = document.querySelectorAll(".vacioDerecha .butacaElegida, .butacaElegida");										
							});
						};

						const continua2 = document.querySelector(".continuar2");

						continua2.addEventListener("click", continuar2);

						//Acá se crea el evento para procesar los datos y butacas ingresadas

						function continuar2(){

							sala.innerHTML = ``;

							let butacaNombres = [];

							let precioButaca = 0;
														
							for(butaca of butacaSeleccionada){

								butacaNombres.push(butaca.innerText);

								switch (butaca.parentElement.id) {
									case "A":
									case "B":
										precioButaca = precioButaca + precioSectorAlto;
										break;
									case "C":
									case "D":
									case "E":
									case "F":
										precioButaca = precioButaca + precioSectorMedio;
										break;
									case "G":
									case "H":
									case "I":
										precioButaca = precioButaca + precioSectorBajo;
										break;

								};						
							};		

							function precioEntrada(){
								if(butacaSeleccionada.length === 0){
									error();
								}else{
									return (precioBase*butacaSeleccionada.length) + precioButaca;
								};
							};

						//Acá se crea este bloque de código utilizando los datos ingresados 
						//o procesados con el "for" y la función "precioEntrada"
						// y se muestra para verificar si se desea la compra

							compra.innerHTML = `
												<h1>Nombre: ${datos[0].value.toUpperCase()}</h1>
												<h1>Apellido: ${datos[1].value.toUpperCase()}</h1>
												<h1>DNI: ${datos[2].value}</h1>
												<h1>Usted está por comprar ${butacaSeleccionada.length} entrada/s para ver "${peliculas[i].nombre}" a $${precioEntrada()} en la/s butaca/s</h1>
												<h1>${butacaNombres.toString()}</h1>
												<button class="comprar">Comprar</button>
												<button class="volver">Volver a Empezar</button>
												`;

						//Acá se crea el evento de la compra y se muestra este bloque de código con algunos datos
						//que muestra la compra realizada con éxito. También creamos un botón para volver a 
						//empezar para cambiar datos mal ingresados y por útimo un mnesaje de operación exitosa

							const volver = document.querySelector(".volver");

							volver.addEventListener("click", inicio);
							
							const comprar = document.querySelector(".comprar");

							comprar.addEventListener("click", () => {

								$(".mensaje").html(`<h1>Operación exitosa</h1>`).css({"height": "2.5rem", "background-color": "green", "display": "none"}).slideDown(1500);

								compra.innerHTML = `
													<h1>Ha comprado ${butacaSeleccionada.length} entrada/s para ver "${peliculas[i].nombre}"</h1>
													<h1>Podrá retirar su/s entrada/s hasta el día de la función en nuestras sucursales. Quedará/n reservada/s bajo el nombre y DNI de: ${datos[1].value.toUpperCase()}, ${datos[0].value.toUpperCase()} ${datos[2].value}</h1>
													<h1>¡Disfrute la película!</h1>
													<h1>${peliculas[i].nombre}</h1>
													<img src="media/${peliculas[i].img}.jpg" alt="${peliculas[i].img}">
													<button class="volver">Volver a Inicio</button>
								`;

								const volver = document.querySelector(".volver");

								volver.addEventListener("click", inicio);
							});
						};
					};
				});
			};
		};
	});
};

//Declaramos este evento para que la función inicio() se inicialice 
//una vez cargado el contenido del DOM

document.addEventListener("DOMContentLoaded", inicio);

