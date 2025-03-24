
 let linea = document.querySelectorAll('.linea');
 let links = document.querySelectorAll('header nav ul li a');
  // Agrega un evento de clic a todos los enlaces del menú
 links.forEach(function(link) {
     link.addEventListener('click', function(event) {
         event.preventDefault(); // Evita el comportamiento predeterminado del enlace

         let target = document.querySelector(link.getAttribute('href')); // Obtiene el elemento de destino según el atributo href del enlace

         // Desplaza la página suavemente hacia el elemento de destino
         target.scrollIntoView({
             behavior: 'smooth'
         });
     });
 });
 if (window.innerWidth <= 768) {
  let lineas = document.querySelectorAll('.linea');
 let hamburguesa = document.querySelector('.hamburguesa');
 let menu = document.querySelector('nav ul');
 
 hamburguesa.addEventListener('click', function() {
   menu.classList.toggle('menu-activo');
   hamburguesa.classList.toggle('active');
  //  hamburguesa.style.opacity = '0';
   
 });

//  let links = document.querySelectorAll('header nav ul li a');
 

links.forEach(function(link) {
   link.addEventListener('click', function(event) {
     event.preventDefault();
     menu.classList.remove('menu-activo');
     hamburguesa.style.opacity = '1'
     

     let target = document.querySelector(link.getAttribute('href'));
     target.scrollIntoView({
       behavior: 'smooth'
     });
     
     if (link.getAttribute('href') === '#footer' || '#acerca') {
      lineas.forEach(function(linea) {
      linea.style.backgroundColor = 'white';
      })
    } else {
      lineas.forEach(function(linea) {
      linea.style.backgroundColor = '';
    });
    }
   });
 });
}

 // Obtener referencia al botón "Pedir Turno"
 const btnPedirTurno = document.querySelectorAll('.btn-pedir-turno');

 // Agregar un evento click al botón
 btnPedirTurno.forEach(function(btn){
    btn.addEventListener('click', function() {
     // Abrir el formulario en una nueva ventana o pestaña
     window.open('form.html', '_blank');
 });
});
// obscureciendo body al llegar al footer
window.addEventListener('scroll', function() {
    let footer = document.getElementById('footer');
    let body = document.body;
  
    let footerOffset = footer.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
  
    if (footerOffset < windowHeight) {
      body.classList.add('footer-visible');
    } else {
      body.classList.remove('footer-visible');
    }
  });



    const form = document.getElementById('consulta-form');
        
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Crear URLSearchParams con los datos del formulario
        const formData = new URLSearchParams(new FormData(form));
        
        try {
            const response = await fetch('/enviar-consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });
            
            if (response.ok) {
                const message = await response.text();
                alert(message);
                form.reset();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            alert('Ocurrió un error al enviar tu turno. Intenta nuevamente.');
            console.error('Error:', error);
        }
    });


    // Selecciona las tarjetas específicas
const cards = document.querySelectorAll('.tarjeta-face, .tarjeta-ig, .tarjeta-what');

// Función para calcular la transformación tilt
const tiltMove = (x, y) => `perspective(500px) scale(1.1)  rotateX(${x}deg) rotateY(${y}deg)`;

// Aplica la animación a cada tarjeta
cards.forEach(card => {
    const height = card.clientHeight;
    const width = card.clientWidth;

    // Evento mousemove para aplicar el efecto tilt
    card.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const multiplier = 10;

        const xRotate = multiplier * ((x - width / 2) / width);
        const yRotate = -multiplier * ((y - height / 2) / height);

        card.style.transform = tiltMove(xRotate, yRotate);
    });

    // Evento mouseout para resetear la transformación
    card.addEventListener('mouseout', () => {
        card.style.transform = tiltMove(0, 0);
        card.style.trasition='all .2s linear'
    });
});

const listItem = document.querySelectorAll("#landing-header li");
const menuBackDrop = document.querySelector("#menu-backdrop");

listItem.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const rect = item.getBoundingClientRect();

    menuBackDrop.style.left = `${rect.left}px`;
    menuBackDrop.style.top = `${rect.top }px`;
    menuBackDrop.style.width = `${rect.width}px`;
    menuBackDrop.style.height = `${rect.height}px`;

    menuBackDrop.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    menuBackDrop.classList.remove("active");
  });
});