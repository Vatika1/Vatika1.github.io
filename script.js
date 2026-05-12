/* =====================================================
   Vatika Prasad — Portfolio
   Vanilla JS. No dependencies.
   ===================================================== */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
  };

  const openMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileNav.hidden = false;
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll(".primary-nav a[href^='#']");
  const sectionIds = Array.from(navLinks)
    .map((a) => a.getAttribute("href"))
    .filter((href) => href && href.length > 1)
    .map((href) => href.slice(1));

  const sectionEls = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sectionEls.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
    };

    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionEls.forEach((el) => navObserver.observe(el));
  }

  /* ---------- Scroll-fade-in reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Contact form (Formspree AJAX) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit");

  if (form && status && submitBtn) {
    const setStatus = (msg, type) => {
      status.textContent = msg;
      status.classList.remove("success", "error");
      if (type) status.classList.add(type);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const labelEl = submitBtn.querySelector(".btn-label");
      const originalLabel = labelEl ? labelEl.textContent : "";
      if (labelEl) labelEl.textContent = "Sending…";
      submitBtn.disabled = true;
      setStatus("", null);

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          setStatus("Thanks — I'll be in touch.", "success");
        } else {
          let detail = "";
          try {
            const json = await res.json();
            if (json && Array.isArray(json.errors) && json.errors.length) {
              detail = " (" + json.errors.map((er) => er.message).join(", ") + ")";
            }
          } catch (_) {}
          setStatus(
            "Something went wrong sending your message" + detail + ". Please email me directly at vatikaprasad@gmail.com.",
            "error"
          );
        }
      } catch (err) {
        setStatus(
          "Network error. Please email me directly at vatikaprasad@gmail.com.",
          "error"
        );
      } finally {
        if (labelEl) labelEl.textContent = originalLabel;
        submitBtn.disabled = false;
      }
    });
  }
})();
