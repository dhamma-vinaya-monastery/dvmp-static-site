const events = [
  {
    "title": "One-Day Mindfulness Retreat",
    "date": "2026-04-20",
    "location": "DVMP, Agalambe",
    "description": "Introductory retreat focusing on breath awareness and mindfulness."
  },
  {
    "title": "Mega Dhamma Course",
    "date": "2026-05-05",
    "location": "Veluvan Meditation Park",
    "description": "Residential immersive meditation retreat in Thai Forest tradition."
  }
];

// SMOOTH SCROLL
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// LOAD EVENTS FROM JSON
async function loadEvents() {
  try {
    // const res = await fetch('data/events.json'); // make sure path is correct
    // const events = await res.json();
    console.log("Loaded events:", events);

    const container = document.getElementById('events-container');

    events.forEach(event => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      col.innerHTML = `
        <div class="event-card">
          <h5>${event.title}</h5>
          <p><strong>${new Date(event.date).toDateString()}</strong></p>
          <p>${event.location}</p>
          <p>${event.description}</p>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (err) {
    console.error("Events failed to load", err);
  }
}

// Call the function
document.addEventListener("DOMContentLoaded", loadEvents);

// NAVBAR TRANSPARENT
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('navbar-scrolled');
  } else {
    nav.classList.remove('navbar-scrolled');
  }
});
