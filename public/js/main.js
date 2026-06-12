/* =============================================================================
   BAA site — shared header/footer injection + interactions.
   Each page sets <body data-page="home"> (etc.) to drive active-link state.
   Keeping nav/footer in one place means the nonprofit edits links once.
   ============================================================================ */
(function () {
  "use strict";

  var YEAR = new Date().getFullYear();

  // Single source of truth for navigation. Update links here, every page updates.
  var NAV = [
    { id: "home", label: "Home", href: "index.html" },
    {
      id: "about", label: "About", href: "about.html",
      sub: [
        { label: "About Us", href: "about.html" },
        { label: "Officers & State Reps", href: "officers.html" },
        { label: "Hall of Fame & History", href: "hall-of-fame.html" },
        { label: "Sponsors", href: "sponsors.html" },
        { label: "Contact Us", href: "contact.html" }
      ]
    },
    {
      id: "tournaments", label: "Tournaments", href: "tournaments.html",
      sub: [
        { label: "Tournaments Overview", href: "tournaments.html" },
        { label: "BAA World Championship", href: "world-championship.html" },
        { label: "Tournament Sanctioning", href: "sanctioning.html" },
        { label: "Bowfisher of the Year", href: "bowfisher-of-the-year.html" }
      ]
    },
    { id: "records", label: "Records", href: "records.html" },
    { id: "redzone", label: "Red Zone Maps", href: "red-zone-maps.html" },
    { id: "guides", label: "Guide Services", href: "guide-services.html" },
    { id: "store", label: "Store", href: "store.html" }
  ];

  var SOCIAL = {
    facebook: "https://www.facebook.com/bowfishingassociation/",
    instagram: "https://www.instagram.com/bowfishingassociationofamerica/"
  };

  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08zm6.95-9.22a1.28 1.28 0 1 1-2.56 0 1.28 1.28 0 0 1 2.56 0z"/></svg>'
  };

  function navItem(item, currentPage) {
    var isCurrent = item.id === currentPage;
    var link = '<a class="nav__link" href="' + item.href + '"' +
      (isCurrent ? ' aria-current="page"' : '') + '>' + item.label +
      (item.sub ? ' <span class="nav__caret">▾</span>' : '') + '</a>';
    if (!item.sub) return '<li>' + link + '</li>';
    var sub = item.sub.map(function (s) {
      return '<li><a href="' + s.href + '">' + s.label + '</a></li>';
    }).join('');
    return '<li>' + link + '<ul class="nav__sub">' + sub + '</ul></li>';
  }

  function buildHeader(currentPage) {
    var menu = NAV.map(function (i) { return navItem(i, currentPage); }).join('');
    return '' +
      '<header class="site-header">' +
        '<div class="container nav">' +
          '<a class="nav__brand" href="index.html" aria-label="BAA home">' +
            '<img src="images/baa-logo.png" alt="BAA logo" width="48" height="48">' +
            '<span class="nav__brand-text"><strong>Bowfishing Association</strong><span>of America</span></span>' +
          '</a>' +
          '<button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '</button>' +
          '<ul class="nav__menu">' + menu +
            '<li class="nav__cta"><a class="btn btn--primary" href="join.html">Join Now</a></li>' +
          '</ul>' +
        '</div>' +
      '</header>';
  }

  function footerLinks(items) {
    return items.map(function (i) {
      return '<li><a href="' + i.href + '">' + i.label + '</a></li>';
    }).join('');
  }

  function buildFooter() {
    return '' +
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="footer__grid">' +
            '<div>' +
              '<div class="footer__brand">' +
                '<img src="images/baa-logo.png" alt="BAA logo" width="52" height="52">' +
                '<div><strong>Bowfishing Association of America</strong><span>Est. 1990 · 501(c)(3)</span></div>' +
              '</div>' +
              '<p style="max-width:38ch">Preserving, protecting and providing education on the sport of bowfishing — protecting the rights of bowfishermen since 1990.</p>' +
              '<div class="footer__social">' +
                '<a href="' + SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.facebook + '</a>' +
                '<a href="' + SOCIAL.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + '</a>' +
              '</div>' +
            '</div>' +
            '<div><h4>Explore</h4><ul class="footer__links">' + footerLinks([
              { label: "About Us", href: "about.html" },
              { label: "Officers", href: "officers.html" },
              { label: "Hall of Fame", href: "hall-of-fame.html" },
              { label: "Sponsors", href: "sponsors.html" }
            ]) + '</ul></div>' +
            '<div><h4>Compete</h4><ul class="footer__links">' + footerLinks([
              { label: "World Championship", href: "world-championship.html" },
              { label: "Tournament Sanctioning", href: "sanctioning.html" },
              { label: "Bowfisher of the Year", href: "bowfisher-of-the-year.html" },
              { label: "Records", href: "records.html" }
            ]) + '</ul></div>' +
            '<div><h4>Resources</h4><ul class="footer__links">' + footerLinks([
              { label: "Red Zone Maps", href: "red-zone-maps.html" },
              { label: "Guide Services", href: "guide-services.html" },
              { label: "Store", href: "store.html" },
              { label: "Join the BAA", href: "join.html" },
              { label: "Contact", href: "contact.html" }
            ]) + '</ul></div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<span>© ' + YEAR + ' Bowfishing Association of America. All rights reserved.</span>' +
            '<span>A 501(c)(3) non-profit organization · Est. 1990</span>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function mountChrome() {
    var page = document.body.getAttribute("data-page") || "";
    var headerSlot = document.getElementById("site-header");
    var footerSlot = document.getElementById("site-footer");
    if (headerSlot) headerSlot.outerHTML = buildHeader(page);
    if (footerSlot) footerSlot.outerHTML = buildFooter();
  }

  function wireMenu() {
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.querySelector(".nav__menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && !e.target.closest(".nav__caret")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function loadAnalytics() {
    // Firebase Analytics, loaded as a module so it never blocks rendering.
    // Skips localhost so dev traffic doesn't pollute the metrics.
    var host = location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host === "") return;
    var s = document.createElement("script");
    s.type = "module";
    s.src = "js/firebase-config.js";
    document.head.appendChild(s);
  }

  function init() {
    mountChrome();
    wireMenu();
    wireReveal();
    loadAnalytics();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
