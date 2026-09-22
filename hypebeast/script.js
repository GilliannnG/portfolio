const contactDialog = document.querySelector(".contact-dialog");

document.querySelectorAll("[data-contact-open]").forEach((button) => {
  button.addEventListener("click", () => contactDialog?.showModal());
});

document.querySelector("[data-contact-close]")?.addEventListener("click", () => {
  contactDialog?.close();
});

contactDialog?.addEventListener("click", (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

const navIdentity = document.querySelector("[data-nav-identity]");
const introIdentitySlot = document.querySelector("[data-intro-identity-slot]");

if (navIdentity && introIdentitySlot) {
  const homePage = document.body;

  const updateIdentityPosition = () => {
    const header = navIdentity.offsetParent;
    if (!header) return;

    const headerRect = header.getBoundingClientRect();
    const slotRect = introIdentitySlot.getBoundingClientRect();
    const sourceLeft = headerRect.left + navIdentity.offsetLeft;
    const sourceTop = headerRect.top + navIdentity.offsetTop;
    const sourceHeight = navIdentity.offsetHeight || 1;
    const scale = Math.min(1.88, Math.max(1, slotRect.height / sourceHeight));
    const scaleHeightOffset = ((sourceHeight * scale) - sourceHeight) / 2;

    homePage.style.setProperty("--identity-intro-x", `${slotRect.left - sourceLeft}px`);
    homePage.style.setProperty("--identity-intro-y", `${slotRect.top - sourceTop + scaleHeightOffset}px`);
    homePage.style.setProperty("--identity-intro-scale", scale.toFixed(3));
  };

  const setIntroState = (isInIntro) => {
    homePage.classList.toggle("identity-at-intro", isInIntro);
  };

  updateIdentityPosition();
  setIntroState(introIdentitySlot.getBoundingClientRect().bottom > 84);
  homePage.classList.add("identity-motion-prepared");

  requestAnimationFrame(() => {
    homePage.classList.add("identity-motion-ready");
  });

  const introObserver = new IntersectionObserver(([entry]) => {
    setIntroState(entry.isIntersecting);
  }, { rootMargin: "-84px 0px 0px 0px", threshold: 0 });

  const identityResizeObserver = new ResizeObserver(updateIdentityPosition);
  identityResizeObserver.observe(navIdentity);
  identityResizeObserver.observe(introIdentitySlot);
  introObserver.observe(introIdentitySlot);
}

document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const cards = [...carousel.querySelectorAll(".slot-card")];
  const dots = carousel.querySelector("[data-carousel-dots]");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  if (!track || cards.length === 0) return;

  let activeIndex = 0;
  let hasUserNavigated = false;

  const setActive = (index, shouldScroll = true) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-current", isActive ? "true" : "false");
    });
    dots?.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
    if (shouldScroll) {
      const card = cards[activeIndex];
      const left = card.offsetLeft - ((track.clientWidth - card.clientWidth) / 2);
      track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  };

  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show project ${index + 1}`);
    dot.addEventListener("click", () => {
      hasUserNavigated = true;
      setActive(index);
    });
    dots?.append(dot);
  });

  previous?.addEventListener("click", () => {
    hasUserNavigated = true;
    setActive(activeIndex - 1);
  });
  next?.addEventListener("click", () => {
    hasUserNavigated = true;
    setActive(activeIndex + 1);
  });

  ["pointerdown", "touchstart", "wheel"].forEach((eventName) => {
    track.addEventListener(eventName, () => {
      hasUserNavigated = true;
    }, { passive: true });
  });

  const visibility = new Map(cards.map((card) => [card, 0]));
  const observer = new IntersectionObserver((entries) => {
    if (!hasUserNavigated) return;
    entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
    const mostVisible = [...visibility.entries()]
      .sort(([, a], [, b]) => b - a)[0]?.[0];
    if (mostVisible) setActive(cards.indexOf(mostVisible), false);
  }, { root: track, threshold: [0.2, 0.55, 0.8] });
  cards.forEach((card) => observer.observe(card));

  setActive(activeIndex, false);
  requestAnimationFrame(() => setActive(activeIndex));
});
