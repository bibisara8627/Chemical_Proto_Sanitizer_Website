(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};

  /* ---- DOM helpers ---- */
  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };
  var el = function (tag, className, innerHTML) {
    var elem = document.createElement(tag);
    if (className) elem.className = className;
    if (innerHTML !== undefined) elem.innerHTML = innerHTML;
    return elem;
  };
  var esc = function (str) {
    var div = document.createElement("div");
    div.textContent = str === undefined || str === null ? "" : String(str);
    return div.innerHTML;
  };

  /* ==========================================================
     1. BRANDING & METADATA
     ========================================================== */
  $$("[data-brand]").forEach(function (node) {
    node.textContent = C.brandName || "PureTouch";
  });
  $$("[data-tagline]").forEach(function (node) {
    node.textContent = C.tagline || "";
  });
  if (C.brandName) {
    document.title = C.brandName + " Hand Sanitizer | Clean Hands, Confident Moments.";
  }
  var yrElem = $("#yr");
  if (yrElem) yrElem.textContent = new Date().getFullYear();

  var heroCredit = $("#heroCredit");
  if (heroCredit && C.heroImageCredit) {
    heroCredit.textContent = C.heroImageCredit;
  }

  /* ==========================================================
     2. ACCESSIBLE TOAST NOTIFICATIONS
     ========================================================== */
  var toastContainer = $("#toastContainer");
  function showToast(message, isError) {
    if (!toastContainer) return;
    var t = el("div", "toast" + (isError ? " toast--err" : ""));
    t.innerHTML = '<span aria-hidden="true">' + (isError ? "⚠️" : "✓") + "</span> " + esc(message);
    toastContainer.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 20);
    setTimeout(function () {
      t.classList.remove("show");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 350);
    }, 4000);
  }

  /* ==========================================================
     3. SCROLL PROGRESS BAR & BACK TO TOP & MOBILE BOTTOM BAR
     ========================================================== */
  var progressBar = $("#scrollProgress");
  var backToTopBtn = $("#backToTop");
  var bottomBar = $("#bottomBar");

  window.addEventListener("scroll", function () {
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) progressBar.style.width = scrolled + "%";

    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    if (bottomBar) {
      if (winScroll > 420) {
        bottomBar.classList.add("visible");
      } else {
        bottomBar.classList.remove("visible");
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================
     4. SHARE BUTTON (Web Share API with copy-link fallback)
     ========================================================== */
  var shareBtn = $("#btnShare");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var shareData = {
        title: (C.brandName || "PureTouch") + " Hand Sanitizer",
        text: (C.tagline || "") + " Student lab project.",
        url: window.location.href
      };
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          showToast("Link copied to clipboard!");
        }).catch(function () {
          showToast("Could not copy link", true);
        });
      } else {
        showToast("Share URL: " + window.location.href);
      }
    });
  }

  /* ==========================================================
     5. ACCESSIBLE MOBILE MENU
     ========================================================== */
  var navToggle = $(".nav__toggle"), navMenu = $("#menu");
  function setNavMenu(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNavMenu(!navMenu.classList.contains("open"));
    });
  }
  if (navMenu) {
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNavMenu(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNavMenu(false);
  });

  /* ==========================================================
     6. ACTIVE LINK HIGHLIGHTING (IntersectionObserver for 4 Main Links)
     ========================================================== */
  var mainLinks = {};
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        mainLinks[href.slice(1)] = a;
      }
    });
  }
  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          Object.keys(mainLinks).forEach(function (key) {
            var isCurrent = key === id;
            mainLinks[key].classList.toggle("active", isCurrent);
            if (isCurrent) {
              mainLinks[key].setAttribute("aria-current", "page");
            } else {
              mainLinks[key].removeAttribute("aria-current");
            }
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    Object.keys(mainLinks).forEach(function (key) {
      var sec = document.getElementById(key);
      if (sec) navObserver.observe(sec);
    });
  }

  /* ==========================================================
     7. PRODUCT GALLERY WITH LIGHTBOX
     ========================================================== */
  var galleryContainer = $("#productGallery");
  var lightboxDlg = $("#lightboxDlg");
  var lightboxImg = $("#lightboxImg");
  var lightboxCap = $("#lightboxCap");
  var lightboxClose = $("#lightboxClose");

  function openLightbox(src, caption, alt) {
    if (!lightboxDlg || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Enlarged product photo";
    if (lightboxCap) lightboxCap.textContent = caption || "";
    if (lightboxDlg.showModal) {
      lightboxDlg.showModal();
    } else {
      window.open(src, "_blank", "noopener");
    }
  }

  if (lightboxClose && lightboxDlg) {
    lightboxClose.addEventListener("click", function () { lightboxDlg.close(); });
    lightboxDlg.addEventListener("click", function (e) {
      if (e.target === lightboxDlg) lightboxDlg.close();
    });
  }

  if (galleryContainer) {
    var images = C.galleryImages || [];
    if (images.length > 0) {
      images.forEach(function (imgData) {
        var item = el("div", "gallery__item");
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-label", "Enlarge " + (imgData.alt || "image"));
        item.innerHTML = '<img src="' + esc(imgData.thumb || imgData.src) + '" alt="' + esc(imgData.alt || "Product photo") + '" loading="lazy" width="600" height="600">' +
          (imgData.caption ? '<div class="gallery__caption">' + esc(imgData.caption) + "</div>" : "");
        function activate() { openLightbox(imgData.src, imgData.caption, imgData.alt); }
        item.addEventListener("click", activate);
        item.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
        });
        galleryContainer.appendChild(item);
      });
    }

    // Honesty rule: Show placeholder tile if only 1 image or none
    if (images.length <= 1) {
      var phTile = el("div", "gallery__ph");
      phTile.innerHTML = '<div class="gallery__ph-icon" aria-hidden="true">📷</div>' +
        '<strong>More product photos to be added</strong>' +
        '<p class="fine" style="margin: 4px 0 0;">Add packaging or bottle photos in <code>js/config.js</code> under <code>galleryImages</code>.</p>';
      galleryContainer.appendChild(phTile);
    }
  }

  /* ==========================================================
     8. STRUCTURED DIRECTIONS & PRECAUTIONS BLOCK
     ========================================================== */
  var directionsList = $("#directionsList");
  if (directionsList && C.directions && C.directions.length) {
    directionsList.innerHTML = "";
    C.directions.forEach(function (d) {
      var li = el("li", "", esc(d) + ' <span class="tag tag--todo" style="font-size:0.7rem;">To be confirmed</span>');
      directionsList.appendChild(li);
    });
  }

  var precautionsList = $("#precautionsList");
  if (precautionsList && C.precautions && C.precautions.length) {
    precautionsList.innerHTML = "";
    C.precautions.forEach(function (p) {
      var li = el("li", "", esc(p));
      precautionsList.appendChild(li);
    });
  }

  /* ==========================================================
     9. FAQ ACCORDION
     ========================================================== */
  var faqContainer = $("#faqAccordion");
  if (faqContainer && C.faq && C.faq.length) {
    faqContainer.innerHTML = "";
    C.faq.forEach(function (item, idx) {
      var details = el("details", "faq-item");
      if (idx === 0) details.open = false;
      details.innerHTML = '<summary>' + esc(item.q) + '</summary>' +
        '<div class="faq-item__content"><p>' + esc(item.a) + '</p></div>';
      faqContainer.appendChild(details);
    });
  }

  /* ==========================================================
     10. MADE BY / MEET THE TEAM SUBSECTION
     ========================================================== */
  var acad = C.academic || {};
  if ($("#teamCollege")) $("#teamCollege").textContent = acad.college || "To be added / College Name";
  if ($("#teamDept")) $("#teamDept").textContent = acad.department || "To be added / Department of Chemistry";
  if ($("#teamCourse")) $("#teamCourse").textContent = acad.course || "To be added / Subject Name";
  if ($("#teamYear")) $("#teamYear").textContent = acad.academicYear || "To be added / Academic Year";
  if ($("#teamGuide")) $("#teamGuide").textContent = acad.guide || "To be added / Project Guide";

  var teamGrid = $("#teamGrid");
  if (teamGrid) {
    teamGrid.innerHTML = "";
    var teamList = Array.isArray(C.team) && C.team.length ? C.team : [
      { name: "Bibisara Shaikh", role: "Role to be added", photo: "" },
      { name: "Anushka Khaire", role: "Role to be added", photo: "" },
      { name: "Payal Bandagar", role: "Role to be added", photo: "" }
    ];

    teamList.forEach(function (m) {
      var parts = (m.name || "Student").trim().split(/\s+/);
      var initials = (parts[0].charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "")).toUpperCase();

      var card = el("article", "card team-card");
      var avatarHtml = m.photo ?
        '<div class="team-avatar"><img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" style="border-radius:50%;width:100%;height:100%;object-fit:cover;"></div>' :
        '<div class="team-avatar team-avatar--initials" title="' + esc(m.name) + '">' + esc(initials) + '</div>';

      card.innerHTML = avatarHtml +
        '<h4>' + esc(m.name) + '</h4>' +
        '<p style="color:var(--muted);margin:0 0 8px;">' + esc(m.role || "Role to be added") + '</p>' +
        '<span class="tag tag--todo">' + (m.role && m.role !== "Role to be added" ? "Student" : "Role to be added") + '</span>' +
        (m.linkedin ? '<p style="margin:10px 0 0;"><a href="' + esc(m.linkedin) + '" target="_blank" rel="noopener" class="fine">LinkedIn Profile →</a></p>' : "");

      teamGrid.appendChild(card);
    });
  }

  /* ==========================================================
     11. VIDEO BUILDER (Poster + play button + accessible video)
     ========================================================== */
  function buildVideo(v) {
    var wrap = el("div", "vid");
    var vid = el("video");
    vid.controls = true;
    vid.preload = "none";
    vid.playsInline = true;
    vid.hidden = true;
    if (v.poster) vid.poster = v.poster;
    vid.setAttribute("aria-label", v.title || "Video presentation");

    var src = el("source");
    src.src = v.src;
    src.type = "video/mp4";
    vid.appendChild(src);

    var fallback = el("p", "notice", "This video could not be loaded. Supported format: MP4 (H.264 video, AAC audio).");
    fallback.hidden = true;
    vid.addEventListener("error", function () {
      vid.hidden = true;
      fallback.hidden = false;
    }, true);

    var btn = el("button", "vid__poster");
    btn.type = "button";
    btn.setAttribute("aria-label", "Play video: " + (v.title || ""));
    if (v.poster) btn.style.backgroundImage = "url('" + v.poster + "')";
    btn.innerHTML = '<span class="vid__play" aria-hidden="true">▶</span><span class="vid__t">' + esc(v.title || "") + "</span>";

    btn.addEventListener("click", function () {
      btn.hidden = true;
      vid.hidden = false;
      vid.play().catch(function () {});
      vid.focus();
    });

    wrap.appendChild(vid);
    wrap.appendChild(btn);

    var container = el("div");
    container.appendChild(wrap);
    container.appendChild(fallback);
    if (v.caption) container.appendChild(el("p", "fine", esc(v.caption)));
    return container;
  }

  /* Making videos */
  var mv = $("#makingVideos");
  if (mv) {
    mv.innerHTML = "";
    if (C.makingVideos && C.makingVideos.length) {
      C.makingVideos.forEach(function (v) { mv.appendChild(buildVideo(v)); });
    } else {
      mv.appendChild(el("div", "ph",
        '<span class="ph__icon" aria-hidden="true">🎬</span>' +
        '<strong>Making-of video to be added</strong>' +
        '<span>No video has been supplied yet. Add MP4 files to <code>assets/videos/</code> and list them in <code>js/config.js</code>.</span>'
      ));
    }
  }

  /* Testing video */
  var tv = $("#testingVideo"), T = C.testingVideo || {};
  if (tv) {
    tv.innerHTML = "";
    if (T.src) {
      tv.appendChild(buildVideo(T));
    } else {
      tv.appendChild(el("div", "ph",
        '<span class="tag tag--todo">Testing Video Coming Soon</span>' +
        '<span class="ph__icon" aria-hidden="true">🧪</span>' +
        '<strong>Testing video not yet supplied</strong>' +
        '<span>This is not footage of a real test. Record a short clip of a real check (such as appearance or bottle leak check) and register it in <code>js/config.js</code>.</span>'
      ));
    }
  }

  /* ==========================================================
     12. INGREDIENTS GRID & FORMULATION SUMMARY TABLE
     ========================================================== */
  var ingGrid = $("#ingredientGrid");
  var formulationBody = $("#formulationTableBody");

  if (ingGrid) {
    ingGrid.innerHTML = "";
    if (C.ingredients && C.ingredients.length) {
      C.ingredients.forEach(function (i) {
        var card = el("article", "card ing");
        card.innerHTML =
          '<div class="ing__icon" aria-hidden="true">' + esc(i.icon || "🧪") + '</div>' +
          '<h3>' + esc(i.name) + '</h3>' +
          (i.qty ? '<p class="qty">' + esc(i.qty) + ' <span>supplied quantity</span></p>' : '') +
          '<p><strong>Role:</strong> ' + esc(i.role || "To be confirmed") + '</p>' +
          '<p>' + esc(i.explanation || "") + '</p>' +
          (i.safety ? '<p class="fine" style="border-top:1px dashed var(--line);padding-top:8px;"><strong>Safety Note:</strong> ' + esc(i.safety) + '</p>' : '');
        ingGrid.appendChild(card);
      });
    }
  }

  if (formulationBody) {
    formulationBody.innerHTML = "";
    if (C.ingredients && C.ingredients.length) {
      C.ingredients.forEach(function (i) {
        var tr = el("tr");
        tr.innerHTML =
          '<td><strong>' + esc(i.name) + '</strong></td>' +
          '<td>' + esc(i.qty || "To be measured") + '</td>' +
          '<td>' + esc(i.role || "To be confirmed") + '</td>' +
          '<td>' + esc(i.stockStrength || "To be recorded") + '</td>';
        formulationBody.appendChild(tr);
      });
    }
  }

  /* Batch & Traceability */
  var bt = C.batchTraceability || {};
  if ($("#trBatch")) $("#trBatch").textContent = bt.batchNumber || "To be added";
  if ($("#trMfd")) $("#trMfd").textContent = bt.manufactureDate || "To be added";
  if ($("#trExp")) $("#trExp").textContent = bt.bestBefore || "To be added";
  if ($("#trVol")) $("#trVol").textContent = bt.finalMeasuredVolume || "To be added (Supplied batch: 101.5 ml)";
  if ($("#trPrep")) $("#trPrep").textContent = bt.preparedBy || "To be added";

  /* ==========================================================
     13. TESTING CHECKLIST CARD (Config-Driven)
     ========================================================== */
  var checklistContainer = $("#testingChecklist");
  if (checklistContainer) {
    checklistContainer.innerHTML = "";
    var tests = C.testingChecklist || [];
    tests.forEach(function (t) {
      var isPassed = t.status === "passed" && t.date && t.evidence;
      var li = el("li", "check-item");
      li.innerHTML =
        '<div class="check-status' + (isPassed ? " check-status--passed" : "") + '" aria-hidden="true">' +
        (isPassed ? "✓" : "○") +
        '</div>' +
        '<div>' +
        '<h4>' + esc(t.name) + ' ' +
        (isPassed ? '<span class="tag tag--lab">Passed: ' + esc(t.date) + '</span>' : '<span class="tag tag--todo">Pending</span>') +
        '</h4>' +
        '<p>' + esc(t.description) + '</p>' +
        (isPassed ? '<p class="fine" style="margin-top:4px;"><strong>Evidence:</strong> ' + esc(t.evidence) + '</p>' : '') +
        '</div>';
      checklistContainer.appendChild(li);
    });
  }

  /* ==========================================================
     14. BUY OPTIONS: QUANTITY SELECTOR & LIVE TOTAL
     ========================================================== */
  var buySize = $("#buySize"), buyPrice = $("#buyPrice"), introNote = $("#introNote");
  var unitPrice = Number(C.priceNumeric) || 49;
  if (buySize) buySize.textContent = C.size || "Approx. 100 ml";
  if (buyPrice) buyPrice.textContent = C.price || ("₹" + unitPrice);
  if (introNote) {
    introNote.textContent = C.introPrice ? "Possible introductory price: " + C.introPrice + " (not confirmed)." : "";
  }

  var qtyInput = $("#buyQtyInput");
  var qtyDecBtn = $("#qtyDecBtn");
  var qtyIncBtn = $("#qtyIncBtn");
  var summaryPack = $("#summaryPack");
  var summaryQty = $("#summaryQty");
  var summaryRate = $("#summaryRate");
  var summaryTotal = $("#summaryTotal");
  var enqQtyInput = $("#enqQty");

  function updateOrderSummary() {
    var q = parseInt(qtyInput ? qtyInput.value : "1", 10);
    if (isNaN(q) || q < 1) q = 1;
    if (q > 20) q = 20;
    if (qtyInput) qtyInput.value = q;
    if (enqQtyInput) enqQtyInput.value = q;

    var totalCost = q * unitPrice;
    if (summaryPack) summaryPack.textContent = C.size || "Approx. 100 ml";
    if (summaryQty) summaryQty.textContent = q + (q === 1 ? " bottle" : " bottles");
    if (summaryRate) summaryRate.textContent = "₹" + unitPrice + " / bottle";
    if (summaryTotal) summaryTotal.textContent = "₹" + totalCost;

    updateWhatsAppPrefill();
  }

  if (qtyDecBtn && qtyInput) {
    qtyDecBtn.addEventListener("click", function () {
      var current = parseInt(qtyInput.value, 10) || 1;
      if (current > 1) {
        qtyInput.value = current - 1;
        updateOrderSummary();
      }
    });
  }
  if (qtyIncBtn && qtyInput) {
    qtyIncBtn.addEventListener("click", function () {
      var current = parseInt(qtyInput.value, 10) || 1;
      if (current < 20) {
        qtyInput.value = current + 1;
        updateOrderSummary();
      }
    });
  }
  if (qtyInput) {
    qtyInput.addEventListener("input", function () {
      updateOrderSummary();
    });
  }
  if (enqQtyInput) {
    enqQtyInput.addEventListener("input", function () {
      if (qtyInput) qtyInput.value = enqQtyInput.value;
      updateOrderSummary();
    });
  }

  /* ==========================================================
     15. PAYMENT SECTION & DEMO QR
     ========================================================== */
  var qrImg = $("#qrImg"), qrBig = $("#qrBig"), payNote = $("#payNote");
  var upiBtn = $("#upiBtn"), copyUpiBtn = $("#copyUpiBtn");
  var cleanUpi = (C.upiId || "").trim();

  if (C.qrImage) {
    if (qrImg) { qrImg.src = C.qrImage; qrImg.alt = "Payment QR code"; }
    if (qrBig) { qrBig.src = C.qrImage; }
    var badge1 = $("#qrBadge"), badge2 = $("#qrBadge2");
    if (badge1) {
      badge1.textContent = "Payment QR supplied by PureTouch team";
      badge1.classList.add("demo-badge--real");
    }
    if (badge2) badge2.hidden = true;
    if (payNote) payNote.textContent = "Always check the payee name in your UPI app before paying. This site cannot confirm payments.";
  } else {
    if (payNote) {
      payNote.textContent = "This QR is a demonstration. It contains only text, no payment details, and cannot receive money. No payment is possible from this page yet.";
    }
  }

  if (/^[\w.\-]{2,}@[A-Za-z]{2,}$/.test(cleanUpi)) {
    if (upiBtn) {
      var payeeParam = C.payeeName ? "&pn=" + encodeURIComponent(C.payeeName) : "";
      upiBtn.href = "upi://pay?pa=" + encodeURIComponent(cleanUpi) + payeeParam + "&cu=INR";
      upiBtn.hidden = false;
    }
    if (copyUpiBtn) {
      copyUpiBtn.hidden = false;
      copyUpiBtn.addEventListener("click", function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(cleanUpi).then(function () {
            showToast("UPI ID copied: " + cleanUpi);
          });
        } else {
          showToast("UPI ID: " + cleanUpi);
        }
      });
    }
  }

  var qrDlg = $("#qrDialog");
  var qrEnlargeBtn = $("#qrEnlarge"), qrCloseBtn = $("#qrClose");
  if (qrEnlargeBtn && qrDlg) {
    qrEnlargeBtn.addEventListener("click", function () {
      if (qrDlg.showModal) qrDlg.showModal();
      else if (qrBig) window.open(qrBig.src, "_blank", "noopener");
    });
  }
  if (qrCloseBtn && qrDlg) {
    qrCloseBtn.addEventListener("click", function () { qrDlg.close(); });
    qrDlg.addEventListener("click", function (e) {
      if (e.target === qrDlg) qrDlg.close();
    });
  }

  /* ==========================================================
     16. ENQUIRY CHANNELS (HONESTY: NEVER GUESS MASKED DIGITS)
     ========================================================== */
  var phoneDisplay = C.phoneDisplay || "92702*****";
  if ($("#phoneShown")) $("#phoneShown").textContent = phoneDisplay;
  if ($("#contactPhone")) $("#contactPhone").textContent = phoneDisplay;
  if ($("#footPhone")) $("#footPhone").textContent = phoneDisplay;

  var phoneDigits = (C.phoneFull || "").replace(/\D/g, "");
  var waDigits = (C.whatsappFull || "").replace(/\D/g, "");
  var contactBtnsContainer = $("#contactBtns");
  var phoneNote = $("#phoneNote");
  var waLinkElem = null;

  function updateWhatsAppPrefill() {
    if (!waLinkElem || !/^\d{11,15}$/.test(waDigits)) return;
    var nameVal = ($("#enqName") && $("#enqName").value.trim()) || "Prospective Buyer";
    var qVal = (qtyInput && qtyInput.value) || "1";
    var totalCost = Number(qVal) * unitPrice;
    var text = "Hello PureTouch team, I would like to enquire about ordering " + qVal +
      " pack(s) of PureTouch Hand Sanitizer (~100 ml) at proposed total ₹" + totalCost +
      ". Name: " + nameVal + ".";
    waLinkElem.href = "https://wa.me/" + waDigits + "?text=" + encodeURIComponent(text);
  }

  if (contactBtnsContainer) {
    contactBtnsContainer.innerHTML = "";
    if (/^\d{10}$/.test(phoneDigits)) {
      var callBtn = el("a", "btn btn--ghost", "Call for Enquiry");
      callBtn.href = "tel:+91" + phoneDigits;
      contactBtnsContainer.appendChild(callBtn);
    }
    if (/^\d{11,15}$/.test(waDigits)) {
      waLinkElem = el("a", "btn btn--ghost", "Enquire on WhatsApp");
      waLinkElem.target = "_blank";
      waLinkElem.rel = "noopener";
      contactBtnsContainer.appendChild(waLinkElem);
      updateWhatsAppPrefill();
    }
    if (phoneNote) {
      phoneNote.textContent = contactBtnsContainer.children.length > 0 ? "" :
        "This number is only partly supplied, so direct calling and WhatsApp are switched off. The complete number is needed to enable them.";
    }
  }

  /* ==========================================================
     17. ENQUIRY FORM VALIDATION & HONEST SUBMISSION
     ========================================================== */
  var enqForm = $("#enqForm");
  var enqOk = $("#enqOk");

  function setFieldError(errId, field, message) {
    var p = document.getElementById(errId);
    if (p) p.textContent = message;
    if (field) {
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  }

  if (enqForm) {
    var enqName = $("#enqName"), enqContact = $("#enqContact"), enqMsg = $("#enqMsg");

    if (enqName) enqName.addEventListener("input", function () {
      setFieldError("enqNameErr", enqName, "");
      updateWhatsAppPrefill();
    });
    if (enqContact) enqContact.addEventListener("input", function () {
      setFieldError("enqContactErr", enqContact, "");
    });
    if (enqMsg) enqMsg.addEventListener("input", function () {
      setFieldError("enqMsgErr", enqMsg, "");
    });

    enqForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (enqOk) enqOk.hidden = true;

      var bad = null;
      var name = enqName ? enqName.value.trim() : "";
      if (name.length < 2) {
        setFieldError("enqNameErr", enqName, "Please enter your name (at least 2 letters).");
        bad = bad || enqName;
      } else {
        setFieldError("enqNameErr", enqName, "");
      }

      var contactVal = enqContact ? enqContact.value.trim() : "";
      var contactOk = !contactVal || contactVal.length >= 5;
      if (!contactOk) {
        setFieldError("enqContactErr", enqContact, "Please enter a valid phone number or email, or leave blank.");
        bad = bad || enqContact;
      } else {
        setFieldError("enqContactErr", enqContact, "");
      }

      var q = Number(enqQtyInput ? enqQtyInput.value : 1);
      var okQ = Number.isInteger(q) && q >= 1 && q <= 20;
      if (!okQ) {
        setFieldError("enqQtyErr", enqQtyInput, "Please select a quantity between 1 and 20.");
        bad = bad || enqQtyInput;
      } else {
        setFieldError("enqQtyErr", enqQtyInput, "");
      }

      var msg = enqMsg ? enqMsg.value.trim() : "";
      if (msg.length < 5) {
        setFieldError("enqMsgErr", enqMsg, "Please write a short message (at least 5 characters).");
        bad = bad || enqMsg;
      } else {
        setFieldError("enqMsgErr", enqMsg, "");
      }

      if (bad) {
        bad.focus();
        return;
      }

      var payload = {
        name: name,
        contact: contactVal,
        quantity: q,
        message: msg,
        proposedTotal: "₹" + (q * unitPrice)
      };

      function displayStatus(msg, isSuccess) {
        if (enqOk) {
          enqOk.hidden = false;
          enqOk.className = "notice " + (isSuccess ? "notice--ok" : "notice--warn");
          enqOk.textContent = msg;
        }
        showToast(isSuccess ? "Enquiry processed" : "Notice: No backend server connected");
      }

      if (C.enquiryEndpoint) {
        fetch(C.enquiryEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          enqForm.reset();
          updateOrderSummary();
          displayStatus("Your enquiry was sent successfully. The PureTouch team will get back to you.", true);
        })
        .catch(function () {
          displayStatus("Sorry, your enquiry could not be sent right now. Please try again later.", false);
        });
      } else {
        enqForm.reset();
        updateOrderSummary();
        displayStatus("Your details look valid, but this enquiry has NOT been sent to anyone: no server is connected to this website yet (enquiryEndpoint is not set).", false);
      }
    });
  }

  /* ==========================================================
     18. SHIPPING, DELIVERY & RETURNS POLICIES
     ========================================================== */
  if ($("#policyShipping") && C.shippingPolicy) {
    $("#policyShipping").textContent = C.shippingPolicy;
  }
  if ($("#policyReturns") && C.returnsPolicy) {
    $("#policyReturns").textContent = C.returnsPolicy;
  }

  /* ==========================================================
     19. CONTACT SECTION METADATA
     ========================================================== */
  var ci = C.contactInfo || {};
  if ($("#contactEmail")) $("#contactEmail").textContent = ci.email || "To be added / Placeholder";
  if ($("#contactAddress")) $("#contactAddress").textContent = ci.collegeAddress || "To be added / Campus Address";
  if ($("#contactHours")) $("#contactHours").textContent = ci.workingHours || "To be added / Working Hours";

  /* ==========================================================
     20. FEEDBACK FORM VALIDATION & REVIEWS AREA
     ========================================================== */
  var fbForm = $("#fbForm"), fbOk = $("#fbOk");
  var fbMsg = $("#fbMsg"), fbMsgCount = $("#msgCount");
  var fbCat = $("#fbCat");
  var lastSubmitTime = 0;

  if (fbMsg && fbMsgCount) {
    fbMsg.addEventListener("input", function () {
      fbMsgCount.textContent = fbMsg.value.length + " / 500";
      if (fbMsg.value.trim().length >= 5) {
        setFieldError("msgErr", fbMsg, "");
      }
    });
  }
  if (fbCat) {
    fbCat.addEventListener("change", function () {
      setFieldError("catErr", fbCat, "");
    });
  }
  if (fbForm) {
    fbForm.querySelectorAll("input[name=rating]").forEach(function (r) {
      r.addEventListener("change", function () {
        setFieldError("ratingErr", null, "");
      });
    });

    fbForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (fbOk) fbOk.hidden = true;

      // Honeypot spam check
      var honeypot = fbForm.querySelector("input[name=website_url]");
      if (honeypot && honeypot.value.trim().length > 0) {
        // Silently ignore bot submission
        fbForm.reset();
        return;
      }

      // Simple rate limit (prevent duplicate clicks within 8 seconds)
      var now = Date.now();
      if (now - lastSubmitTime < 8000) {
        showToast("Please wait a few seconds before submitting again.", true);
        return;
      }

      var ratingRadio = fbForm.querySelector("input[name=rating]:checked");
      var bad = null;

      if (!ratingRadio) {
        setFieldError("ratingErr", null, "Please choose a star rating (1 to 5).");
        bad = bad || fbForm.querySelector("input[name=rating]");
      } else {
        setFieldError("ratingErr", null, "");
      }

      if (!fbCat || !fbCat.value) {
        setFieldError("catErr", fbCat, "Please choose a category.");
        bad = bad || fbCat;
      } else {
        setFieldError("catErr", fbCat, "");
      }

      var commentText = fbMsg ? fbMsg.value.trim() : "";
      var commentMsg = "";
      if (!commentText) {
        commentMsg = "Please write a comment.";
      } else if (commentText.length < 5) {
        commentMsg = "Comment must be at least 5 characters.";
      }
      setFieldError("msgErr", fbMsg, commentMsg);
      if (commentMsg) bad = bad || fbMsg;

      if (bad) {
        bad.focus();
        return;
      }

      lastSubmitTime = now;
      var fbPayload = {
        name: ($("#fbName") && $("#fbName").value.trim()) || "Anonymous Student/Visitor",
        rating: Number(ratingRadio.value),
        category: fbCat.value,
        comment: commentText,
        submittedAt: new Date().toISOString()
      };

      function handleFeedbackDone(isSaved) {
        fbForm.reset();
        if (fbMsgCount) fbMsgCount.textContent = "0 / 500";
        if (fbOk) {
          fbOk.hidden = false;
          fbOk.className = "notice " + (isSaved ? "notice--ok" : "notice--warn");
          fbOk.textContent = isSaved ?
            "Thank you! Your feedback was sent successfully." :
            "Thank you! Your feedback passed validation, but it was NOT saved because no backend is connected yet (feedbackEndpoint is empty).";
        }
        showToast(isSaved ? "Feedback received" : "Feedback validated (demo mode)");
      }

      if (C.feedbackEndpoint) {
        fetch(C.feedbackEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fbPayload)
        })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          handleFeedbackDone(true);
        })
        .catch(function () {
          if (fbOk) {
            fbOk.hidden = false;
            fbOk.className = "notice notice--warn";
            fbOk.textContent = "Sorry, we could not send your feedback. Please try again later.";
          }
          showToast("Failed to send feedback", true);
        });
      } else {
        handleFeedbackDone(false);
      }
    });
  }

  /* Reviews display (Honesty rule: Only show real reviews if backend/config returns them) */
  var reviewsContainer = $("#reviewsContainer");
  if (reviewsContainer) {
    var revs = C.reviews || [];
    if (revs.length > 0) {
      reviewsContainer.innerHTML = "";
      revs.forEach(function (r) {
        var card = el("article", "card");
        card.style.marginBottom = "16px";
        card.innerHTML =
          '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">' +
          '<strong>' + esc(r.name) + '</strong>' +
          '<span style="color:#e0a100;">' + "★".repeat(r.rating || 5) + '</span>' +
          '</div>' +
          '<p style="margin:0 0 4px;font-size:0.9rem;color:var(--muted);">' + esc(r.category) + '</p>' +
          '<p style="margin:0;">' + esc(r.comment) + '</p>';
        reviewsContainer.appendChild(card);
      });
    }
  }

  // Initial order summary calculation
  updateOrderSummary();

})();
