
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

  // envio de Formulario consulta
    // document.addEventListener('DOMContentLoaded', () => {
    //     const form = document.querySelector('form');
    //     form.addEventListener('submit', (event) => {
    //         event.preventDefault();

    //         fetch('/enviar-consulta', {
    //           method: 'POST',
    //           body: new FormData(form),
    //         })
    //           .then((response) => {
    //             if (response.ok) {
    //               // Muestra la ventana emergente
    //               alert('Gracias por enviar tu consulta. Nos pondremos en contacto contigo pronto.');
    //               // Restablece el formulario
    //               form.reset();
    //             }
    //           })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     });
    // });

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