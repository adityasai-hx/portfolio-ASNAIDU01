document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling for Photography and Videography links
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hover to Play Video Logic
    const videos = document.querySelectorAll('.hover-video');

    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Optional: resets video to start
        });
    });

    // Subtle parallax effect on title
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.main-title');
        let scrollValue = window.scrollY;
        title.style.transform = `translateY(${scrollValue * 0.2}px)`;
        title.style.opacity = 1 - (scrollValue / 700);
    });
});