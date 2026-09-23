/* Nodira's BAD — umumiy sayt logikasi: nav, mahsulot grid/filter, tafsilot modali. */

window.BADApp = (function () {
  function formatSom(n) {
    return n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
  }

  function starsMarkup(rating) {
    var full = Math.round(rating * 2) / 2;
    var html = "";
    for (var i = 1; i <= 5; i++) {
      if (full >= i) {
        html += "★";
      } else if (full >= i - 0.5) {
        html += "★";
      } else {
        html += '<span class="muted">★</span>';
      }
    }
    return html;
  }

  function getProduct(id) {
    return BAD_PRODUCTS.find(function (p) { return p.id === id; });
  }

  function getCategory(id) {
    return BAD_CATEGORIES.find(function (c) { return c.id === id; });
  }

  function reviewCountFor(product) {
    var stored = (window.BADReviews ? window.BADReviews.getReviews(product.id) : []);
    return product.reviewsSeed + stored.length;
  }

  function productCardHTML(p) {
    var cat = getCategory(p.category);
    return (
      '<article class="product-card" data-id="' + p.id + '" data-category="' + p.category + '" tabindex="0">' +
        '<div class="product-card__media">' +
          '<span class="product-card__badge">-' + p.discountPercent + '%</span>' +
          '<button type="button" class="product-card__wishlist" aria-label="Sevimlilarga qo\'shish">&#9825;</button>' +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        '</div>' +
        '<div class="product-card__body">' +
          '<span class="product-card__cat">' + cat.name + '</span>' +
          '<h3 class="product-card__name">' + p.name + '</h3>' +
          '<span class="product-card__form">' + p.form + '</span>' +
          '<div class="rating-row"><span class="stars">' + starsMarkup(p.rating) + '</span><span>' + p.rating.toFixed(1) + ' (' + reviewCountFor(p) + ')</span></div>' +
          '<div class="price-row">' +
            '<span class="price-original">' + formatSom(p.price) + '</span>' +
            '<span class="price-sale">' + formatSom(p.sale) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ---------------- Modal helpers (shared) ---------------- */
  function openModal(overlay) {
    overlay.classList.add("is-open");
    document.body.classList.add("modal-locked");
    document.body.style.overflow = "hidden";
  }
  function closeModal(overlay) {
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-locked");
    document.body.style.overflow = "";
  }
  function wireOverlayDismiss(overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll(".modal-close").forEach(function (btn) {
      btn.addEventListener("click", function () { closeModal(overlay); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.is-open").forEach(closeModal);
    }
  });

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var mobileNav = document.querySelector(".mobile-nav");
    if (!toggle || !mobileNav) return;
    toggle.addEventListener("click", function () {
      document.body.classList.add("nav-open");
      mobileNav.style.display = "flex";
    });
    mobileNav.querySelectorAll(".mobile-nav-close, a").forEach(function (el) {
      el.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        mobileNav.style.display = "none";
      });
    });
  }

  /* ---------------- Product detail modal ---------------- */
  function buildDetailModal() {
    if (document.getElementById("productModal")) return;
    var overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "productModal";
    overlay.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
        '<button class="modal-close" aria-label="Yopish">✕</button>' +
        '<div class="detail-grid">' +
          '<div class="detail-media"><img id="pm-image" src="" alt=""></div>' +
          '<div class="detail-info">' +
            '<span class="eyebrow" id="pm-cat"></span>' +
            '<h3 id="pm-name"></h3>' +
            '<div class="detail-form" id="pm-form"></div>' +
            '<div class="detail-rating"><span class="stars" id="pm-stars"></span><span id="pm-rating-text"></span><a href="#" class="review-trigger" id="pm-review-link">Sharh yozish</a></div>' +
            '<div class="detail-price">' +
              '<span class="price-sale" id="pm-sale"></span>' +
              '<span class="price-original" id="pm-original"></span>' +
              '<span class="detail-discount" id="pm-discount"></span>' +
            '</div>' +
            '<p class="detail-desc" id="pm-desc"></p>' +
            '<div class="detail-actions">' +
              '<button class="btn btn-primary review-trigger">Sharh qoldirish</button>' +
              '<a class="btn btn-outline" href="where-to-buy.html">Qayerdan sotib olish</a>' +
            '</div>' +
          '</div>' +
          '<div class="reviews-block">' +
            '<h4>Mijozlar sharhlari</h4>' +
            '<div id="pm-reviews-list"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    wireOverlayDismiss(overlay);

    overlay.querySelectorAll(".review-trigger").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var id = overlay.getAttribute("data-current-id");
        closeModal(overlay);
        if (window.BADReviews) window.BADReviews.open(id);
      });
    });
  }

  function renderReviewsInto(container, productId) {
    var stored = window.BADReviews ? window.BADReviews.getReviews(productId) : [];
    if (!stored.length) {
      container.innerHTML = '<p class="review-empty">Hozircha sharhlar yo\'q. Birinchi bo\'lib fikringizni qoldiring!</p>';
      return;
    }
    var html = stored.slice().reverse().map(function (r) {
      return (
        '<div class="review-item">' +
          '<div class="review-item__head">' +
            '<span class="stars">' + starsMarkup(r.rating) + '</span>' +
            '<span class="review-item__name">' + escapeHTML(r.nickname) + '</span>' +
            (r.location ? '<span class="review-item__meta">• ' + escapeHTML(r.location) + '</span>' : '') +
          '</div>' +
          (r.title ? '<div class="review-item__title">' + escapeHTML(r.title) + '</div>' : '') +
          '<div class="review-item__text">' + escapeHTML(r.text) + '</div>' +
        '</div>'
      );
    }).join("");
    container.innerHTML = html;
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function openProductModal(id) {
    buildDetailModal();
    var p = getProduct(id);
    if (!p) return;
    var cat = getCategory(p.category);
    var overlay = document.getElementById("productModal");
    overlay.setAttribute("data-current-id", id);
    overlay.querySelector("#pm-image").src = p.image;
    overlay.querySelector("#pm-image").alt = p.name;
    overlay.querySelector("#pm-cat").textContent = cat.name;
    overlay.querySelector("#pm-name").textContent = p.name;
    overlay.querySelector("#pm-form").textContent = p.form;
    overlay.querySelector("#pm-stars").innerHTML = starsMarkup(p.rating);
    overlay.querySelector("#pm-rating-text").textContent = p.rating.toFixed(1) + " (" + reviewCountFor(p) + " ta sharh)";
    overlay.querySelector("#pm-sale").textContent = formatSom(p.sale);
    overlay.querySelector("#pm-original").textContent = formatSom(p.price);
    overlay.querySelector("#pm-discount").textContent = "-" + p.discountPercent + "%";
    overlay.querySelector("#pm-desc").textContent = p.description;
    renderReviewsInto(overlay.querySelector("#pm-reviews-list"), id);
    openModal(overlay);
  }

  function initProductClicks(root) {
    (root || document).addEventListener("click", function (e) {
      var wishlist = e.target.closest(".product-card__wishlist");
      if (wishlist) {
        e.stopPropagation();
        wishlist.classList.toggle("is-saved");
        wishlist.innerHTML = wishlist.classList.contains("is-saved") ? "&#9829;" : "&#9825;";
        return;
      }
      var card = e.target.closest(".product-card");
      if (card) openProductModal(card.getAttribute("data-id"));
    });
    (root || document).addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var card = e.target.closest(".product-card");
        if (card) openProductModal(card.getAttribute("data-id"));
      }
    });
  }

  /* ---------------- Grid renderers ---------------- */
  function renderGrid(container, products) {
    container.innerHTML = products.map(productCardHTML).join("");
  }

  function initCatalogPage() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;
    var emptyState = document.getElementById("productGridEmpty");
    var params = new URLSearchParams(window.location.search);
    var initialCat = params.get("category") || "all";

    renderGrid(grid, BAD_PRODUCTS);

    var buttons = document.querySelectorAll(".filter-btn");
    function applyFilter(cat) {
      buttons.forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-filter") === cat);
      });
      var filtered = cat === "all" ? BAD_PRODUCTS : BAD_PRODUCTS.filter(function (p) { return p.category === cat; });
      renderGrid(grid, filtered);
      if (emptyState) emptyState.style.display = filtered.length ? "none" : "block";
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { applyFilter(b.getAttribute("data-filter")); });
    });
    applyFilter(initialCat);
    initProductClicks(grid);
  }

  function initFeaturedSection() {
    var grid = document.getElementById("featuredGrid");
    if (!grid) return;
    var featuredIds = ["p06", "p14", "p23", "p25", "p02", "p19", "p33", "p10"];
    var featured = featuredIds.map(getProduct).filter(Boolean);
    renderGrid(grid, featured);
    initProductClicks(grid);
  }

  function initCategoryCards() {
    var grid = document.getElementById("categoryGrid");
    if (!grid) return;
    grid.innerHTML = BAD_CATEGORIES.map(function (c) {
      return (
        '<div class="category-card">' +
          '<img src="' + c.icon + '" alt="' + c.name + '">' +
          '<h3>' + c.name + '</h3>' +
          '<p>' + c.tagline + '</p>' +
          '<a class="btn btn-outline" href="products.html?category=' + c.id + '">Ko\'rish</a>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------------- Hero stat counters ---------------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count-target"));
    var decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    var suffix = el.getAttribute("data-count-suffix") || "";
    var duration = 3000;
    var startTime = null;
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  function initStatCounters() {
    var counters = document.querySelectorAll(".stat-num[data-count-target]");
    if (!counters.length) return;
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { observer.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initCategoryCards();
    initFeaturedSection();
    initCatalogPage();
    buildDetailModal();
    initStatCounters();
  });

  return {
    formatSom: formatSom,
    starsMarkup: starsMarkup,
    getProduct: getProduct,
    getCategory: getCategory,
    openModal: openModal,
    closeModal: closeModal,
    wireOverlayDismiss: wireOverlayDismiss,
    escapeHTML: escapeHTML,
    openProductModal: openProductModal,
    refreshOpenProduct: function (id) {
      var overlay = document.getElementById("productModal");
      if (overlay) renderReviewsInto(overlay.querySelector("#pm-reviews-list"), id);
    }
  };
})();
