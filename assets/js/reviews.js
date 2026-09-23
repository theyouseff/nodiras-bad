/* Nodira's BAD — "Write a Review" modali va localStorage orqali sharhlarni saqlash. */

window.BADReviews = (function () {
  var STORAGE_PREFIX = "bad_reviews_";

  function getReviews(productId) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + productId);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveReview(productId, review) {
    var list = getReviews(productId);
    list.push(review);
    try {
      localStorage.setItem(STORAGE_PREFIX + productId, JSON.stringify(list));
    } catch (e) { /* localStorage to'lgan yoki bloklangan bo'lishi mumkin — jim o'tkazamiz */ }
  }

  function starInputHTML(fieldName, labelText, required) {
    return (
      '<div class="field-group' + (required ? " field-group--required" : "") + '">' +
        '<div>' +
          '<span class="field-label">' + labelText + (required ? "*" : "") + '</span>' +
        '</div>' +
        '<div>' +
          '<span class="star-input" data-field="' + fieldName + '" data-value="0">' +
            [1,2,3,4,5].map(function (n) { return '<span class="star" data-star="' + n + '">★</span>'; }).join("") +
          '</span>' +
          '<span class="star-input-label">Baholash uchun bosing</span>' +
        '</div>' +
      '</div>'
    );
  }

  function buildModal() {
    if (document.getElementById("reviewModal")) return;
    var overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "reviewModal";
    overlay.innerHTML =
      '<div class="modal modal--review" role="dialog" aria-modal="true">' +
        '<button class="modal-close" aria-label="Yopish">✕</button>' +
        '<div class="review-modal-head">' +
          '<img id="rm-image" src="" alt="">' +
          '<div>' +
            '<span class="eyebrow">Sharh qoldirish</span>' +
            '<h3 id="rm-name"></h3>' +
          '</div>' +
        '</div>' +

        '<form class="review-form" id="rm-form" novalidate>' +
          '<div class="form-error" id="rm-error"></div>' +

          starInputHTML("rating", "Umumiy baho", true) +

          '<div class="field-group field-group--stack">' +
            '<label for="rm-title">Sharh sarlavhasi <span class="field-hint">(ixtiyoriy, maksimal 50 belgi)</span></label>' +
            '<input class="field-input" id="rm-title" maxlength="50" placeholder="Masalan: Ajoyib natija!">' +
          '</div>' +

          '<div class="field-group field-group--stack">' +
            '<label for="rm-text">Sharhingiz*</label>' +
            '<textarea class="field-input" id="rm-text" placeholder="Bu mahsulotni bir oy oldin sotib oldim va..." required></textarea>' +
            '<div class="media-row">' +
              '<button type="button" class="chip-btn" data-media="photo">+ Rasm qo\'shish</button>' +
              '<button type="button" class="chip-btn" data-media="video">+ Video qo\'shish</button>' +
              '<span class="hint">6 tagacha rasm qo\'shishingiz mumkin</span>' +
            '</div>' +
          '</div>' +

          '<div class="field-group">' +
            '<span class="field-label">Do\'stingizga tavsiya qilasizmi?</span>' +
            '<div class="toggle-row" data-field="recommend">' +
              '<button type="button" data-value="yes">Ha</button>' +
              '<button type="button" data-value="no">Yo\'q</button>' +
            '</div>' +
          '</div>' +

          starInputHTML("quality", "Sifat", false) +
          starInputHTML("routine", "Kundalik rejaga qo'shishdan mamnunman", false) +

          '<div class="field-group">' +
            '<label for="rm-gender">Jinsingiz</label>' +
            '<select class="field-input" id="rm-gender">' +
              '<option value="">Tanlang</option>' +
              '<option value="ayol">Ayol</option>' +
              '<option value="erkak">Erkak</option>' +
              '<option value="none">Aytishni xohlamayman</option>' +
            '</select>' +
          '</div>' +

          '<div class="field-group">' +
            '<label for="rm-firsttime">Bu mahsulotni birinchi marta sinab ko\'ryapsizmi?</label>' +
            '<select class="field-input" id="rm-firsttime">' +
              '<option value="">Tanlang</option>' +
              '<option value="ha">Ha</option>' +
              '<option value="yoq">Yo\'q, doimiy ishlataman</option>' +
            '</select>' +
          '</div>' +

          '<div class="field-group">' +
            '<label for="rm-readreviews">Sotib olishdan oldin sharhlarni o\'qidingizmi?</label>' +
            '<select class="field-input" id="rm-readreviews">' +
              '<option value="">Tanlang</option>' +
              '<option value="ha">Ha</option>' +
              '<option value="yoq">Yo\'q</option>' +
            '</select>' +
          '</div>' +

          '<div class="field-group">' +
            '<label for="rm-purchase">Mahsulotni qayerdan sotib oldingiz?</label>' +
            '<select class="field-input" id="rm-purchase">' +
              '<option value="">Tanlang</option>' +
              '<option value="dokon">Rasmiy do\'kon</option>' +
              '<option value="onlayn">Onlayn do\'kon</option>' +
              '<option value="apteka">Apteka</option>' +
              '<option value="tavsiya">Do\'st tavsiyasi orqali</option>' +
            '</select>' +
          '</div>' +

          '<div class="field-group field-group--stack">' +
            '<label for="rm-nickname">Taxallus* <span class="field-hint">(maksimal 25 belgi)</span></label>' +
            '<input class="field-input" id="rm-nickname" maxlength="25" placeholder="Masalan: nodira27" required>' +
          '</div>' +
          '<div class="field-group field-group--stack">' +
            '<label for="rm-location">Manzil <span class="field-hint">(ixtiyoriy)</span></label>' +
            '<input class="field-input" id="rm-location" placeholder="Masalan: Toshkent">' +
          '</div>' +
          '<div class="field-group field-group--stack">' +
            '<label for="rm-email">Email*</label>' +
            '<input class="field-input" id="rm-email" type="email" placeholder="email@example.com" required>' +
          '</div>' +

          '<div class="field-group field-group--stack">' +
            '<label>Nodira\'s BAD ni do\'stingizga tavsiya qilasizmi?</label>' +
            '<div class="nps-row" data-field="nps">' +
              Array.from({length: 11}, function (_, n) {
                return '<button type="button" data-value="' + n + '">' + n + '</button>';
              }).join("") +
            '</div>' +
            '<div class="nps-labels"><span>Hech qachon</span><span>Albatta</span></div>' +
          '</div>' +

          '<div class="checkbox-row">' +
            '<input type="checkbox" id="rm-terms" required>' +
            '<label for="rm-terms">Men <a href="faq.html">shartlar</a> bilan tanishib chiqdim va roziman.*</label>' +
          '</div>' +
          '<p class="consent-note">Ushbu sharh yuborilgandan so\'ng siz bilan bog\'liq elektron xatlar kelishi mumkin. Istalgan vaqtda obunani bekor qilishingiz mumkin.</p>' +

          '<button type="submit" class="btn btn-primary btn-block">Sharhni joylash</button>' +
        '</form>' +

        '<div class="form-success" id="rm-success">' +
          '<div class="icon">✓</div>' +
          '<h3>Rahmat! Sharhingiz saqlandi.</h3>' +
          '<p>Fikringiz uchun tashakkur — u mahsulot sahifasida ko\'rinadi.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    window.BADApp.wireOverlayDismiss(overlay);
    wireForm(overlay);
  }

  function wireForm(overlay) {
    /* star inputs */
    overlay.querySelectorAll(".star-input").forEach(function (starEl) {
      starEl.addEventListener("click", function (e) {
        var star = e.target.closest(".star");
        if (!star) return;
        var value = parseInt(star.getAttribute("data-star"), 10);
        starEl.setAttribute("data-value", value);
        starEl.classList.add("is-rated");
        starEl.querySelectorAll(".star").forEach(function (s) {
          s.classList.toggle("is-on", parseInt(s.getAttribute("data-star"), 10) <= value);
        });
      });
    });

    /* toggle row (recommend) */
    overlay.querySelectorAll(".toggle-row").forEach(function (row) {
      row.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        row.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        row.setAttribute("data-selected", btn.getAttribute("data-value"));
      });
    });

    /* nps row */
    var npsRow = overlay.querySelector(".nps-row");
    npsRow.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      npsRow.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      npsRow.setAttribute("data-selected", btn.getAttribute("data-value"));
    });

    /* media chips — placeholder only */
    overlay.querySelectorAll(".chip-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.textContent = btn.getAttribute("data-media") === "photo" ? "Tez orada qo'shiladi" : "Tez orada qo'shiladi";
        setTimeout(function () {
          btn.textContent = (btn.getAttribute("data-media") === "photo" ? "+ Rasm qo'shish" : "+ Video qo'shish");
        }, 1600);
      });
    });

    /* submit */
    var form = overlay.querySelector("#rm-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errorBox = overlay.querySelector("#rm-error");
      var productId = overlay.getAttribute("data-current-id");
      var ratingEl = overlay.querySelector('.star-input[data-field="rating"]');
      var rating = parseInt(ratingEl.getAttribute("data-value"), 10) || 0;
      var text = overlay.querySelector("#rm-text").value.trim();
      var nickname = overlay.querySelector("#rm-nickname").value.trim();
      var email = overlay.querySelector("#rm-email").value.trim();
      var terms = overlay.querySelector("#rm-terms").checked;
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      var missing = [];
      if (!rating) missing.push("umumiy baho");
      if (!text) missing.push("sharh matni");
      if (!nickname) missing.push("taxallus");
      if (!emailOk) missing.push("to'g'ri email");
      if (!terms) missing.push("shartlarga rozilik");

      if (missing.length) {
        errorBox.textContent = "Iltimos, to'ldiring: " + missing.join(", ") + ".";
        errorBox.classList.add("is-visible");
        return;
      }
      errorBox.classList.remove("is-visible");

      var review = {
        rating: rating,
        title: overlay.querySelector("#rm-title").value.trim(),
        text: text,
        recommend: (overlay.querySelector('.toggle-row[data-field="recommend"]').getAttribute("data-selected") || ""),
        quality: parseInt(overlay.querySelector('.star-input[data-field="quality"]').getAttribute("data-value"), 10) || 0,
        routine: parseInt(overlay.querySelector('.star-input[data-field="routine"]').getAttribute("data-value"), 10) || 0,
        gender: overlay.querySelector("#rm-gender").value,
        firstTime: overlay.querySelector("#rm-firsttime").value,
        readReviews: overlay.querySelector("#rm-readreviews").value,
        wherePurchased: overlay.querySelector("#rm-purchase").value,
        nickname: nickname,
        location: overlay.querySelector("#rm-location").value.trim(),
        email: email,
        nps: overlay.querySelector('.nps-row').getAttribute("data-selected") || "",
        date: new Date().toISOString()
      };

      saveReview(productId, review);
      form.style.display = "none";
      overlay.querySelector("#rm-success").classList.add("is-visible");

      setTimeout(function () {
        window.BADApp.closeModal(overlay);
        resetForm(overlay);
        window.BADApp.openProductModal(productId);
      }, 1500);
    });
  }

  function resetForm(overlay) {
    var form = overlay.querySelector("#rm-form");
    form.reset();
    form.style.display = "block";
    overlay.querySelector("#rm-success").classList.remove("is-visible");
    overlay.querySelector("#rm-error").classList.remove("is-visible");
    overlay.querySelectorAll(".star-input").forEach(function (s) {
      s.setAttribute("data-value", "0");
      s.classList.remove("is-rated");
      s.querySelectorAll(".star").forEach(function (st) { st.classList.remove("is-on"); });
    });
    overlay.querySelectorAll(".toggle-row, .nps-row").forEach(function (row) {
      row.removeAttribute("data-selected");
      row.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
    });
  }

  function open(productId) {
    buildModal();
    var overlay = document.getElementById("reviewModal");
    resetForm(overlay);
    overlay.setAttribute("data-current-id", productId);
    var product = window.BADApp.getProduct(productId);
    if (product) {
      overlay.querySelector("#rm-image").src = product.image;
      overlay.querySelector("#rm-image").alt = product.name;
      overlay.querySelector("#rm-name").textContent = "Nodira's BAD " + product.name;
    }
    window.BADApp.openModal(overlay);
  }

  document.addEventListener("DOMContentLoaded", buildModal);

  return { open: open, getReviews: getReviews, saveReview: saveReview };
})();
