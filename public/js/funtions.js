// HEADER
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.header-links a');
    const menu = document.getElementById('menu2');
    const menuLinks = document.getElementById('_links');

    // Agregar evento clic al menú para alternar la clase 'open'
    menu.addEventListener('click', () => {
        menu.classList.toggle('open');
        menuLinks.classList.toggle('open');
    });

    // Marcar el enlace activo
    links.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});


// PORTADA
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los elementos con la clase 'slide' y los almacena en la variable 'slides'
    const slides = document.querySelectorAll('.slide');
    // Selecciona el botón de siguiente y lo almacena en la variable 'nextBtn'
    const nextBtn = document.querySelector('.next');
    // Selecciona el botón de anterior y lo almacena en la variable 'prevBtn'
    const prevBtn = document.querySelector('.prev');
    // Selecciona todos los botones de control y los almacena en la variable 'controlBtns'
    const controlBtns = document.querySelectorAll('.control-btn');

    // Inicializa el índice del slide actual
    let currentIndex = 0;

    // Función para cambiar al slide especificado
    function goToSlide(index) {
        // Actualiza el índice del slide actual
        currentIndex = index;
        // Calcula el desplazamiento necesario para mostrar el slide correspondiente
        const offset = -index * 100;
        // Aplica la transformación al contenedor del slider para mostrar el slide
        document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
        // Actualiza la apariencia de los controles
        updateControls();
    }

    // Función para actualizar la apariencia de los controles
    function updateControls() {
        // Recorre todos los slides y actualiza su estado 'active'
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        // Recorre todos los botones de control y actualiza su estado 'active'
        controlBtns.forEach((btn, index) => {
            if (index === currentIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event listener para el botón 'Next'
    nextBtn.addEventListener('click', () => {
        // Incrementa el índice del slide actual y cambia al siguiente slide
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    });

    // Event listener para el botón 'Prev'
    prevBtn.addEventListener('click', () => {
        // Decrementa el índice del slide actual y cambia al slide anterior
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    });

    // Event listeners para los botones de control
    controlBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Cambia al slide correspondiente al botón de control clicado
            goToSlide(index);
        });
    });

    // Temporizador para cambiar automáticamente al siguiente slide cada 10 segundos
    // Verificar el ancho de la ventana
    if (window.innerWidth > 1024) {
        // Temporizador para cambiar automáticamente al siguiente slide cada 20 segundos
        let timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 20000);
    }
    // Event listener para detener el temporizador cuando se pasa el cursor sobre el slider
    document.querySelector('.slider-container').addEventListener('mouseenter', () => {
        clearInterval(timer);
        // Muestra los botones de control cuando el cursor está sobre el slider
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    });

    // Event listener para reiniciar el temporizador cuando el cursor sale del slider
    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
        // Reinicia el temporizador para que los slides cambien automáticamente
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 10000);
        // Oculta los botones de control cuando el cursor sale del slider
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    });

    // Variables para controlar el desplazamiento táctil en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    // Event listener para capturar el inicio del desplazamiento táctil
    document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    // Event listener para capturar el final del desplazamiento táctil
    document.querySelector('.slider-container').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        // Maneja el gesto de desplazamiento táctil
        handleGesture();
    });

    // Función para manejar el gesto de desplazamiento táctil
    function handleGesture() {
        if (touchEndX < touchStartX) {
            // Deslizar hacia la izquierda
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }
        if (touchEndX > touchStartX) {
            // Deslizar hacia la derecha
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        }
    }
});


// SERVICIOS_INDEX

document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".prev_serv");
    const nextBtn = document.querySelector(".next_serv");
    const container = document.querySelector(".container_cards");
    prevBtn.addEventListener("click", () => {
        container.scrollBy({
            left: -300, // Ajusta el valor según el ancho de las cartas
            behavior: "smooth"
        });
        handleCardVisibility(); // Llama a la función para ajustar la visibilidad de las cartas
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({
            left: 270, // Ajusta el valor según el ancho de las cartas
            behavior: "smooth"
        });
        handleCardVisibility(); // Llama a la función para ajustar la visibilidad de las cartas
    });

    // Función para ajustar la visibilidad de las cartas
    function handleCardVisibility() {
        // Obtener todas las cartas
        var cards = document.querySelectorAll('.servicios_card');

        // Iterar sobre las cartas y determinar cuáles están fuera de la vista
        cards.forEach(function (card) {
            if (isOutOfView(container, card)) {
                card.classList.add('hidden'); // Ocultar cartas fuera de la vista
            } else {
                card.classList.remove('hidden'); // Mostrar cartas dentro de la vista
            }
        });
    }

});



//SCRIPTS DE LA PESTAÑA NOSOTROS


document.addEventListener("DOMContentLoaded", function () {

    const titles = document.querySelectorAll('.valores_tittle');
    let rotated = false; // Movemos la declaración de rotated aquí para que sea accesible en todo el alcance de la función

    // Agregar evento click a cada título
    titles.forEach(title => {
        title.addEventListener('click', function () {
            const concept = this.nextElementSibling;
            const isConceptOpen = concept.classList.contains('show');

            // Ocultar todos los conceptos y restablecer la rotación de las imágenes
            hideAllConceptsAndResetImages();

            // Mostrar el concepto asociado al título clickeado
            if (!isConceptOpen) {
                concept.classList.add('show');
            }
        });

        // Agregar evento de clic al contenedor .valores_tittle
        title.addEventListener('click', function () {
            const image = this.querySelector('.valores_X'); // Asegurémonos de seleccionar la imagen dentro del título actual
            // Rotar la imagen 45 grados o volver a su estado original según el estado actual
            if (!rotated) {
                image.style.transform = 'rotate(45deg)';
            } else {
                image.style.transform = 'rotate(0deg)';
            }

            // Cambiar el estado de rotación
            rotated = !rotated;
        });
    });

    // Función para ocultar todos los conceptos y restablecer la rotación de las imágenes
    function hideAllConceptsAndResetImages() {
        const concepts = document.querySelectorAll('.valores_concept');
        concepts.forEach(concept => {
            concept.classList.remove('show');
        });

        // Restablecer la rotación de todas las imágenes dentro de .valores_tittle
        const images = document.querySelectorAll('.valores_tittle');
        images.forEach(image => {
            image.style.transform = 'rotate(0deg)';
        });
    }
});





//SCRIPTS DE LA PESTAÑA CONTACTANOS
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formulario-contacto").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Realizar una solicitud AJAX para enviar los datos del formulario al servidor
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/enviar-correo', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert('Formulario enviado');
                    document.getElementById("formulario-contacto").reset(); // Restablecer el formulario
                } else {
                    alert('Hubo un error al enviar el formulario');
                }
            }
        };
        xhr.send(new URLSearchParams(formData));
    });

});





//Funcion PARA EL CANBIO AUTOMATICO DEL COPYRIGHT
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento del pie de página
    var copyrightElement = document.getElementById("copyright");

    // Obtener el año actual
    var changeYear = new Date().getFullYear();

    // Actualizar el contenido del pie de página con el año actual
    copyrightElement.textContent = "Copyright © " + changeYear + ", DQ&ASOCIADOS. Todos los derechos reservados";

});