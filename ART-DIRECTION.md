# Artwork handoff

All v1 slots render solid dark tonal fields and live titles only. There are no screenshots, photographic stand-ins or invented scenes. Source slots are real picture elements, activated when src is populated. The CSS fallback is intentional, not a missing-image state.

## Source specifications

All coordinates below are pixels from the top-left of the source. Safe area is x, y, width, height. Keep important subjects within it, leave the center quiet and dark for the live title, and keep the lower center of hero art dark for status and CTA. These are subject safe areas, not text boxes. Text is always rendered separately.

| Slot | Source | Orientation | Safe area | Format | Budget |
| --- | --- | --- | --- | --- | --- |
| heroDesktop | 2560 x 1440 | Landscape, 16:9 | 640, 288, 1280, 864 | WebP, sRGB | 700 KB |
| heroMobile | 1080 x 1440 | Portrait, 3:4 | 108, 288, 864, 864 | WebP, sRGB | 350 KB |
| featured | 1920 x 1080 | Landscape, 16:9 | 192, 216, 1536, 648 | WebP, sRGB | 450 KB |
| library | 1000 x 1250 | Portrait, 4:5 | 100, 125, 800, 1000 | WebP, sRGB | 220 KB |

WebP is the preferred delivery format; optimized JPEG is also supported by the image slot if src uses that extension. No text, logo or interface labels baked into key art. A separate approved screenshot can retain its real interface, but this v1 requires key art backgrounds rather than passing screenshots off as final key art.

The main spotlight is cropped to 16:7 on desktop and 16:9 on mobile. App spotlights retain 16:9. Hero containers have minimum heights to keep the title and CTA usable on smaller screens, so cover cropping varies by viewport. Use both hero crops rather than relying on the desktop crop on a phone. Keep content within the listed safe areas and verify the crops at 390px, 768px, 1440px and 1920px. Per-slot objectPosition fields can adjust the focal point. The heroMobile field controls the phone crop independently.

## Assets per title

| Title ID | Visible v1 slots | Files to provide |
| --- | --- | --- |
| golf | Desktop hero, mobile hero, library | public/art/golf/heroDesktop.webp, public/art/golf/heroMobile.webp, public/art/golf/library.webp |
| real-deal | Wide featured tile, library | public/art/real-deal/featured.webp, public/art/real-deal/library.webp |
| e11vn | Featured tile, library | public/art/e11vn/featured.webp, public/art/e11vn/library.webp |
| selah | Featured tile, library | public/art/selah/featured.webp, public/art/selah/library.webp |

Nine assets replace every currently visible slot. For future hero swaps, also supply heroDesktop.webp and heroMobile.webp in each non-golf title folder. For a future golf spotlight, supply public/art/golf/featured.webp. Each title already has these optional slots in JSON, so a complete reusable set is four assets per title, sixteen total.

Golf: approved golf art only after its visual direction is settled. Current public wording remains Golf game. Real Deal: approved zombie shooter key art, reflecting the actual game's visual direction. E11VN: approved fitness-app art; its red stays inside its own art treatment. Selah: approved Bible-app art; warm neutral palette. Do not substitute unapproved screenshots from another site or an earlier conversation.

## Install

1. Place the approved file at the corresponding path.
2. Set that slot's src in src/content/titles.json to the path relative to public, for example art/golf/heroDesktop.webp.
3. Add descriptive alt text and adjust objectPosition if needed. The current art panel is decorative to assistive technology because the adjacent title already names it; meaningful future media belongs in a separate accessible gallery.
4. Run npm run build, then inspect the desktop and phone crops.

plannedPath records the requested filename only. A null src deliberately renders the tonal title treatment and makes no image request.
