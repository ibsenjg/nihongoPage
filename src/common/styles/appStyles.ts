import { css } from "styled-components";

export const appStyles = css`
  :root {
    --blue: ${({ theme }) => theme.colors.blue};
    --blue-dark: ${({ theme }) => theme.colors.blueDark};
    --red: ${({ theme }) => theme.colors.red};
    --red-dark: ${({ theme }) => theme.colors.redDark};
    --yellow: ${({ theme }) => theme.colors.yellow};
    --gold-text: ${({ theme }) => theme.colors.goldText};
    --ink: ${({ theme }) => theme.colors.ink};
    --muted: ${({ theme }) => theme.colors.muted};
    --soft-blue: ${({ theme }) => theme.colors.softBlue};
    --white: ${({ theme }) => theme.colors.white};
    --border: ${({ theme }) => theme.colors.border};
    --shadow: ${({ theme }) => theme.shadow};
    --radius: ${({ theme }) => theme.radius};
  }

  .container {
    width: min(1120px, calc(100% - 40px));
    margin-inline: auto;
  }

  .narrow {
    width: min(800px, calc(100% - 40px));
  }

  .button-row {
    display: flex;
    align-items: center;
  }

  .hero-section {
    position: relative;
    overflow: hidden;
    color: var(--white);
    background: var(--blue);
  }

  .hero-grid,
  .page-hero-grid,
  .split-section {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
    align-items: center;
    gap: 70px;
  }

  .hero-grid {
    min-height: 660px;
    padding: 70px 0 120px;
  }

  .hero-copy {
    position: relative;
    z-index: 2;
  }

  .japanese-kicker,
  .eyebrow {
    display: inline-block;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .japanese-kicker {
    margin-bottom: 18px;
    color: var(--yellow);
    font-size: 1.35rem;
    letter-spacing: 0.16em;
  }

  .hero-copy h1,
  .page-hero h1,
  .not-found h1 {
    margin: 0;
    font-family: "Coiny", "Arial Rounded MT Bold", sans-serif;
    font-size: clamp(2.45rem, 5.1vw, 4.75rem);
    font-weight: 400;
    line-height: 1.03;
    letter-spacing: -0.04em;
  }

  .hero-copy p,
  .page-hero p {
    max-width: 650px;
    margin: 27px 0 32px;
    font-size: clamp(1.08rem, 2vw, 1.32rem);
    line-height: 1.6;
  }

  .button-row {
    flex-wrap: wrap;
    gap: 24px;
  }

  .button {
    display: inline-flex;
    min-height: 52px;
    padding: 0 23px;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: var(--white);
    border: 0;
    border-radius: 14px;
    font: inherit;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 12px 24px rgba(1, 28, 66, 0.15);
    cursor: pointer;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;
  }

  .button:hover:not(:disabled) {
    box-shadow: 0 16px 30px rgba(1, 28, 66, 0.23);
    transform: translateY(-2px);
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  .button-red {
    background: var(--red);
  }

  .button-red:hover {
    background: var(--red-dark);
  }

  .button-blue {
    background: var(--blue);
  }

  .button-blue:hover {
    background: var(--blue-dark);
  }

  .button-outline {
    color: var(--blue);
    background: transparent;
    border: 2px solid var(--blue);
    box-shadow: none;
  }

  .text-link {
    padding: 10px 0;
    color: inherit;
    background: none;
    border: 0;
    font: inherit;
    font-weight: 800;
    text-underline-offset: 5px;
    cursor: pointer;
  }

  .text-link:hover {
    text-decoration: underline;
  }

  .disabled-link {
    color: var(--muted);
    cursor: not-allowed;
  }

  .wave {
    position: absolute;
    right: 0;
    bottom: -2px;
    left: 0;
    height: 82px;
    clip-path: polygon(
      0 42%,
      8% 64%,
      18% 49%,
      31% 72%,
      43% 48%,
      56% 68%,
      69% 45%,
      82% 66%,
      100% 38%,
      100% 100%,
      0 100%
    );
  }

  .wave-white {
    background: var(--white);
  }

  .wave-yellow {
    top: -80px;
    bottom: auto;
    background: var(--yellow);
  }

  .placeholder {
    position: relative;
    display: grid;
    width: 100%;
    min-height: 430px;
    overflow: hidden;
    place-items: center;
    color: var(--ink);
    background: linear-gradient(145deg, #e8f2ff 0%, #fff6db 100%);
    border: 6px solid rgba(255, 255, 255, 0.85);
    border-radius: 42% 58% 51% 49% / 45% 40% 60% 55%;
    box-shadow: var(--shadow);
    isolation: isolate;
  }

  .placeholder::before,
  .placeholder::after {
    position: absolute;
    z-index: -1;
    content: "";
    border-radius: 50%;
  }

  .placeholder::before {
    width: 250px;
    height: 250px;
    right: -65px;
    bottom: -70px;
    background: var(--red);
    opacity: 0.9;
  }

  .placeholder::after {
    width: 180px;
    height: 180px;
    top: -55px;
    left: -45px;
    background: var(--yellow);
  }

  .placeholder-compact {
    min-height: 250px;
    border-width: 4px;
    border-radius: 22px;
  }

  .placeholder-glyph {
    position: relative;
    z-index: 2;
    display: grid;
    width: 145px;
    aspect-ratio: 1;
    place-items: center;
    color: var(--white);
    background: var(--blue);
    border: 6px solid var(--white);
    border-radius: 50%;
    font-size: clamp(2.7rem, 8vw, 5.2rem);
    font-weight: 800;
    box-shadow: 12px 13px 0 rgba(2, 10, 20, 0.12);
  }

  .placeholder-compact .placeholder-glyph {
    width: 92px;
    border-width: 4px;
    font-size: 2.6rem;
  }

  .placeholder-teacher .placeholder-glyph:not(.placeholder-glyph-latin) {
    font-size: clamp(2.7rem, 5vw, 3.6rem);
    white-space: nowrap;
  }

  .placeholder-compact.placeholder-teacher
    .placeholder-glyph:not(.placeholder-glyph-latin) {
    width: 112px;
    font-size: 2.6rem;
  }

  .placeholder-glyph.placeholder-glyph-latin,
  .placeholder-compact .placeholder-glyph.placeholder-glyph-latin {
    padding: 8px;
    font-family: "Barlow", Arial, sans-serif;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    text-align: center;
  }

  .placeholder-label {
    position: absolute;
    right: 18px;
    bottom: 15px;
    z-index: 2;
    padding: 6px 10px;
    color: var(--ink);
    background: rgba(255, 255, 255, 0.82);
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sun {
    position: absolute;
    top: 30px;
    right: 42px;
    width: 62px;
    aspect-ratio: 1;
    background: var(--red);
    border-radius: 50%;
  }

  .cloud {
    position: absolute;
    z-index: 1;
    width: 120px;
    height: 26px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 999px;
  }

  .cloud::before,
  .cloud::after {
    position: absolute;
    bottom: 0;
    content: "";
    background: inherit;
    border-radius: 50% 50% 0 0;
  }

  .cloud::before {
    left: 21px;
    width: 47px;
    height: 47px;
  }

  .cloud::after {
    right: 18px;
    width: 37px;
    height: 37px;
  }

  .cloud-one {
    top: 95px;
    left: 24px;
  }

  .cloud-two {
    right: 25px;
    bottom: 110px;
    transform: scale(0.72);
  }

  .section {
    padding: 100px 0;
  }

  .intro-section {
    padding-top: 72px;
  }

  .section-title {
    max-width: 830px;
    margin: 0 auto 26px;
    text-align: center;
  }

  .section-title > span {
    display: inline-block;
    margin-bottom: 14px;
    color: var(--red);
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    font-weight: 600;
    line-height: 1.4;
  }

  .eyebrow {
    margin-bottom: 12px;
    color: var(--red);
    font-size: 0.8rem;
  }

  .section-title h2,
  .blue-story h2,
  .newsletter h2,
  .simple-cta h2,
  .about-story h2,
  .contact-section h2 {
    margin: 0;
    font-family: "Coiny", "Arial Rounded MT Bold", sans-serif;
    font-size: clamp(2rem, 4.2vw, 3.6rem);
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }

  .lead {
    color: var(--muted);
    font-size: 1.16rem;
    line-height: 1.7;
  }

  .centered {
    text-align: center;
  }

  .feature-grid {
    display: grid;
    margin-top: 56px;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .feature-card {
    text-align: center;
  }

  .feature-card .placeholder {
    margin-bottom: 27px;
  }

  .feature-card h3 {
    margin: 0 0 12px;
    color: var(--red);
    font-size: 1.25rem;
  }

  .feature-card p,
  .course-card p,
  .catalog-card p,
  .resource-card p,
  .about-story p,
  .contact-section p,
  .newsletter p,
  .blue-story p {
    color: var(--muted);
    line-height: 1.68;
  }

  .stats-section {
    position: relative;
    padding: 85px 0 72px;
    background: var(--yellow);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    text-align: center;
  }

  .stats-grid div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats-grid strong {
    color: var(--blue);
    font-family: "Coiny", "Arial Rounded MT Bold", sans-serif;
    font-size: clamp(2.7rem, 6vw, 4.6rem);
    font-weight: 400;
    line-height: 1;
  }

  .stats-grid span {
    max-width: 240px;
    margin-top: 12px;
    font-weight: 700;
  }

  .courses-section {
    background: var(--soft-blue);
  }

  .course-grid {
    display: grid;
    margin-top: 50px;
    grid-template-columns: repeat(2, 1fr);
    gap: 34px;
  }

  .course-card {
    overflow: hidden;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .course-card > .placeholder {
    min-height: 330px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .course-card-copy {
    padding: 34px;
  }

  .course-card h2,
  .course-card h3,
  .catalog-card h2,
  .resource-card h2 {
    margin: 0 0 13px;
    font-size: 1.7rem;
    line-height: 1.2;
  }

  .course-card .button {
    margin-top: 13px;
  }

  .blue-story {
    padding: 110px 0;
    color: var(--white);
    background: var(--blue);
  }

  .blue-story p {
    margin: 24px 0 30px;
    color: var(--white);
    font-size: 1.12rem;
  }

  .blue-story .placeholder {
    min-height: 380px;
  }

  .newsletter {
    padding: 100px 0;
    background: var(--white);
  }

  .newsletter-inner {
    grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
  }

  .newsletter h2 {
    color: var(--ink);
  }

  .newsletter h2:focus-visible {
    outline: 3px solid var(--white);
    outline-offset: 6px;
    box-shadow: 0 0 0 9px var(--blue-dark);
  }

  .newsletter p {
    font-size: 1.08rem;
  }

  .signup-form {
    display: grid;
    margin-top: 28px;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .signup-form .button {
    grid-column: 1 / -1;
  }

  .signup-form label,
  .contact-form label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--ink);
    font-size: 0.83rem;
    font-weight: 800;
  }

  .signup-form input,
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 15px 16px;
    color: var(--ink);
    background: var(--soft-blue);
    border: 1px solid var(--border);
    border-radius: 12px;
    font: inherit;
  }

  .signup-form input:focus,
  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: var(--blue);
  }

  .form-success {
    margin-top: 25px;
    padding: 20px;
    color: var(--blue-dark);
    background: #e7f8ef;
    border-left: 5px solid #2da66e;
    border-radius: 12px;
    font-weight: 700;
    line-height: 1.55;
  }

  .form-success.large {
    display: grid;
    min-height: 260px;
    margin: 0;
    place-items: center;
    text-align: center;
  }

  .testimonials {
    background: var(--soft-blue);
  }

  .testimonial-grid {
    display: grid;
    margin-top: 48px;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .testimonial-grid blockquote {
    position: relative;
    margin: 0;
    padding: 34px;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: 0 12px 35px rgba(4, 44, 95, 0.08);
  }

  .testimonial-grid blockquote > span {
    color: var(--gold-text);
    font-family: Georgia, serif;
    font-size: 5rem;
    line-height: 0.65;
  }

  .testimonial-grid p {
    min-height: 80px;
    font-size: 1.08rem;
    font-weight: 700;
    line-height: 1.55;
  }

  .testimonial-grid cite {
    color: var(--blue);
    font-size: 0.82rem;
    font-style: normal;
    font-weight: 800;
  }

  .page-hero {
    color: var(--white);
    background: var(--blue);
  }

  .page-hero-grid {
    min-height: 445px;
    padding: 70px 0;
  }

  .page-hero .placeholder {
    min-height: 290px;
  }

  .catalog-section {
    background: var(--soft-blue);
  }

  .catalog-grid,
  .resource-grid,
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }

  .catalog-card,
  .resource-card {
    padding: 32px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 14px 38px rgba(4, 44, 95, 0.08);
  }

  .catalog-badge {
    display: grid;
    width: 66px;
    aspect-ratio: 1;
    margin-bottom: 24px;
    place-items: center;
    color: var(--white);
    background: var(--red);
    border-radius: 18px 18px 18px 4px;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .catalog-badge-latin {
    padding: 8px;
    font-size: 0.78rem;
    text-align: center;
  }

  .catalog-card .button {
    width: 100%;
    margin-top: 15px;
    padding-inline: 14px;
  }

  .resource-card .placeholder {
    min-height: 210px;
    margin: -10px -10px 28px;
    width: calc(100% + 20px);
  }

  .simple-cta {
    padding: 90px 0;
    color: var(--white);
    background: var(--blue);
    text-align: center;
  }

  .simple-cta .container {
    max-width: 820px;
  }

  .simple-cta .button {
    margin-top: 28px;
  }

  .about-story .placeholder {
    min-height: 420px;
  }

  .about-story p {
    font-size: 1.08rem;
  }

  .values-section {
    padding: 85px 0;
    background: var(--yellow);
  }

  .values-grid article {
    padding: 28px;
    background: rgba(255, 255, 255, 0.78);
    border-radius: var(--radius);
  }

  .values-grid article > span {
    color: var(--blue);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.15em;
  }

  .values-grid h3 {
    margin: 15px 0 8px;
    font-size: 1.5rem;
  }

  .contact-section {
    background: var(--soft-blue);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 0.7fr 1.3fr;
    gap: 80px;
  }

  .contact-grid > div > a {
    color: var(--blue);
    font-weight: 800;
  }

  .contact-form {
    display: grid;
    padding: 35px;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    gap: 20px;
  }

  .contact-form textarea {
    resize: vertical;
  }

  .not-found {
    display: grid;
    min-height: 65vh;
    place-items: center;
    color: var(--white);
    background: var(--blue);
    text-align: center;
  }

  .not-found .button {
    margin-top: 30px;
  }

  .footer {
    padding: 72px 0 22px;
    color: rgba(255, 255, 255, 0.74);
    background: var(--ink);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.25fr 0.8fr 0.8fr 1fr;
    gap: 45px;
  }

  .footer .logo {
    color: var(--white);
  }

  .footer h3 {
    margin: 4px 0 20px;
    color: #71b0ff;
    font-size: 1rem;
  }

  .footer p {
    line-height: 1.6;
  }

  .footer-grid > div:not(.footer-brand) a,
  .footer-grid > div:not(.footer-brand) span {
    display: block;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.74);
    text-decoration: none;
  }

  .footer-grid a:hover {
    color: var(--yellow) !important;
  }

  .socials {
    display: flex;
    gap: 10px;
  }

  .socials span {
    display: grid;
    width: 36px;
    aspect-ratio: 1;
    place-items: center;
    color: var(--white);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .footer-bottom {
    display: flex;
    margin-top: 55px;
    padding-top: 22px;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    font-size: 0.78rem;
  }

  @media (max-width: 920px) {
    .hero-grid,
    .page-hero-grid,
    .split-section,
    .newsletter-inner,
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 45px;
    }

    .hero-grid {
      padding-top: 85px;
    }

    .hero-grid .placeholder {
      max-width: 620px;
      margin: 0 auto;
    }

    .page-hero-grid .placeholder {
      display: none;
    }

    .feature-grid,
    .catalog-grid,
    .resource-grid,
    .values-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .feature-card:last-child,
    .catalog-card:last-child:nth-child(odd),
    .resource-card:last-child:nth-child(odd),
    .values-grid article:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      max-width: calc(50% - 12px);
      justify-self: center;
    }

    .testimonial-grid {
      grid-template-columns: 1fr;
    }

    .testimonial-grid p {
      min-height: auto;
    }

    .footer-grid {
      grid-template-columns: 1.2fr 1fr 1fr;
    }

    .footer-grid > div:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 650px) {
    .container,
    .narrow {
      width: min(100% - 30px, 1120px);
    }

    .hero-grid {
      min-height: auto;
      padding: 68px 0 115px;
    }

    .hero-copy h1,
    .page-hero h1,
    .not-found h1 {
      font-size: 2.55rem;
    }

    .hero-copy p,
    .page-hero p {
      font-size: 1.05rem;
    }

    .hero-grid .placeholder {
      min-height: 330px;
    }

    .section,
    .newsletter,
    .blue-story {
      padding: 72px 0;
    }

    .section-title h2,
    .blue-story h2,
    .newsletter h2,
    .simple-cta h2,
    .about-story h2,
    .contact-section h2 {
      font-size: 2.15rem;
    }

    .feature-grid,
    .course-grid,
    .stats-grid,
    .catalog-grid,
    .resource-grid,
    .values-grid,
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .feature-card:last-child,
    .catalog-card:last-child:nth-child(odd),
    .resource-card:last-child:nth-child(odd),
    .values-grid article:last-child:nth-child(odd) {
      grid-column: auto;
      max-width: none;
    }

    .stats-grid {
      gap: 35px;
    }

    .stats-grid div {
      padding-bottom: 30px;
      border-bottom: 2px dotted rgba(2, 10, 20, 0.22);
    }

    .stats-grid div:last-child {
      padding: 0;
      border: 0;
    }

    .course-grid {
      margin-top: 35px;
    }

    .course-card-copy,
    .catalog-card,
    .resource-card,
    .contact-form {
      padding: 25px;
    }

    .signup-form {
      grid-template-columns: 1fr;
    }

    .reverse-mobile .placeholder {
      order: 2;
    }

    .footer-grid > div:last-child {
      grid-column: auto;
    }

    .footer-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
