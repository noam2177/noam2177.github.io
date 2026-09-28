const root = document.documentElement;
const langButtons = document.querySelectorAll("[data-set-lang]");
const dialog = document.querySelector("#detail");
const kicker = document.querySelector("#detail-kicker");
const title = document.querySelector("#detail-title");
const body = document.querySelector("#detail-body");
const link = document.querySelector("#detail-link");
const linkEn = document.querySelector("#detail-link-en");
const link2 = document.querySelector("#detail-link2");

const closeBtn = document.querySelector("#detail-close");

function setLang(lang) {
  root.lang = lang === "en" ? "en" : "he";
  root.dir = root.lang === "en" ? "ltr" : "rtl";
  closeBtn.textContent = root.lang === "en" ? "Close" : "סגור";
  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.setLang === root.lang ? "true" : "false");
  });
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLang(button.dataset.setLang));
});

function fillLink(node, href) {
  if (!href) {
    node.hidden = true;
    node.removeAttribute("href");
    return;
  }
  node.hidden = false;
  node.href = href;
}

document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const en = root.lang === "en";
    kicker.textContent = tile.dataset.kicker || "";
    title.textContent = en ? tile.dataset.titleEn : tile.dataset.titleHe;
    body.textContent = en ? tile.dataset.bodyEn : tile.dataset.bodyHe;
    fillLink(link, tile.dataset.href || "");
    fillLink(linkEn, tile.dataset.href || "");
    fillLink(link2, tile.dataset.href2 || "");
    dialog.showModal();
  });
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
