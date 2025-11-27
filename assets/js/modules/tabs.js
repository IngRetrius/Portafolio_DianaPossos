// ==========================================
// MÓDULO DE TABS (PESTAÑAS)
// ==========================================

function initTabs() {
    console.log('Iniciando sistema de tabs...');
    
    const tabButtons = document.querySelectorAll('.tab__btn');
    const tabPanels = document.querySelectorAll('.tab__panel');
    
    if (tabButtons.length === 0 || tabPanels.length === 0) {
        console.warn('No se encontraron tabs en la página');
        return;
    }
    
    // Función para cambiar de tab
    function switchTab(targetTab) {
        // Desactivar todos los botones y paneles
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Activar el tab seleccionado
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activePanel = document.getElementById(targetTab);
        
        if (activeButton && activePanel) {
            activeButton.classList.add('active');
            activePanel.classList.add('active');
            
            // Scroll suave al panel activo (opcional)
            activePanel.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            console.log(`Tab activado: ${targetTab}`);
        }
    }
    
    // Event listeners para los botones
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
        
        // Accesibilidad: navegación con teclado
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                switchTab(targetTab);
            }
        });
    });
    
    // Navegación con hash URL (opcional)
    function checkHashOnLoad() {
        // Verificar si hay un tab guardado en localStorage
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            // Limpiar el localStorage después de usarlo
            localStorage.removeItem('activeTab');
            switchTab(savedTab);
            return;
        }

        const hash = window.location.hash.substring(1); // Quitar el #

        // Verificar si el hash corresponde a un tab
        const hashTab = document.getElementById(hash);
        if (hashTab && hashTab.classList.contains('tab__panel')) {
            switchTab(hash);
        }
    }
    
    // Actualizar URL cuando se cambia de tab
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            // Actualizar hash sin scroll
            history.replaceState(null, null, `#${targetTab}`);
        });
    });
    
    // Verificar hash al cargar la página
    checkHashOnLoad();
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', checkHashOnLoad);
    
    console.log(`✅ Tabs inicializados (${tabButtons.length} tabs encontrados)`);
}