(() => {
  const STORAGE_KEY = "sk-theme";
  const root = document.documentElement;
  const toast = document.getElementById("toast");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  /* ---------- Theme: dark/light with persistence ---------- */
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }

  const currentTheme = () =>
    root.getAttribute("data-theme") === "light" ? "light" : "dark";

  const syncIcon = () => {
    if (!themeIcon) return;
    themeIcon.textContent = currentTheme() === "light" ? "☀" : "☾";
  };
  syncIcon();

  let toastTimer;
  const showToast = (text) => {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const toggleTheme = () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    syncIcon();
    showToast(
      next === "light"
        ? "set -g theme light  // ☀"
        : "set -g theme dark   // ☾"
    );
  };

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  /* ---------- Konami code → same toggle ---------- */
  const konami = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];
  let progress = 0;
  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[progress]) {
      progress++;
      if (progress === konami.length) {
        progress = 0;
        toggleTheme();
        showToast("✶ konami unlocked");
      }
    } else {
      progress = key === konami[0] ? 1 : 0;
    }
  });

  /* ---------- Status bar: live clock ---------- */
  const clock = document.getElementById("sb-clock");
  if (clock) {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      clock.textContent = `${hh}:${mm}:${ss}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Nav: highlight current section on scroll ---------- */
  const sections = document.querySelectorAll("main .section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.removeAttribute("data-active"));
          const link = linkFor(entry.target.id);
          if (link) link.setAttribute("data-active", "true");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* Style the data-active nav link via JS so we don't need extra CSS classes */
  const style = document.createElement("style");
  style.textContent = `
    .nav-links a[data-active="true"] {
      background: var(--accent-soft);
      color: var(--accent);
    }
  `;
  document.head.appendChild(style);
})();
