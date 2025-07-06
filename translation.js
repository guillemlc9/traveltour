document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');

    // Funció per carregar les traduccions
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

    // Funció per traduir la pàgina
    const translatePage = (translations) => {
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    };
    
    // Funció principal per establir l'idioma
    const setLanguage = async (lang) => {
        localStorage.setItem('language', lang); // Guarda l'idioma seleccionat
        const translations = await loadTranslations(lang);
        translatePage(translations);

        // Actualitza la classe 'active' al selector
        languageSwitcher.querySelectorAll('.lang-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            }
        });
    };

    // Gestiona el clic en el selector d'idioma
    languageSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        const langLink = e.target.closest('.lang-link');
        if (langLink) {
            const lang = langLink.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    });

    // Carrega l'idioma guardat o l'idioma per defecte ('ca') en carregar la pàgina
    const currentLang = localStorage.getItem('language') || 'ca';
    setLanguage(currentLang);
});