# GeoSR website prototype

The authored static site is in `dist`
No build step is required

Serve `dist` over HTTP for local review
The active local preview uses port 18102

- `home.js` and `experience.css` own the homepage
- `ax-v2.js` and `ax-v2.css` own AX catalog and detail introductions
- `company-v2.js` and `company-v2.css` own the company information and collection
- `site.js` owns shared navigation, bilingual routes and representative archives
- `interactions.js` owns tabs, document navigation and lazy feature previews
- HTML routes use `?lang=ko` and `?lang=en`
- AX is presentation only and GeoDAP remains independent
- The contact form is a non-transmitting prototype

The parent project preserves original company source material and media review records
Paid film production and complete content migration are separate follow-up stages

Deploy through the existing Sites project recorded in `.openai/hosting.json`
