(function() {
    const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (collapsed && window.innerWidth > 860) {
        document.documentElement.classList.add('sidebar-no-animation');
    }
})();