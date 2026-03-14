document.addEventListener("DOMContentLoaded", function() {
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
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Expected from Visitors:</strong> ${event.expected}</p>
            <p><strong>Significance:</strong> ${event.significance}</p>
        `;
        eventList.appendChild(eventDiv);
    });

    const newsFeedDiv = document.getElementById("news-feed");
    newsFeed.forEach(newsItem => {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("news-item");
        newsDiv.innerHTML = `
            <h4>${newsItem.title}</h4>
            <p>${newsItem.content}</p>
            <a href="${newsItem.link}" target="_blank">Watch Live</a>
        `;
        newsFeedDiv.appendChild(newsDiv);
    });
});
