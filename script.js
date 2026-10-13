
"use strict";

const form = document.getElementById("downloadForm");
const input = document.getElementById("videoUrl");
const status = document.getElementById("status");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function isYouTubeUrl(value) {
  try {
    const url = new URL(value);

    const hosts = [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "youtu.be",
      "www.youtube-nocookie.com"
    ];

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return false;
    }

    if (!hosts.includes(url.hostname.toLowerCase())) {
      return false;
    }

    if (url.hostname.endsWith("youtu.be")) {
      return url.pathname.length > 1;
    }

    return url.pathname === "/watch"
      ? Boolean(url.searchParams.get("v"))
      : /^\/(shorts|embed|live)\/[^/]+/.test(url.pathname);
  } catch {
    return false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const link = input.value.trim();
  const format = new FormData(form).get("format");

  if (!isYouTubeUrl(link)) {
    status.textContent =
      "Link inválido. Insira um endereço válido do YouTube.";
    return;
  }

  status.textContent =
    `Link validado! Formato selecionado: ${format.toUpperCase()}. ` +
    "A interface está pronta, mas o download real exige " +
    "um backend de processamento autorizado.";
});
