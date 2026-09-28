/* Motion follows content entering the viewport. Scrolling remains native. */
(() => {
  if (!document.body.classList.contains('home-page')) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll(
    '.g-section-head, .g-field-copy, .g-project-row, .g-platform-copy, .g-news-row'
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      observer.unobserve(element);
      element.animate(
        [{opacity: .58, transform: 'translateY(22px)'}, {opacity: 1, transform: 'translateY(0)'}],
        {duration: 700, easing: 'cubic-bezier(.18,.72,.2,1)'}
      );
    });
  }, {threshold: .12});
  targets.forEach(element => observer.observe(element));
})();
