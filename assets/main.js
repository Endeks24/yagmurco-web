(function () {
  var S = window.SITE || {};

  // 1) config.js'teki bilgileri sayfaya uygula
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-site-href]").forEach(function (el) {
    var spec = el.getAttribute("data-site-href");
    var parts = spec.split(":");
    var href = parts.length === 2 ? parts[0] + ":" + (S[parts[1]] || "") : S[spec];
    if (href) el.setAttribute("href", href);
  });
  if (S.name) {
    
    var og = document.querySelector('meta[property="og:title"]');
    
  }
  var wa = document.getElementById("waBtn");
  if (wa && S.whatsapp) wa.href = "https://wa.me/" + S.whatsapp;
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Kamera zaman kodu
  var tc = document.getElementById("timecode");
  if (tc) {
    var t0 = Date.now();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    setInterval(function () {
      var ms = Date.now() - t0, s = Math.floor(ms / 1000);
      tc.textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60) + ":" + pad(Math.floor((ms % 1000) / 40));
    }, 40);
  }

  // Özel imleç
  var cur = document.getElementById("cursor");
  var curLabel = document.getElementById("cursorLabel");
  if (cur && finePointer && !reduce) {
    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; cur.classList.add("is-on"); });
    (function loop() {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { curLabel.textContent = el.getAttribute("data-cursor"); cur.classList.add("is-big"); });
      el.addEventListener("mouseleave", function () { cur.classList.remove("is-big"); });
    });
  } else if (cur) { cur.style.display = "none"; }

  // Kartlarda fareyi takip eden ışık
  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("mousemove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // Prodüksiyon satır renkleri
  document.querySelectorAll(".prow").forEach(function (row) {
    row.style.setProperty("--c", row.getAttribute("data-color"));
  });

  // Mıknatıs efektli butonlar
  if (finePointer && !reduce) {
    document.querySelectorAll(".pill--big, .nav > .pill").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25, y = (e.clientY - r.top - r.height / 2) * 0.35;
        b.style.transform = "translate(" + x + "px," + y + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
  }

  // Footer'daki dev ismi ekran genişliğine sığdır
  var brand = document.querySelector(".footer__brand");
  function fit() {
    if (!brand) return;
    brand.style.fontSize = "100px";
    var cs = getComputedStyle(brand.parentElement); var w = brand.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    brand.style.fontSize = Math.min(100 * w / brand.scrollWidth, 400) + "px";
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  addEventListener("resize", fit); fit();

  // Açılıştaki değişen kelime
  var rot = document.getElementById("rotator");
  if (rot && !reduce) {
    var words = rot.getAttribute("data-words").split("|"), wi = 0;
    setInterval(function () {
      rot.classList.add("is-out");
      setTimeout(function () {
        wi = (wi + 1) % words.length;
        rot.textContent = words[wi];
        rot.classList.remove("is-out"); rot.classList.add("is-pre");
        void rot.offsetWidth;
        rot.classList.remove("is-pre");
      }, 450);
    }, 2600);
  }

  // Kaydırma: ilerleme çubuğu + giriş paralaksı
  var prog = document.getElementById("progress");
  var heroIn = document.querySelector(".hero__inner");
  var ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")";
    if (heroIn && !reduce && scrollY < innerHeight * 1.2) {
      heroIn.style.transform = "translateY(" + scrollY * 0.25 + "px)";
      heroIn.style.opacity = Math.max(0, 1 - scrollY / (innerHeight * 0.9));
    }
    ticking = false;
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // 2) Menü
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // 3) Kaydırınca beliren öğeler
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // 4) İletişim formu
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    status.className = "form__status";
    if (!form.checkValidity()) {
      status.textContent = "Lütfen zorunlu (*) alanları doldurun ve KVKK onayını işaretleyin.";
      status.classList.add("err");
      return;
    }
    var fd = new FormData(form);
    var hizmetler = fd.getAll("hizmet").join(", ");
    fd.delete("hizmet");
    fd.append("hizmetler", hizmetler || "-");

    if (S.formspreeId) {
      status.textContent = "Gönderiliyor…";
      fetch("https://formspree.io/f/" + S.formspreeId, {
        method: "POST", body: fd, headers: { Accept: "application/json" }
      }).then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        status.textContent = "Teşekkürler! Mesajınız alındı, kısa süre içinde dönüş yapacağız.";
        status.classList.add("ok");
      }).catch(function () {
        status.textContent = "Bir sorun oluştu. Lütfen e-posta ile ulaşın: " + (S.email || "");
        status.classList.add("err");
      });
    } else {
      var body =
        "Ad Soyad: " + fd.get("ad_soyad") + "\n" +
        "Kurum: " + (fd.get("kurum") || "-") + "\n" +
        "E-posta: " + fd.get("email") + "\n" +
        "Telefon: " + (fd.get("telefon") || "-") + "\n" +
        "Kurum türü: " + (fd.get("tur") || "-") + "\n" +
        "Hizmetler: " + hizmetler + "\n\n" + fd.get("mesaj");
      window.location.href = "mailto:" + (S.email || "") +
        "?subject=" + encodeURIComponent("Web sitesi teklif talebi – " + fd.get("ad_soyad")) +
        "&body=" + encodeURIComponent(body);
      status.textContent = "E-posta uygulamanız açılıyor…";
      status.classList.add("ok");
    }
  });
})();
