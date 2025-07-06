// slider images array
const sliderImgs = ["img1.jpg", "img2.jpg", "img3.webp", "img4.jpg", "img5.jpg", "img6.jpg"];
let sliderImage = document.querySelector('.background-image');
let sliderGrids = [...document.querySelectorAll('.grid-item')];

let currentImage = 0;

setInterval(() => {
    changeSliderImage();
}, 5000);

const changeSliderImage = () => {
    sliderGrids.map((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {

                if (index == sliderGrids.length - 1) {
                    if (currentImage >= sliderImgs.length - 1) {
                        currentImage = 0;
                    } else {
                        currentImage++;
                    }

                    sliderImage.src = `img/${sliderImgs[currentImage]}`;

                    sliderGrids.map((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide')
                        }, i * 100);
                    })

                }

            }, 100);

        }, index * 100);
    })
}

// Comportament intel·ligent de la barra de navegació amb el scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Lògica per canviar el fons de la barra
    if (scrollTop > 100) {
        navbar.classList.add('bg');
    } else {
        navbar.classList.remove('bg');
    }

    // Lògica per amagar/mostrar la barra
    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        // Scroll cap a baix: amaga la barra
        navbar.classList.add('navbar-hidden');
    } else {
        // Scroll cap a dalt: mostra la barra
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Codi que s'executa un cop la pàgina s'ha carregat completament
window.addEventListener('load', () => {
    // 1. Inicialitza la llibreria d'animacions (AOS)
    AOS.init();

    // 2. Lògica per al menú d'hamburguesa en mòbils
    const navToggle = document.querySelector('.nav-toggle');
    const linksContainer = document.querySelector('.links-container');
    const languageSwitcher = document.querySelector('.language-switcher');

    if (navToggle) {
        // Comprova si el language switcher existeix abans de clonar-lo
        if (languageSwitcher) {
            const mobileLangSwitcher = languageSwitcher.cloneNode(true);
            mobileLangSwitcher.classList.add('mobile-lang-switcher'); // <-- AFEGEIX AQUESTA LÍNIA
            linksContainer.appendChild(mobileLangSwitcher);
        }
        
        navToggle.addEventListener('click', () => {
            linksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 3. Ressalta l'enllaç de navegació de la pàgina activa
    const navLinks = document.querySelectorAll('.links-container .link-item a');
    const currentURL = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentURL) {
            link.classList.add('active');
        }
    });
});