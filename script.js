document.addEventListener("DOMContentLoaded", function() {
    // Mobile navigation toggle (small screens)
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("primary-navigation");

    function setNavOpen(isOpen) {
        if (!navToggle || !navLinks) return;
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navLinks.classList.toggle("is-open", isOpen);
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            setNavOpen(!isOpen);
        });

        navLinks.addEventListener("click", (e) => {
            const target = e.target;
            if (target && target.tagName === "A") setNavOpen(false);
        });
    }

    // Example event data
    const events = [
        {
            title: "Vesak Day Celebration",
            date: "2025-05-30",
            time: "10:00 AM",
            description: "Join us for the celebration of Vesak, the birth, enlightenment, and death of the Buddha.",
            expected: "Visitors are encouraged to participate in meditation and prayer.",
            significance: "Vesak Day is a significant Buddhist festival that celebrates the life and teachings of the Buddha."
        },
        {
            title: "Monthly Full Moon Ceremony",
            date: "2025-06-02",
            time: "6:00 PM",
            description: "A special full moon ceremony to enhance meditation and mindfulness.",
            expected: "Silent meditation and reflection are encouraged.",
            significance: "The full moon holds great spiritual significance in Buddhism, marking key events in the Buddha’s life."
        }
    ];

    const newsFeed = [
        {
            title: "Live Stream: Annual Buddha Jayanti",
            content: "The Buddha Jayanti ceremony will be streamed live on our YouTube channel.",
            link: "https://youtube.com/streamlink"
        }
    ];

    const eventList = document.getElementById("event-list");
    function appendLabeledText(container, label, value) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(` ${value}`));
        container.appendChild(p);
    }

    events.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        const h3 = document.createElement("h3");
        h3.textContent = event.title;
        eventDiv.appendChild(h3);

        appendLabeledText(eventDiv, "Time:", event.time);
        appendLabeledText(eventDiv, "Date:", event.date);
        appendLabeledText(eventDiv, "Description:", event.description);
        appendLabeledText(eventDiv, "Expected from Visitors:", event.expected);
        appendLabeledText(eventDiv, "Significance:", event.significance);

        eventList.appendChild(eventDiv);
    });

    const newsFeedDiv = document.getElementById("news-feed");
    newsFeed.forEach((newsItem) => {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("news-item");

        const h4 = document.createElement("h4");
        h4.textContent = newsItem.title;
        newsDiv.appendChild(h4);

        const p = document.createElement("p");
        p.textContent = newsItem.content;
        newsDiv.appendChild(p);

        const a = document.createElement("a");
        a.href = newsItem.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Watch Live";
        newsDiv.appendChild(a);

        newsFeedDiv.appendChild(newsDiv);
    });

    // Donation modal
    const donateNowBtn = document.getElementById("donateNowBtn");
    const donationModal = document.getElementById("donationModal");
    const closeEls = donationModal ? donationModal.querySelectorAll("[data-close-modal]") : [];

    // Maps: click-to-load (privacy-friendly)
    const mapConsent = document.querySelector("[data-map-consent]");
    const loadMapBtn = document.querySelector("[data-load-map]");
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60563.075943008545!2d73.6161125!3d18.4295784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc297004cb4c7e3%3A0xfdf79b9844638e13!2sDVMP%20PROJECT!5e0!3m2!1sen!2sin!4v1773744362329!5m2!1sen!2sin";

    function loadMap() {
        if (!mapConsent) return;
        const iframe = document.createElement("iframe");
        iframe.className = "map-embed";
        iframe.title = "Map showing Dhamma Vinaya Monastery Pune";
        iframe.src = mapSrc;
        iframe.width = "600";
        iframe.height = "450";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.allowFullscreen = true;

        mapConsent.replaceWith(iframe);
    }

    if (loadMapBtn && mapConsent) {
        loadMapBtn.addEventListener("click", loadMap);
    }

    let lastActiveEl = null;
    let lastModalTabbables = [];

    function getTabbables(root) {
        if (!root) return [];
        const selectors = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ];
        return Array.from(root.querySelectorAll(selectors.join(",")))
            .filter((el) => el.offsetParent !== null && !el.hasAttribute("disabled"));
    }

    function openDonationModal() {
        if (!donationModal) return;
        lastActiveEl = document.activeElement;
        donationModal.classList.add("is-open");
        donationModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        lastModalTabbables = getTabbables(donationModal);
        const closeBtn = donationModal.querySelector(".modal__close");
        if (closeBtn) closeBtn.focus();
    }

    function closeDonationModal() {
        if (!donationModal) return;
        donationModal.classList.remove("is-open");
        donationModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lastModalTabbables = [];
        if (lastActiveEl && typeof lastActiveEl.focus === "function") lastActiveEl.focus();
    }

    if (donateNowBtn) donateNowBtn.addEventListener("click", openDonationModal);

    closeEls.forEach((el) => el.addEventListener("click", closeDonationModal));

    document.addEventListener("keydown", (e) => {
        const modalOpen = donationModal && donationModal.classList.contains("is-open");

        if (e.key === "Escape") {
            if (modalOpen) closeDonationModal();
            if (navToggle && navLinks && navToggle.getAttribute("aria-expanded") === "true") setNavOpen(false);
            return;
        }

        if (e.key === "Tab" && modalOpen) {
            const tabbables = lastModalTabbables.length ? lastModalTabbables : getTabbables(donationModal);
            if (!tabbables.length) return;

            const first = tabbables[0];
            const last = tabbables[tabbables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
});
