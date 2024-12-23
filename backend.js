document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to my portfolio!");
    
    // Add fade-in effect
    const element = document.querySelector('body'); // Change selector as needed
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.add('active');
    }, 10); // Delay to allow the class to be applied
    // Additional interactivity can be added here
});
