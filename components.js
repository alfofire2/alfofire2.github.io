async function loadComponent(id, file) {
    try {
        // Use relative path from the root
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
    const page = path.split("/").pop() || 'index.html';
    
    document.querySelectorAll('.top-nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if (page === linkPage) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});
