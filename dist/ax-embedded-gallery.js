/* AX content and gallery shell from 123choigem-tech/geosr-homepage-ax-platforms@2533628.
   The site's company pages and temporary external destinations are excluded. */
(() => {
  'use strict';
  const services = window.GeoSRAxV2?.services || [];
  window.portalFilms = services.map(service => [
    service.development ? null : service.id,
    service.name,
    {ko: service.k, en: service.e},
    {ko: service.dk, en: service.de},
    {ko: service.features.map(pair => pair[0]), en: service.features.map(pair => pair[1])}
  ]);
  window.axPage = () => '<section id="platforms" class="platform-story platform-gallery" aria-label="AX Platform"><div class="platform-pin"><div id="platform-browser"></div></div></section>';
})();
