# Manual accessibility checklist

Automated Axe, contrast, keyboard, responsive, and overflow checks run through
Playwright. Complete this manual checklist before a release that materially
changes layout, navigation, forms, language behavior, or content structure.

## Routes and locales

- Review every public Spanish route and the translated 404.
- Review Home and Contact in Japanese and English.
- Use desktop (`1440 × 1000`) and mobile (`390 × 844`) viewports.
- Recheck the intermediate Home (`833 × 816`) and About (`926 × 715`) heroes.

## Keyboard and focus

- Navigate the complete page using only Tab, Shift+Tab, Enter, Space, and
  Escape where applicable.
- Confirm the skip link appears on focus and moves focus to the main landmark.
- Confirm the two-color focus indicator remains visible on white, blue, red,
  yellow, and image-like decorative surfaces.
- Open and close the mobile menu, follow a route, and confirm the menu closes.
- Follow header, footer, newsletter, CTA, and form controls in a logical order.

## Screen reader

- Test VoiceOver with Safari on macOS and iOS when available.
- Confirm landmarks, headings, links, buttons, fields, and status messages have
  useful names and are announced in a sensible sequence.
- Confirm SPA route changes announce the translated destination.
- Confirm Spanish/English kanji accents announce as Japanese and Spanish accent
  words on Japanese pages announce as Spanish.
- Confirm success messages are announced without unexpectedly moving focus.

## Resize and display adaptation

- Check browser zoom at 200% and 400% without horizontal page scrolling.
- Apply the WCAG text-spacing bookmarklet and confirm content remains visible.
- Check narrow widths from 320px upward, especially 833px, 920px, and 926px.
- Enable forced colors/high contrast and confirm controls and focus remain
  discoverable.
- Enable reduced motion and confirm navigation remains understandable.

## ARC Toolkit review

- Record the route, viewport, locale, affected element, recommendation, user
  impact, and screenshot for every finding.
- Review errors, alerts, best practices, focus order, text spacing, contrast,
  headings, landmarks, ARIA, and background-image guidance.
- Accept findings only after confirming user impact; do not apply alerts or
  best practices mechanically.
- Add a focused Vitest or Playwright regression for every accepted finding.
