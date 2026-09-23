/* Nodira's BAD — FAQ accordion */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var q = item.querySelector(".accordion-q");
    var a = item.querySelector(".accordion-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".accordion-item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".accordion-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
});
