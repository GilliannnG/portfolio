(() => {
  // Keep local previews out of production analytics.
  if (
    location.protocol === "file:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  ) {
    return;
  }

  const measurementId = "G-LYG9Q47PVD";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tag);

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest("a[href]");
    if (link) {
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin) return;

      window.gtag("event", "portfolio_click", {
        link_text: (link.innerText || link.getAttribute("aria-label") || "").trim().slice(0, 100),
        link_url: `${destination.pathname}${destination.search}${destination.hash}`,
        element_type: "link",
        page_path: location.pathname,
      });
      return;
    }

    const control = event.target.closest(
      "[data-carousel-prev], [data-carousel-next], [data-carousel-dots] button, [data-contact-open]"
    );
    if (!control) return;

    const elementType = control.hasAttribute("data-contact-open")
      ? "contact"
      : "carousel_control";
    const label = control.getAttribute("aria-label") || control.innerText || elementType;
    window.gtag("event", "portfolio_click", {
      link_text: label.trim().slice(0, 100),
      element_type: elementType,
      page_path: location.pathname,
    });
  });
})();
