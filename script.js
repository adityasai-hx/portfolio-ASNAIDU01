// =========================================
// 1. SIDEBAR & NAVIGATION LOGIC
// =========================================

// Sidebar Elements
const openBtn = document.getElementById('openSidebarBtn');
const closeBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebarMenu');

// Functions
function openSidebar() {
    sidebar.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
}

// Event Listeners
if(openBtn) openBtn.addEventListener('click', openSidebar);
if(closeBtn) closeBtn.addEventListener('click', closeSidebar);

// Close sidebar if clicked outside
document.addEventListener('click', (e) => {
    if (sidebar && openBtn) {
        if (!sidebar.contains(e.target) && !openBtn.contains(e.target) && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    }
});

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // -200 accounts for offset so link highlights a bit before section hits top
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if href exists to avoid errors
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// =========================================
// 2. BIOGRAPHY TOGGLE LOGIC
// =========================================

function toggleBiography() {
    const shortBio = document.getElementById('about-short');
    const fullBio = document.getElementById('about-full');

    if (shortBio.style.display === 'none') {
        // Switch back to Short
        shortBio.style.display = 'block';
        fullBio.style.display = 'none';
        
        // Optional: Scroll back to top of section smoothly
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Switch to Full
        shortBio.style.display = 'none';
        fullBio.style.display = 'block';
    }
}

// =========================================
// 3. CUSTOM 3D CAROUSEL LOGIC (ACHIEVEMENTS)
// =========================================

// Define your achievement images here
const achievementImages = [
    'IMG_4746.jpg',
    'presentation.jpg',
    'rename.png',
    'IMG_0527.jpg',
    'j1.jpg',
    'j2.jpg'
];

const track = document.getElementById('track');
let centerIndex = 0; // Start with first image
let autoPlayTimer;

// Initialize the Carousel
function initCarousel() {
    if (!track) return; // Safety check if element doesn't exist

    track.innerHTML = ''; // Clear existing
    
    // Create HTML elements for images
    achievementImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Achievement ${index + 1}`;
        
        div.appendChild(img);
        track.appendChild(div);
    });

    updateCarousel();
    startAutoPlay();
}

// Update classes based on position
function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;

    items.forEach((item, index) => {
        // Remove all status classes
        item.classList.remove('item-center', 'item-left', 'item-right', 'item-hidden');
        
        // Apply new classes based on index logic
        if (index === centerIndex) {
            item.classList.add('item-center'); // 0 deg
        } else if (index === getPrevIndex()) {
            item.classList.add('item-left');   // 45 deg
        } else if (index === getNextIndex()) {
            item.classList.add('item-right');  // -45 deg
        } else {
            item.classList.add('item-hidden'); // Hide others
        }
    });
}

// Helper: Get index of left item (circular)
function getPrevIndex() {
    return (centerIndex - 1 + achievementImages.length) % achievementImages.length;
}

// Helper: Get index of right item (circular)
function getNextIndex() {
    return (centerIndex + 1) % achievementImages.length;
}

// --- Button Controls ---

function nextSlide() {
    centerIndex = getNextIndex();
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    centerIndex = getPrevIndex();
    updateCarousel();
    resetAutoPlay();
}

// --- Auto Play Logic ---

function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});