
gsap.registerPlugin(ScrollTrigger, TextPlugin);

let cart = [];
let currentStep = 1;
let isLoading = true;

const serviceData = {
    mtn: {
        title: 'MTN Data Bundles',
        packages: [
            { name: '1GB', validity: '30 days', price: 5.00, description: 'Perfect for light browsing' },
            { name: '2GB', validity: '30 days', price: 9.00, description: 'Great for social media' },
            { name: '5GB', validity: '30 days', price: 20.00, description: 'Ideal for streaming' },
            { name: '10GB', validity: '30 days', price: 35.00, description: 'Heavy usage package' },
            { name: '20GB', validity: '30 days', price: 65.00, description: 'Unlimited experience' },
            { name: '50GB', validity: '30 days', price: 150.00, description: 'Premium unlimited' }
        ]
    },
    airteltigo: {
        title: 'AirtelTigo Bundles',
        packages: [
            { name: '1GB BigTime', validity: '30 days', price: 4.50, description: 'Affordable starter pack' },
            { name: '2GB BigTime', validity: '30 days', price: 8.50, description: 'Value for money' },
            { name: '5GB BigTime', validity: '30 days', price: 18.00, description: 'Popular choice' },
            { name: '10GB BigTime', validity: '30 days', price: 32.00, description: 'Heavy user package' },
            { name: '1GB iShare', validity: '7 days', price: 3.00, description: 'Weekly package' },
            { name: '3GB iShare', validity: '7 days', price: 8.00, description: 'Weekly premium' }
        ]
    },
    telecel: {
        title: 'Telecel Data Packages',
        packages: [
            { name: '1GB', validity: '30 days', price: 4.00, description: 'Basic browsing' },
            { name: '2GB', validity: '30 days', price: 7.50, description: 'Social media pack' },
            { name: '5GB', validity: '30 days', price: 17.00, description: 'Entertainment package' },
            { name: '10GB', validity: '30 days', price: 30.00, description: 'Power user pack' },
            { name: '20GB', validity: '30 days', price: 55.00, description: 'Unlimited browsing' }
        ]
    },
    streaming: {
        title: 'Streaming Services',
        packages: [
            { name: 'Netflix Basic', validity: '30 days', price: 25.00, description: '1 screen, HD quality' },
            { name: 'Netflix Standard', validity: '30 days', price: 35.00, description: '2 screens, HD quality' },
            { name: 'Netflix Premium', validity: '30 days', price: 45.00, description: '4 screens, 4K quality' },
            { name: 'Amazon Prime', validity: '30 days', price: 20.00, description: 'Prime Video + benefits' },
            { name: 'Disney+', validity: '30 days', price: 22.00, description: 'Disney content library' },
            { name: 'YouTube Premium', validity: '30 days', price: 18.00, description: 'Ad-free YouTube' }
        ]
    },
    airtime: {
        title: 'Airtime Top-up',
        packages: [
            { name: 'MTN Airtime', validity: 'No expiry', price: 5.00, description: 'GH₵5 credit' },
            { name: 'MTN Airtime', validity: 'No expiry', price: 10.00, description: 'GH₵10 credit' },
            { name: 'MTN Airtime', validity: 'No expiry', price: 20.00, description: 'GH₵20 credit' },
            { name: 'AirtelTigo Airtime', validity: 'No expiry', price: 5.00, description: 'GH₵5 credit' },
            { name: 'AirtelTigo Airtime', validity: 'No expiry', price: 10.00, description: 'GH₵10 credit' },
            { name: 'Telecel Airtime', validity: 'No expiry', price: 5.00, description: 'GH₵5 credit' }
        ]
    },
    exam: {
        title: 'Exam Result Checker',
        packages: [
            { name: 'WAEC Results', validity: 'One-time', price: 2.00, description: 'Check WAEC results' },
            { name: 'BECE Results', validity: 'One-time', price: 1.50, description: 'Check BECE results' },
            { name: 'NOVDEC Results', validity: 'One-time', price: 2.00, description: 'Check Nov/Dec results' },
            { name: 'University Results', validity: 'One-time', price: 3.00, description: 'University exam results' }
        ]
    }
};


const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const modalOverlay = document.getElementById('modal-overlay');
const serviceModal = document.getElementById('service-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const checkoutOverlay = document.getElementById('checkout-overlay');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutClose = document.getElementById('checkout-close');
const checkoutForm = document.getElementById('checkout-form');
const notificationContainer = document.getElementById('notification-container');

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('[v0] Initializing FreedataGH Pro application...');

    startLoadingSequence();
  
    initializeAnimations();

    setupEventListeners();

    initializeScrollAnimations();
  
    setupNavigation();
    
    console.log('[v0] Application initialized successfully');
}

function startLoadingSequence() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const loadingTitle = document.getElementById('loading-title');
    const loadingSubtitle = document.getElementById('loading-subtitle');
    
    const loadingSteps = [
        { progress: 20, text: 'Loading assets...' },
        { progress: 40, text: 'Connecting to servers...' },
        { progress: 60, text: 'Initializing services...' },
        { progress: 80, text: 'Setting up interface...' },
        { progress: 100, text: 'Ready to launch!' }
    ];
    
    let currentStepIndex = 0;
    
    const updateProgress = () => {
        if (currentStepIndex < loadingSteps.length) {
            const step = loadingSteps[currentStepIndex];
            
            gsap.to(progressFill, {
                width: `${step.progress}%`,
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(progressText, {
                textContent: `${step.progress}%`,
                duration: 0.3
            });
            
            gsap.to(loadingSubtitle, {
                text: step.text,
                duration: 0.5,
                ease: "none"
            });
            
            currentStepIndex++;
            
            if (currentStepIndex < loadingSteps.length) {
                setTimeout(updateProgress, 800);
            } else {
                setTimeout(completeLoading, 1000);
            }
        }
    };

    setTimeout(updateProgress, 500);
}

function completeLoading() {
    console.log('[v0] Loading sequence completed');
    
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            loadingScreen.classList.add('hidden');
            isLoading = false;
     
            triggerEntranceAnimations();
        }
    });
}


function initializeAnimations() {
    console.log('[v0] Initializing GSAP animations...');
    

    const heroTimeline = gsap.timeline({ paused: true });
    
    heroTimeline
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        })
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-stats .stat', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-actions .btn', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3")
        .from('.phone-mockup', {
            opacity: 0,
            scale: 0.8,
            rotation: 10,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.floating-card', {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.4");

    window.heroTimeline = heroTimeline;

    animateCounters();
    
    animateFloatingCards();

    animatePhoneScreen();
}

function triggerEntranceAnimations() {
    console.log('[v0] Triggering entrance animations...');

    if (window.heroTimeline) {
        window.heroTimeline.play();
    }

    gsap.from(navbar, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        gsap.to(counter, {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 1.5
        });
    });
}

function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        gsap.to(card, {
            y: "random(-20, 20)",
            rotation: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
        });
    });
}

function animatePhoneScreen() {

    const usageCircle = document.getElementById('usage-circle');
    if (usageCircle) {
        gsap.to(usageCircle, {
            strokeDashoffset: 85,
            duration: 2,
            ease: "power2.out",
            delay: 2
        });
    }
    

    const signalBars = document.querySelectorAll('.signal-bars span');
    signalBars.forEach((bar, index) => {
        gsap.to(bar, {
            scaleY: "random(0.5, 1)",
            duration: "random(1, 2)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
        });
    });
}


function initializeScrollAnimations() {
    console.log('[v0] Initializing scroll animations...');
    
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
 
    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-visual',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
    

    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Event Listeners
function setupEventListeners() {
    console.log('[v0] Setting up event listeners...');
    
    // Cart functionality
    cartBtn.addEventListener('click', toggleCart);
    cartClose.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', openCheckout);
    
    // Modal functionality
    modalClose.addEventListener('click', closeServiceModal);
    checkoutClose.addEventListener('click', closeCheckout);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeServiceModal();
    });
    checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutOverlay) closeCheckout();
    });
    
    // Hero buttons
    const getStartedBtn = document.getElementById('get-started-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: '#services',
                duration: 1,
                ease: "power2.out"
            });
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            showNotification('Demo video coming soon!', 'info');
        });
    }
    
    // Form handling
    setupFormHandling();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    scrollTo: targetElement,
                    duration: 1,
                    ease: "power2.out"
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar background on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function handleResize() {
    // Handle responsive adjustments
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        closeCart();
        closeServiceModal();
        closeCheckout();
    }
}

function handleKeyboardShortcuts(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        closeCart();
        closeServiceModal();
        closeCheckout();
    }
    
    // Ctrl/Cmd + K to open search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Future: Open search modal
    }
}

// Service Modal Functions
function openServiceModal(serviceType) {
    console.log(`[v0] Opening service modal for: ${serviceType}`);
    
    const service = serviceData[serviceType];
    if (!service) {
        showNotification('Service not found', 'error');
        return;
    }
    
    modalTitle.textContent = service.title;
    modalContent.innerHTML = generatePackageHTML(service.packages, serviceType);
    
    modalOverlay.classList.add('open');
    
    // Animate modal entrance
    gsap.from(serviceModal, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
    });
}

function closeServiceModal() {
    modalOverlay.classList.remove('open');
}

function generatePackageHTML(packages, serviceType) {
    return `
        <div class="package-grid">
            ${packages.map(pkg => `
                <div class="package-item" onclick="addToCart('${serviceType}', '${pkg.name}', ${pkg.price}, '${pkg.validity}', '${pkg.description}')">
                    <div class="package-info">
                        <h4>${pkg.name}</h4>
                        <p>${pkg.description} • ${pkg.validity}</p>
                    </div>
                    <div class="package-price">GH₵${pkg.price.toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Cart Functions
function toggleCart() {
    cartSidebar.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        // Animate cart entrance
        gsap.from('.cart-item', {
            x: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
}

function closeCart() {
    cartSidebar.classList.remove('open');
}

function addToCart(serviceType, packageName, price, validity, description) {
    console.log(`[v0] Adding to cart: ${packageName} - GH₵${price}`);
    
    const item = {
        id: Date.now(),
        serviceType,
        name: packageName,
        price,
        validity,
        description
    };
    
    cart.push(item);
    updateCartUI();
    closeServiceModal();
    
    showNotification(`${packageName} added to cart!`, 'success');
    
    // Animate cart button
    gsap.to(cartBtn, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
    });
}

function removeFromCart(itemId) {
    console.log(`[v0] Removing item from cart: ${itemId}`);
    
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    
    showNotification('Item removed from cart', 'info');
}

function updateCartUI() {
    const itemCount = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartCount.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2);
    
    if (itemCount === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">${item.description} • ${item.validity}</div>
                </div>
                <div class="item-price">GH₵${item.price.toFixed(2)}</div>
                <button class="item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    // Update cart count visibility
    if (itemCount > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    console.log('[v0] Opening checkout modal');
    
    checkoutOverlay.classList.add('open');
    currentStep = 1;
    updateCheckoutStep();
    
    // Close cart sidebar
    closeCart();
    
    // Animate checkout modal entrance
    gsap.from(checkoutModal, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
    });
}

function closeCheckout() {
    checkoutOverlay.classList.remove('open');
    currentStep = 1;
    updateCheckoutStep();
    
    // Reset form
    checkoutForm.reset();
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        updateCheckoutStep();
        
        // Animate step transition
        gsap.from('.form-step.active', {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    }
}

function prevStep() {
    currentStep--;
    updateCheckoutStep();
    
    // Animate step transition
    gsap.from('.form-step.active', {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });
}

function updateCheckoutStep() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update form steps
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateCurrentStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentFormStep.querySelectorAll('input[required]');
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--gray-200)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

function processPayment() {
    console.log('[v0] Processing payment...');
    
    // Simulate payment processing
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const customerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        paymentMethod: paymentMethod
    };
    
    // Show processing state
    const processBtn = document.querySelector('.form-step[data-step="2"] .btn-primary');
    const originalText = processBtn.innerHTML;
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    processBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        processBtn.innerHTML = originalText;
        processBtn.disabled = false;
        
  
        currentStep = 3;
        updateCheckoutStep();
        
        generateOrderDetails(customerData);
     
        cart = [];
        updateCartUI();
        
        showNotification('Payment successful! Your order is being processed.', 'success');
        
        gsap.from('.success-message', {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
    }, 2000);
}

function generateOrderDetails(customerData) {
    const orderDetails = document.getElementById('order-details');
    const orderId = 'FDG' + Date.now().toString().slice(-6);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    orderDetails.innerHTML = `
        <div style="text-align: left;">
            <h5 style="margin-bottom: 1rem; color: var(--gray-900);">Order Details</h5>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer:</strong> ${customerData.name}</p>
            <p><strong>Phone:</strong> ${customerData.phone}</p>
            <p><strong>Payment Method:</strong> ${customerData.paymentMethod === 'momo' ? 'Mobile Money' : 'Credit Card'}</p>
            <p><strong>Total Amount:</strong> GH₵${total.toFixed(2)}</p>
            <p style="margin-top: 1rem; color: var(--success-color);">
                <i class="fas fa-check-circle"></i> 
                Your services will be activated within 2 minutes.
            </p>
        </div>
    `;
}

function setupFormHandling() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            const radio = method.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
        }
    }
    
    e.target.value = value;
}

// Notification System
function showNotification(message, type = 'info') {
    console.log(`[v0] Showing notification: ${message} (${type})`);
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fas fa-check',
        error: 'fas fa-exclamation-triangle',
        warning: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${iconMap[type]}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        gsap.to(notification, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }
        });
    }, 5000);
    
   
    gsap.from(notification, {
        x: '100%',
        duration: 0.3,
        ease: "power2.out"
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function logPerformance() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`[v0] Page load time: ${loadTime}ms`);
    }
}


window.addEventListener('load', logPerformance);


window.addEventListener('error', (e) => {
    console.error('[v0] JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    
        console.log('[v0] Service Worker support detected');
    });
}


window.openServiceModal = openServiceModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.processPayment = processPayment;
window.closeCheckout = closeCheckout;

console.log('[v0] FreedataGH Pro script loaded successfully');