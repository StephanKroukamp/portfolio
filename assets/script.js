(() => {
  const STORAGE_KEY = "sk-theme";
  const root = document.documentElement;
  const toast = document.getElementById("toast");
  const avatar = document.getElementById("avatar");

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }

  let toastTimer;
  const showToast = (text) => {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
  };

  const toggleTheme = () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    showToast(next === "light" ? "Light mode ☀️" : "Dark mode 🌙");
  };

  if (avatar) {
    avatar.addEventListener("click", toggleTheme);
  }

  // Konami code easter egg → same toggle
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
        showToast("✨ Konami unlocked");
      }
    } else {
      progress = key === konami[0] ? 1 : 0;
    }
  });

  // Highlight current section in nav
  const sections = document.querySelectorAll("main .section");
  const navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.style.color = "");
            const link = linkFor(entry.target.id);
            if (link) link.style.color = "var(--accent)";
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
