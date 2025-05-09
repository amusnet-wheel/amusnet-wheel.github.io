export function createWinEffect() {
    const main = document.createElement('div');
    main.id = 'win-effect';

    const particles = [];
    const total = 30;

    for (let i = 0; i < total; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        main.appendChild(particle);
        particles.push(particle);

        const size = Math.floor(Math.random() * 50 + 20);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    main['pop'] = pop;

    return main;

    function pop() {
        const dist = 250;

        for (let i = 0; i < total; i++) {
            const particle = particles[i];
            particle.style.display = '';

            const destinationX = (Math.random() - 0.5) * 2 * dist;
            const destinationY = (Math.random() - 0.5) * 2 * dist;
            const animation = particle.animate(
                [
                    { transform: 'translate(-50%, -50%) translate(0, 0)' },
                    { transform: `translate(-50%, -50%) translate(${destinationX}px, ${destinationY}px)` },
                ],
                {
                    duration: Math.random() * 1000 + 500,
                    easing: 'cubic-bezier(0, .6, .57, 1)',
                }
            );

            animation.onfinish = () => {
                particle.style.display = 'none';
                particle.remove();
            };
        }
    }
}