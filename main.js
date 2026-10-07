/* ===== SITE SETTINGS: edit these in one place ===== */
const SITE = {
  ticketUrl: "https://tickets.oztix.com.au/outlet/event/7606cae9-59d7-4f20-b719-22cf6d9047fb?utm_source=Oztix&utm_medium=Website&utm_content=search&utm_term=Sarkar%20Fest%202026",
  // Event start: Doors 7:00 PM, Brisbane time (AEST, UTC+10, no daylight saving)
  eventStart: "2026-12-02T19:00:00+10:00",
  instagram: "https://www.instagram.com/",   // replace with the Sarkar Entertainment Instagram URL
  facebook: "https://www.facebook.com/",     // replace with the Sarkar Entertainment Facebook URL
  contactEmail: "hello@example.com"          // replace with the real contact email
};

(function () {
  "use strict";

  /* Ticket links */
  document.querySelectorAll("[data-ticket]").forEach(function (a) {
    a.href = SITE.ticketUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* Social + contact links */
  var ig = document.querySelector("[data-social=instagram]");
  var fb = document.querySelector("[data-social=facebook]");
  var ct = document.querySelector("[data-contact]");
  if (ig) ig.href = SITE.instagram;
  if (fb) fb.href = SITE.facebook;
  if (ct) ct.href = "mailto:" + SITE.contactEmail;

  /* Footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.classList.toggle("nav-open", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* Header gets a solid background after scrolling */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Countdown */
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date(SITE.eventStart).getTime();
    var endTime = target + 6 * 60 * 60 * 1000; // treat event as live for 6 hours
    var els = {};
    cd.querySelectorAll("[data-cd]").forEach(function (el) { els[el.dataset.cd] = el; });
    var msg = document.getElementById("countdownMsg");
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var timer;

    function setNum(el, val) {
      if (el.textContent !== val) {
        el.textContent = val;
        el.classList.remove("tick");
        void el.offsetWidth; // restart animation
        el.classList.add("tick");
      }
    }

    function update() {
      var now = Date.now();
      var diff = target - now;
      if (diff <= 0) {
        cd.hidden = true;
        msg.hidden = false;
        msg.textContent = now < endTime ? "Doors are open. It's Sarkar Fest night!" : "Thanks for celebrating with us. See you next year.";
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      setNum(els.days, pad(Math.floor(s / 86400)));
      setNum(els.hours, pad(Math.floor(s % 86400 / 3600)));
      setNum(els.minutes, pad(Math.floor(s % 3600 / 60)));
      setNum(els.seconds, pad(s % 60));
    }
    update();
    timer = setInterval(update, 1000);
  }

  /* Artist cards on the homepage */
  var grid = document.getElementById("artistGrid");
  if (grid && window.ARTISTS) {
    grid.innerHTML = window.ARTISTS.map(function (a) {
      return (
        '<a class="artist-card' + (a.wide ? ' artist-card--wide' : '') + '" href="artist.html?a=' + a.slug + '" aria-label="' + a.name + ': read more">' +
          '<span class="artist-card__letter" aria-hidden="true">' + a.initial + "</span>" +
          '<img class="artist-card__img" src="' + a.image + '" alt="' + a.name + '" loading="lazy" onerror="this.remove()">' +
          '<span class="artist-card__info">' +
            '<span class="artist-card__genre">' + a.genre + " from " + a.origin.split(",")[0] + "</span>" +
            '<span class="artist-card__name">' + a.name + "</span>" +
            '<span class="artist-card__cta">Read the story</span>' +
          "</span>" +
        "</a>"
      );
    }).join("");
  }
})();
