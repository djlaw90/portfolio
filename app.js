document.addEventListener('DOMContentLoaded', function () {
    const navbarLinks = document.querySelectorAll('.navbar-nav a');

    if ( window.innerWidth < 700 ) {
        document.querySelector("card-section").classList.remove('p-5');
    }
    
    navbarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Remove 'active' class from all links
            navbarLinks.forEach(function (navLink) {
                navLink.classList.remove('active');
            });

            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
});

// open modal by id
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('jw-modal-open');
}

// close currently open modal
function closeModal() {
    document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
}

window.addEventListener('load', function() {
    
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) {
            closeModal();
        }
    });
});



