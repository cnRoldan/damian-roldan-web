const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealGroups = document.querySelectorAll("[data-reveal]");
let observer;
let scrollFrame = 0;

function updateProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  document.documentElement.style.setProperty("--scroll-progress", Math.min(1, Math.max(0, fraction)));
  scrollFrame = 0;
}

function scheduleProgress() {
  if (!motionPreference.matches && !scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}

function syncMotion() {
  if (motionPreference.matches) {
    observer?.disconnect();
    observer = undefined;
    revealGroups.forEach((element) => element.classList.remove("will-reveal"));
    window.removeEventListener("scroll", scheduleProgress);
    window.removeEventListener("resize", scheduleProgress);
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    return;
  }

  if ("IntersectionObserver" in window && !observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(({isIntersecting, target}) => {
        if (!isIntersecting) return;
        target.classList.remove("will-reveal");
        observer?.unobserve(target);
      });
    }, { rootMargin: "0px 0px -36px 0px", threshold: 0 });

    revealGroups.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add("will-reveal");
      observer.observe(element);
    });
  }

  window.addEventListener("scroll", scheduleProgress, {passive: true});
  window.addEventListener("resize", scheduleProgress);
  scheduleProgress();
}

document.querySelector(".service-list").addEventListener("toggle", scheduleProgress, true);
motionPreference.addEventListener("change", syncMotion);
syncMotion();
