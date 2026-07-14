import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { LanguageProvider, useLanguage } from "./i18n";
import type { Translator } from "./i18n";

type PlaceholderVariant =
  | "teacher"
  | "calendar"
  | "desk"
  | "materials"
  | "community"
  | "annual"
  | "thematic"
  | "book"
  | "free";

type Card = {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  variant: PlaceholderVariant;
};

function getCourses(t: Translator): Card[] {
  return [
    {
      eyebrow: t("Formación continua"),
      title: t("Cursos anuales de japonés"),
      description: t(
        "Un recorrido guiado por niveles, con una base sólida y tiempo para afianzar cada paso.",
      ),
      to: "/cursos/anuales",
      variant: "annual",
    },
    {
      eyebrow: t("Aprendizaje flexible"),
      title: t("Cursos temáticos de japonés"),
      description: t(
        "Retos concretos para empezar desde cero, mejorar tu gramática o profundizar en un tema.",
      ),
      to: "/cursos/tematicos",
      variant: "thematic",
    },
  ];
}

function getAnnualCourses(t: Translator) {
  return [
    [
      "A1.1",
      t("Nivel inicial desde cero"),
      t("Tu primera base de escritura, vocabulario y conversación."),
    ],
    [
      "A1.2",
      t("Nivel inicial II"),
      t("Consolida lo aprendido y empieza a expresarte con más soltura."),
    ],
    [
      "A2.1",
      t("Nivel elemental I"),
      t("Amplía estructuras y comprende situaciones cotidianas."),
    ],
    [
      "A2.2",
      t("Nivel elemental II"),
      t("Gana autonomía para comunicarte con naturalidad."),
    ],
    [
      "B1.1",
      t("Nivel intermedio I"),
      t("Da el salto a textos y conversaciones más complejas."),
    ],
    [
      "B1.2",
      t("Nivel intermedio II"),
      t("Profundiza y conecta todas tus competencias."),
    ],
  ];
}

function getThematicCourses(t: Translator) {
  return [
    [
      t("旅"),
      t("Japonés para viajeros"),
      t("Frases, costumbres y recursos para disfrutar de tu viaje."),
    ],
    [
      t("あ"),
      t("Hiragana y katakana"),
      t("Aprende a leer y escribir los dos silabarios paso a paso."),
    ],
    [
      t("文"),
      t("Gramática japonesa"),
      t("Ordena lo que sabes y entiende cómo funciona el idioma."),
    ],
    [
      t("読"),
      t("Entrenamiento de lectura"),
      t("Mejora ritmo, comprensión y confianza con textos graduados."),
    ],
  ];
}

function Logo() {
  const { language, t } = useLanguage();

  return (
    <Link className="logo" to="/" aria-label={t("Nihongo (日本語), inicio")}>
      <span
        className={`logo-mark${language === "ja" ? " logo-mark-latin" : ""}`}
        aria-hidden="true"
      >
        {language === "ja" ? "ES" : "日"}
      </span>
      <span>
        <strong>{t("Nihongo (日本語)")}</strong>
      </span>
    </Link>
  );
}

function Placeholder({
  variant,
  label,
  compact = false,
}: {
  variant: PlaceholderVariant;
  label: string;
  compact?: boolean;
}) {
  const { language, t } = useLanguage();
  const japaneseGlyphs: Record<PlaceholderVariant, string> = {
    teacher: "先生",
    calendar: "日",
    desk: "学",
    materials: "本",
    community: "和",
    annual: "道",
    thematic: "好",
    book: "読",
    free: "始",
  };
  const spanishGlyphs: Record<PlaceholderVariant, string> = {
    teacher: "Profe",
    calendar: "Día",
    desk: "Aula",
    materials: "Libro",
    community: "Juntos",
    annual: "Ruta",
    thematic: "Tema",
    book: "Leer",
    free: "Inicio",
  };
  const glyphs = language === "ja" ? spanishGlyphs : japaneseGlyphs;

  return (
    <div
      className={`placeholder placeholder-${variant}${compact ? " placeholder-compact" : ""}`}
      role="img"
      aria-label={label}
    >
      <span className="sun" />
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span
        className={`placeholder-glyph${language === "ja" ? " placeholder-glyph-latin" : ""}`}
      >
        {glyphs[variant]}
      </span>
      <span className="placeholder-label">{t("Imagen de muestra")}</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();
  const closeMenu = () => setOpen(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{t("Aprende japonés con calma y constancia")}</span>
          <div className="topbar-links">
            <a href="#newsletter">{t("Newsletter")}</a>
            <span
              className="login-later"
              title={t("Se añadirá en una fase posterior")}
            >
              {t("Acceso escuela · próximamente")}
            </span>
            <button
              className="language-toggle"
              type="button"
              aria-label={t("Cambiar idioma a japonés")}
              onClick={toggleLanguage}
            >
              <span aria-hidden="true">◎</span>
              {language === "es" ? "日本語" : "Español"}
            </button>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="container nav-inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-label={t(open ? "Cerrar menú" : "Abrir menú")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label={t("Principal")}
          >
            <NavLink className={navClass} to="/cursos" onClick={closeMenu}>
              {t("Cursos")}
            </NavLink>
            <NavLink className={navClass} to="/libros" onClick={closeMenu}>
              {t("Libros")}
            </NavLink>
            <NavLink className={navClass} to="/materiales" onClick={closeMenu}>
              {t("Materiales")}
            </NavLink>
            <NavLink
              className={navClass}
              to="/aprende-gratis"
              onClick={closeMenu}
            >
              {t("Aprende gratis")}
            </NavLink>
            <NavLink className={navClass} to="/nosotros" onClick={closeMenu}>
              {t("Conócenos")}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            {t(
              "Una escuela online para acercarte al japonés y a su cultura a tu ritmo.",
            )}
          </p>
          <div className="socials" aria-label={t("Redes sociales de muestra")}>
            <span>ig</span>
            <span>yt</span>
            <span>in</span>
          </div>
        </div>
        <div>
          <h3>{t("Empieza por aquí")}</h3>
          <Link to="/cursos">{t("Cursos de japonés")}</Link>
          <Link to="/aprende-gratis">{t("Aprende gratis")}</Link>
          <Link to="/materiales">{t("Materiales didácticos")}</Link>
        </div>
        <div>
          <h3>{t("Sobre nosotros")}</h3>
          <Link to="/nosotros">{t("El proyecto")}</Link>
          <Link to="/contacto">{t("Contacto")}</Link>
          <span>{t("Preguntas frecuentes · después")}</span>
        </div>
        <div>
          <h3>{t("Estado del MVP")}</h3>
          <p>
            {t(
              "Las compras, el aula y el acceso de alumnado quedan fuera de esta primera versión.",
            )}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t("© 2026 Nihongo (日本語) · Proyecto demostrativo")}</span>
        <span>{t("Privacidad · Cookies · Aviso legal")}</span>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="section-title">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{children}</h2>
    </div>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="container split-section newsletter-inner">
        <Placeholder
          variant="free"
          label={t("Ilustración de newsletter")}
          compact
        />
        <div>
          <span className="eyebrow">{t("Nihongo snacks")}</span>
          <h2>{t("Japonés sin agobios, directo a tu bandeja de entrada.")}</h2>
          <p>
            {t(
              "Una píldora breve con vocabulario, cultura y consejos prácticos para mantener la motivación.",
            )}
          </p>
          {submitted ? (
            <div className="form-success" role="status">
              {t(
                "¡Gracias! El formulario de demostración funciona; conectaremos el envío más adelante.",
              )}
            </div>
          ) : (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label>
                <span>{t("Nombre")}</span>
                <input name="name" placeholder={t("Tu nombre")} required />
              </label>
              <label>
                <span>{t("Correo electrónico")}</span>
                <input
                  name="email"
                  type="email"
                  placeholder={t("tu@email.com")}
                  required
                />
              </label>
              <button className="button button-red" type="submit">
                {t("Quiero mis snacks")} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { t } = useLanguage();
  const courses = getCourses(t);
  const features = [
    [
      "calendar",
      t("Avanza a tu ritmo"),
      t(
        "Sin fechas que te agobien. Tú decides cuándo estudiar y cuánto avanzar.",
      ),
    ],
    [
      "desk",
      t("Tu aula siempre abierta"),
      t("Estudia donde quieras. Solo necesitas conexión y ganas de aprender."),
    ],
    [
      "materials",
      t("Recursos que sí ayudan"),
      t("Ejercicios y materiales claros para practicar entre lecciones."),
    ],
  ] as const;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="japanese-kicker">{t("ようこそ")}</span>
            <h1>
              {t(
                "El japonés no se aprende con trucos. Se aprende recorriendo el camino.",
              )}
            </h1>
            <p>
              {t(
                "Una escuela online que combina método, cultura y acompañamiento para estudiantes de habla hispana.",
              )}
            </p>
            <div className="button-row">
              <Link className="button button-red" to="/cursos">
                {t("Descubre tu camino")} <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" to="/nosotros">
                {t("Conoce la escuela")}
              </Link>
            </div>
          </div>
          <Placeholder
            variant="teacher"
            label={t("Retrato de profesor pendiente")}
          />
        </div>
        <div className="wave wave-white" />
      </section>

      <section className="section intro-section">
        <div className="container narrow">
          <SectionTitle eyebrow={t("Un método que encaja contigo")}>
            {t("¡Tu nueva forma de aprender Japonés, esta te funciona!")}
          </SectionTitle>
          <p className="lead centered">
            {t(
              "Respetamos tu tiempo y tu forma de estudiar. Tú marcas el ritmo; nosotros ponemos el mapa, la práctica y el acompañamiento.",
            )}
          </p>
        </div>
        <div className="container feature-grid">
          {features.map(([variant, title, description]) => (
            <article className="feature-card" key={title}>
              <Placeholder
                variant={variant}
                label={`${t("Imagen pendiente:")} ${title}`}
                compact
              />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="wave wave-yellow" />
        <div className="container stats-grid">
          <div>
            <strong>10+</strong>
            <span>{t("años acompañando a estudiantes")}</span>
          </div>
          <div>
            <strong>5.000</strong>
            <span>{t("alumnos en nuestra comunidad")}</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>{t("cursos para distintas etapas")}</span>
          </div>
        </div>
      </section>

      <section className="section courses-section">
        <div className="container">
          <SectionTitle eyebrow={t("Elige tu siguiente paso")}>
            {t("Un curso para acercarte un poco más a Japón")}
          </SectionTitle>
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.title}>
                <Placeholder
                  variant={course.variant}
                  label={`${t("Imagen pendiente:")} ${course.title}`}
                />
                <div className="course-card-copy">
                  <span className="eyebrow">{course.eyebrow}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link className="button button-blue" to={course.to}>
                    {t("Ver cursos")} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blue-story">
        <div className="container split-section">
          <div>
            <span className="japanese-kicker">{t("いっしょに")}</span>
            <h2>
              {t(
                "Una escuela con personas. Sin atajos, pero con un equipo a tu lado.",
              )}
            </h2>
            <p>
              {t(
                "Te damos una ruta clara, explicaciones pensadas para hispanohablantes y una comunidad que entiende lo que cuesta aprender algo nuevo.",
              )}
            </p>
            <Link className="button button-red" to="/nosotros">
              {t("¿Te vienes?")} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Placeholder
            variant="community"
            label={t("Foto de la comunidad pendiente")}
          />
        </div>
      </section>

      <Newsletter />

      <section className="section testimonials">
        <div className="container">
          <SectionTitle eyebrow={t("Voces de la comunidad")}>
            {t("Así se vive aprender con nosotros")}
          </SectionTitle>
          <div className="testimonial-grid">
            {[
              [
                t("“Por fin entiendo por qué se construyen así las frases.”"),
                t("Lucía · nivel inicial"),
              ],
              [
                t("“Puedo estudiar sin sentir que siempre llego tarde.”"),
                t("Marcos · curso temático"),
              ],
              [
                t(
                  "“La mezcla de idioma y cultura mantiene viva mi curiosidad.”",
                ),
                t("Eva · nivel A2"),
              ],
            ].map(([quote, author]) => (
              <blockquote key={author}>
                <span aria-hidden="true">“</span>
                <p>{quote}</p>
                <cite>{author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  description,
  variant,
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant: PlaceholderVariant;
}) {
  const { t } = useLanguage();

  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <span className="japanese-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Placeholder
          variant={variant}
          label={`${t("Imagen pendiente:")} ${title}`}
          compact
        />
      </div>
    </section>
  );
}

function CoursesPage() {
  const { t } = useLanguage();
  const courses = getCourses(t);

  return (
    <>
      <PageHero
        eyebrow={t("学ぶ")}
        title={t("Cursos de japonés para cada etapa")}
        description={t(
          "Empieza desde cero, retoma lo que dejaste a medias o enfócate en una habilidad concreta.",
        )}
        variant="annual"
      />
      <section className="section">
        <div className="container course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <Placeholder
                variant={course.variant}
                label={`${t("Imagen pendiente:")} ${course.title}`}
              />
              <div className="course-card-copy">
                <span className="eyebrow">{course.eyebrow}</span>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <Link className="button button-blue" to={course.to}>
                  {t("Explorar")} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SimpleCta />
    </>
  );
}

function CatalogPage({
  type,
  title,
  description,
  items,
}: {
  type: "annual" | "thematic";
  title: string;
  description: string;
  items: string[][];
}) {
  const { language, t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t(type === "annual" ? "長い道" : "好きなこと")}
        title={title}
        description={description}
        variant={type}
      />
      <section className="section catalog-section">
        <div className="container catalog-grid">
          {items.map(([badge, itemTitle, itemDescription]) => (
            <article className="catalog-card" key={itemTitle}>
              <span
                className={`catalog-badge${language === "ja" && type === "thematic" ? " catalog-badge-latin" : ""}`}
              >
                {badge}
              </span>
              <h2>{itemTitle}</h2>
              <p>{itemDescription}</p>
              <button className="button button-outline" type="button" disabled>
                {t("Detalles próximamente")}
              </button>
            </article>
          ))}
        </div>
      </section>
      <SimpleCta />
    </>
  );
}

function ResourcePage({ kind }: { kind: "books" | "materials" | "free" }) {
  const { t } = useLanguage();
  const copy = {
    books: {
      eyebrow: t("読む"),
      title: t("Libros para seguir aprendiendo"),
      description: t(
        "Lecturas y cuadernos diseñados para convertir la curiosidad en práctica.",
      ),
      variant: "book" as PlaceholderVariant,
      items: [
        t("Japonés para viajeros"),
        t("La magia de los kanji"),
        t("Lecturas graduadas"),
      ],
    },
    materials: {
      eyebrow: t("練習"),
      title: t("Materiales didácticos"),
      description: t(
        "Recursos sencillos para organizar el estudio y practicar de forma constante.",
      ),
      variant: "materials" as PlaceholderVariant,
      items: [
        t("Cuaderno de escritura"),
        t("Planificador de estudio"),
        t("Kit de preparación JLPT"),
      ],
    },
    free: {
      eyebrow: t("無料"),
      title: t("Empieza a aprender gratis"),
      description: t(
        "Prueba el método con pequeñas lecciones y descubre por dónde continuar.",
      ),
      variant: "free" as PlaceholderVariant,
      items: [
        t("Guía para empezar"),
        t("Mini lecciones por email"),
        t("Recursos de vocabulario"),
      ],
    },
  }[kind];

  return (
    <>
      <PageHero {...copy} />
      <section className="section">
        <div className="container resource-grid">
          {copy.items.map((item, index) => (
            <article className="resource-card" key={item}>
              <Placeholder
                variant={copy.variant}
                label={`${t("Imagen pendiente:")} ${item}`}
                compact
              />
              <span className="eyebrow">
                {t("Recurso")} {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{item}</h2>
              <p>
                {t(
                  "Contenido de muestra para definir la estructura antes de incorporar el catálogo real.",
                )}
              </p>
              <button
                className="text-link disabled-link"
                type="button"
                disabled
              >
                {t("Disponible más adelante")}
              </button>
            </article>
          ))}
        </div>
      </section>
      {kind === "free" ? <Newsletter /> : <SimpleCta />}
    </>
  );
}

function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("私たち")}
        title={t("Mucho más que una pantalla con lecciones")}
        description={t(
          "Un proyecto nacido para explicar japonés a hispanohablantes con claridad, contexto y cercanía.",
        )}
        variant="teacher"
      />
      <section className="section about-story">
        <div className="container split-section reverse-mobile">
          <Placeholder
            variant="teacher"
            label={t("Foto del equipo pendiente")}
          />
          <div>
            <span className="eyebrow">{t("Nuestra manera de enseñar")}</span>
            <h2>
              {t(
                "Japón se entiende mejor cuando idioma y cultura avanzan juntos.",
              )}
            </h2>
            <p>
              {t(
                "La escuela combina una mirada nativa con explicaciones pensadas para las dudas que aparecen al aprender desde el español.",
              )}
            </p>
            <p>
              {t(
                "Este MVP presenta la experiencia pública. Los perfiles reales, el equipo completo y el acceso al aula se incorporarán en fases posteriores.",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="container values-grid">
          {[
            ["01", t("Claridad"), t("Explicar bien antes que impresionar.")],
            [
              "02",
              t("Constancia"),
              t("Un poco cada día vale más que un sprint."),
            ],
            [
              "03",
              t("Cercanía"),
              t("Aprender acompañado cambia el recorrido."),
            ],
          ].map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("連絡")}
        title={t("Hablemos")}
        description={t(
          "Cuéntanos qué quieres aprender y te ayudaremos a encontrar el mejor punto de partida.",
        )}
        variant="community"
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">{t("Contacto")}</span>
            <h2>{t("Estamos al otro lado")}</h2>
            <p>
              {t(
                "Este formulario es interactivo, aunque todavía no envía datos a ningún servicio.",
              )}
            </p>
            <a href="mailto:hola@nihongo.local">hola@nihongo.local</a>
          </div>
          {sent ? (
            <div className="form-success large" role="status">
              {t(
                "Mensaje preparado. Conectaremos el envío real en una fase posterior.",
              )}
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                {t("Nombre")}
                <input name="name" required />
              </label>
              <label>
                {t("Correo electrónico")}
                <input name="email" type="email" required />
              </label>
              <label>
                {t("¿En qué podemos ayudarte?")}
                <textarea name="message" rows={5} required />
              </label>
              <button className="button button-red" type="submit">
                {t("Preparar mensaje")} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function SimpleCta() {
  const { t } = useLanguage();

  return (
    <section className="simple-cta">
      <div className="container">
        <span className="japanese-kicker">{t("一歩ずつ")}</span>
        <h2>{t("¡El japonés es fácil, solo hay que saber algunas cosas!")}</h2>
        <Link className="button button-red" to="/aprende-gratis">
          {t("Probar recursos gratis")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="not-found">
      <div className="container">
        <span className="japanese-kicker">{t("迷子")}</span>
        <h1>{t("Esta página se ha perdido por el camino.")}</h1>
        <Link className="button button-red" to="/">
          {t("Volver al inicio")}
        </Link>
      </div>
    </section>
  );
}

function AppRoutes() {
  const { t } = useLanguage();

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cursos" element={<CoursesPage />} />
        <Route
          path="cursos/anuales"
          element={
            <CatalogPage
              type="annual"
              title={t("Cursos anuales: una ruta completa")}
              description={t(
                "Programas por niveles para aprender con estructura, práctica y acompañamiento.",
              )}
              items={getAnnualCourses(t)}
            />
          }
        />
        <Route
          path="cursos/tematicos"
          element={
            <CatalogPage
              type="thematic"
              title={t("Cursos temáticos: elige tu reto")}
              description={t(
                "Formaciones más cortas para trabajar una necesidad concreta a tu propio ritmo.",
              )}
              items={getThematicCourses(t)}
            />
          }
        />
        <Route path="libros" element={<ResourcePage kind="books" />} />
        <Route path="materiales" element={<ResourcePage kind="materials" />} />
        <Route path="aprende-gratis" element={<ResourcePage kind="free" />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;
