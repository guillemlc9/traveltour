document.addEventListener('DOMContentLoaded', () => {

    // Funció per carregar les traduccions (no canvia)
    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`i18n/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load translation file for ${lang}`);
                return {};
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching translation file:', error);
            return {};
        }
    };

    // Funció per traduir la pàgina (no canvia)
    const translatePage = (translations) => {
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    };
    
    // ===== CODI MODIFICAT =====
    
    // Funció principal per establir l'idioma
    const setLanguage = async (lang) => {
        localStorage.setItem('language', lang); // Guarda l'idioma seleccionat
        const translations = await loadTranslations(lang);
        translatePage(translations);

        // Actualitza la classe 'active' a TOTS els selectors (l'original i el clonat)
        document.querySelectorAll('.language-switcher').forEach(switcher => {
            switcher.querySelectorAll('.lang-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-lang') === lang) {
                    link.classList.add('active');
                }
            });
        });
    };

    // Gestiona el clic a QUALSEVOL part del document
    document.addEventListener('click', (e) => {
        // Comprova si l'element on s'ha fet clic és un enllaç d'idioma
        const langLink = e.target.closest('.language-switcher .lang-link');

        // Si ho és, canvia l'idioma
        if (langLink) {
            e.preventDefault();
            const lang = langLink.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    });

    // Carrega l'idioma guardat o per defecte en iniciar
    const currentLang = localStorage.getItem('language') || 'ca';
    setLanguage(currentLang);
});