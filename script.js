if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("body").classList.add("darkmode");
    document.querySelector("header > img").src = "b/kgd-dark.png";
    document.querySelectorAll("main > div > img:nth-of-type(1):not(#anfang img)").forEach(img => {
        img.src = "b/trennstrich-dark.png";
    });
}

if (window.matchMedia('(min-width: 768px)').matches) {
    document.querySelector("#anfang img:nth-of-type(1)").src = "b/brownies-flipped.png";
}

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

if (topic) {
    const element = document.getElementById(topic);

    element.style.display = "block";
    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    
}
    
function openElement(id) {
    const element = document.getElementById(id);
    const url = new URL(window.location.href);
    
    if (element.style.display === "none") {
        element.style.display = "block";
        url.searchParams.set("topic", id);
        window.history.pushState({}, "", url);

    } else {
        element.style.display = "none";
        url.searchParams.delete("topic");
        history.pushState({}, "", url);
    }
}

async function goTo(id) {
    await openElement(id);

    document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
    
// --- Tooltip ---
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tooltip").forEach(tooltip => {
        const content = document.createElement("span");
        content.classList.add("tooltip-content");
        content.innerHTML = tooltip.dataset.tooltip;

        tooltip.appendChild(content);
    });

    document.body.addEventListener("click", (e) => {
        const tooltip = e.target.closest(".tooltip");
        const all = document.querySelectorAll(".tooltip");

        if (!tooltip) {
            all.forEach(t => t.classList.remove("show"));
            return;
        }

        // Klick auf einen Link nicht als Tooltip-Klick behandeln
        if (e.target.closest("a")) {
            return;
        }

        tooltip.classList.toggle("show");
    });
});

// --- Externe Links ---
document.addEventListener("DOMContentLoaded", () => {
    const externeLinks = document.querySelectorAll("a:not(a.intern-a)");
    const isDarkMode = document.body.classList.contains("darkmode");

    externeLinks.forEach(link => {
        const icon = document.createElement("img");
        icon.src = isDarkMode ? "b/extern-dark.png" : "b/extern.png";
        icon.alt = "";
        link.title = "Externer Link";
        icon.className = "extern-icon";

        if (link.closest("main > :last-child, .tooltip")) {
            icon.style.opacity = "0.5";
        }

        link.appendChild(icon);
    });
});

// --- h3 ---
const headers = document.querySelectorAll("h3");
const isDarkMode = document.body.classList.contains("darkmode");

headers.forEach(h3 => {
    const icon = document.createElement("img");

    icon.src = isDarkMode ? "b/arrow-dark.png" : "b/arrow.png";
    icon.alt = "";
    icon.className = "h3-icon";

    let isTop = false;

    h3.addEventListener("click", () => {
        isTop = !isTop;

        icon.src = isTop
            ? (isDarkMode ? "b/arrow-dark-top.png" : "b/arrow-top.png")
            : (isDarkMode ? "b/arrow-dark.png" : "b/arrow.png");
    });


    h3.appendChild(icon);
});
