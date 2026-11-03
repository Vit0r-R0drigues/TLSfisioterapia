// Amplia as fotos das unidades em uma janela sobre a página; sem JavaScript, o link abre a foto grande
let dialog;
let items = [];
let current = 0;

function show(index) {
  current = (index + items.length) % items.length;
  const link = items[current];
  const img = dialog.querySelector('[data-lightbox-img]');
  const alt = link.querySelector('img')?.alt || '';
  img.src = link.href;
  img.alt = alt;
  dialog.querySelector('[data-lightbox-caption]').textContent = `${alt} (${current + 1} de ${items.length})`;
}

function buildDialog() {
  dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Foto ampliada');
  dialog.innerHTML = `
    <figure class="lightbox-figure">
      <img data-lightbox-img alt="">
      <figcaption data-lightbox-caption></figcaption>
    </figure>
    <button class="lightbox-btn lightbox-prev" type="button" data-lightbox-prev aria-label="Foto anterior"><i class="fi fi-rr-angle-left" aria-hidden="true"></i></button>
    <button class="lightbox-btn lightbox-next" type="button" data-lightbox-next aria-label="Próxima foto"><i class="fi fi-rr-angle-right" aria-hidden="true"></i></button>
    <button class="lightbox-btn lightbox-close" type="button" data-lightbox-close aria-label="Fechar foto"><i class="fi fi-rr-cross" aria-hidden="true"></i></button>
  `;
  document.body.append(dialog);

  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(current + 1));
  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  dialog.addEventListener('close', () => items[current]?.focus());
}

export function initGallery() {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery || typeof HTMLDialogElement === 'undefined') return;

  items = [...gallery.querySelectorAll('[data-gallery-item]')];
  if (items.length === 0) return;
  buildDialog();

  items.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  if (items.length < 2) {
    dialog.querySelectorAll('[data-lightbox-prev], [data-lightbox-next]').forEach((button) => { button.hidden = true; });
  }
}
