(function () {
  "use strict";
  var root = document.getElementById("artistRoot");
  var list = window.ARTISTS || [];
  var slug = new URLSearchParams(location.search).get("a");
  var i = list.findIndex(function (a) { return a.slug === slug; });

  if (i === -1) {
    root.innerHTML =
      '<section class="wrap artist-missing"><h1 class="artist-hero__name">Artist not found</h1>' +
      '<p>Choose an artist from the line-up.</p><a class="btn" href="index.html#artists">See the line-up</a></section>';
    return;
  }

  var a = list[i];
  var next = list[(i + 1) % list.length];
  var prev = list[(i - 1 + list.length) % list.length];

  document.title = a.name + " | Sarkar Fest 2026";

  root.innerHTML =
    '<section class="artist-hero' + (a.wide ? ' artist-hero--wide' : '') + '">' +
      '<span class="artist-hero__letter" aria-hidden="true">' + a.initial + "</span>" +
      '<img class="artist-hero__img" src="' + a.image + '" alt="' + a.name + '" onerror="this.remove()">' +
      '<div class="wrap artist-hero__inner">' +
        '<a class="back" href="index.html#artists">Back to line-up</a>' +
        '<p class="artist-hero__genre">' + a.genre + " from " + a.origin + "</p>" +
        '<h1 class="artist-hero__name">' + a.name + "</h1>" +
        '<p class="artist-hero__tag">' + a.tagline + "</p>" +
      "</div>" +
    "</section>" +

    '<section class="wrap artist-body">' +
      '<div class="artist-bio">' +
        '<h2 class="h-small">The story</h2>' +
        a.bio.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
        '<h2 class="h-small">Songs to know</h2>' +
        '<ul class="chips">' + a.songs.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" +
      "</div>" +
      '<aside class="artist-side">' +
        '<h2 class="h-small">At a glance</h2>' +
        '<dl class="facts facts--tight">' +
          a.facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>"; }).join("") +
        "</dl>" +
        '<a class="btn btn--ghost" href="' + a.instagram + '" target="_blank" rel="noopener">Follow on Instagram</a>' +
      "</aside>" +
    "</section>" +

    '<section class="artist-event">' +
      '<div class="wrap artist-event__inner">' +
        "<p><strong>" + a.short + " live at Sarkar Fest 2026</strong><br>Wednesday 2 December 2026, The Tivoli, Brisbane. Doors 7:00 PM, 18+.</p>" +
        '<a class="btn btn--dark" data-ticket href="#">GET TICKETS</a>' +
      "</div>" +
    "</section>" +

    '<nav class="wrap artist-nav" aria-label="Other artists">' +
      '<a href="artist.html?a=' + prev.slug + '"><span>Previous</span>' + prev.name + "</a>" +
      '<a href="artist.html?a=' + next.slug + '"><span>Next</span>' + next.name + "</a>" +
    "</nav>";

  /* Ticket buttons created after main.js ran need the URL too */
  if (typeof SITE !== "undefined") {
    root.querySelectorAll("[data-ticket]").forEach(function (el) {
      el.href = SITE.ticketUrl; el.target = "_blank"; el.rel = "noopener";
    });
  }
})();
