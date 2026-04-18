// const events = [
//   {
//     "title": "One-Day Mindfulness Retreat",
//     "date": "2026-04-20",
//     "location": "DVMP, Agalambe",
//     "description": "Introductory retreat focusing on breath awareness and mindfulness."
//   },
//   {
//     "title": "Mega Dhamma Course",
//     "date": "2026-05-05",
//     "location": "Veluvan Meditation Park",
//     "description": "Residential immersive meditation retreat in Thai Forest tradition."
//   }
// ];

// SMOOTH SCROLL
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // Skip invalid selector
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// LOAD EVENTS FROM JSON
async function loadEvents() {
  const container = document.getElementById('events-container');

  try {
    const res = await fetch('data/events.json');
    const events = await res.json();

    if (!events || events.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 👉 Filter only future events
    const upcomingEvents = events.filter(event => {
      return new Date(event.date) >= today;
    });

    // 👉 If no upcoming events → keep HTML fallback
    if (upcomingEvents.length === 0) return;

    // 👉 Sort by nearest date first
    upcomingEvents.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // 👉 Remove placeholder
    container.innerHTML = "";

    upcomingEvents.forEach(event => {
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
    // fallback HTML remains
  }
}

async function loadDVR() {
  const container = document.getElementById('dvr-container');

  try {
    const res = await fetch('data/dvr.json');
    const dvrList = await res.json();

    if (!dvrList || dvrList.length === 0) {
      container.innerHTML = '<div class="col-12 text-muted">No supporters listed yet.</div>';
      return;
    }

    container.innerHTML = "";

    dvrList.slice(0, 6).forEach(person => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      col.innerHTML = `
        <div class="card border-0 shadow-sm p-3">
          <p class="mb-0 fw-semibold">${person.name}</p>
          <small class="text-muted">${person.type || ""}</small>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (err) {
    console.error("DVR load failed", err);
  }
}

async function loadDVRPage() {
  const container = document.getElementById('dvr-full-list');
  if (!container) return;

  const res = await fetch('data/dvr.json');
  const dvrList = await res.json();

  container.innerHTML = dvrList.map(p => {
    let badge = "";

    if (p.tier === "gold") badge = "🏆 ";
    else if (p.tier === "silver") badge = "⭐ ";

    return `
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 text-center">
          <p class="mb-0">${badge}${p.name}</p>
          ${p.type ? `<small class="text-muted">${p.type}</small>` : ""}
        </div>
      </div>
    `;
  }).join('');
}
//call the function to load the DVR page list
document.addEventListener("DOMContentLoaded", loadDVRPage);

//Call the DVR function
document.addEventListener("DOMContentLoaded", loadDVR);


// Call the function
document.addEventListener("DOMContentLoaded", loadEvents);

// NAVBAR TRANSPARENT
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  if (Math.abs(window.scrollY - lastScrollY) < 10) return;

  const nav = document.querySelector('.navbar');
  nav.classList.toggle('navbar-scrolled', window.scrollY > 50);

  lastScrollY = window.scrollY;
});

//Copy text Button Logic
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy-btn")) {
    const text = e.target.getAttribute("data-copy");
    navigator.clipboard.writeText(text);

    e.target.innerText = "Copied!";
    setTimeout(() => e.target.innerText = "Copy", 1500);
  }
});

// Auto close navbar on link click (for mobile)
document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
  link.addEventListener('click', (e) => {

    // if it's a dropdown toggle, do nothing
    if (link.classList.contains('dropdown-toggle')) return;

    const nav = document.querySelector('.navbar-collapse');

    if (nav.classList.contains('show')) {
      new bootstrap.Collapse(nav).hide();
    }
  });
});

//Auto close navbar when clicking outside
document.addEventListener('click', function (e) {
  const nav = document.querySelector('.navbar-collapse');
  const toggler = document.querySelector('.navbar-toggler');

  // If menu is open and click is outside navbar
  if (
    nav.classList.contains('show') &&
    !nav.contains(e.target) &&
    !toggler.contains(e.target)
  ) {
    new bootstrap.Collapse(nav).hide();
  }
});