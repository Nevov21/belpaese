document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Menu Category Filtering
    const categoryButtons = document.querySelectorAll('.category');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length > 0 && menuItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide menu items based on category
                menuItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Proszę wypełnić wszystkie wymagane pola.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a, .hero-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        nav.style.display = 'none';
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll to top when page is refreshed
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
    
    // Add active class to menu item based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
});
