async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            if (id === 'header-placeholder') {
                setActiveLink();
            }
        }
    } catch (error) {
        console.error(`Errore nel caricamento di ${file}:`, error);
    }
}

function setActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Remove active attribute from all
    document.querySelectorAll('.top-nav a').forEach(link => {
        link.removeAttribute('aria-current');
    });

    if (page === 'index.html' || page === '') {
        document.getElementById('nav-home')?.setAttribute('aria-current', 'page');
    } else if (page === 'extension.html') {
        document.getElementById('nav-extension')?.setAttribute('aria-current', 'page');
    } else if (page === 'privacy.html') {
        document.getElementById('nav-privacy')?.setAttribute('aria-current', 'page');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});
