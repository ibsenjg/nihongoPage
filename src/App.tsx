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

const courses: Card[] = [
  {
    eyebrow: "Formación continua",
    title: "Cursos anuales de japonés",
    description:
      "Un recorrido guiado por niveles, con una base sólida y tiempo para afianzar cada paso.",
    to: "/cursos/anuales",
    variant: "annual",
  },
  {
    eyebrow: "Aprendizaje flexible",
    title: "Cursos temáticos de japonés",
    description:
      "Retos concretos para empezar desde cero, mejorar tu gramática o profundizar en un tema.",
    to: "/cursos/tematicos",
    variant: "thematic",
  },
];

const annualCourses = [
  [
    "A1.1",
    "Nivel inicial desde cero",
    "Tu primera base de escritura, vocabulario y conversación.",
  ],
  [
    "A1.2",
    "Nivel inicial II",
    "Consolida lo aprendido y empieza a expresarte con más soltura.",
  ],
  [
    "A2.1",
    "Nivel elemental I",
    "Amplía estructuras y comprende situaciones cotidianas.",
  ],
  [
    "A2.2",
    "Nivel elemental II",
    "Gana autonomía para comunicarte con naturalidad.",
  ],
  [
    "B1.1",
    "Nivel intermedio I",
    "Da el salto a textos y conversaciones más complejas.",
  ],
  [
    "B1.2",
    "Nivel intermedio II",
    "Profundiza y conecta todas tus competencias.",
  ],
];

const thematicCourses = [
  [
    "旅",
    "Japonés para viajeros",
    "Frases, costumbres y recursos para disfrutar de tu viaje.",
  ],
  [
    "あ",
    "Hiragana y katakana",
    "Aprende a leer y escribir los dos silabarios paso a paso.",
  ],
  [
    "文",
    "Gramática japonesa",
    "Ordena lo que sabes y entiende cómo funciona el idioma.",
  ],
  [
    "読",
    "Entrenamiento de lectura",
    "Mejora ritmo, comprensión y confianza con textos graduados.",
  ],
];

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Nihongo (日本語), inicio">
      <span className="logo-mark" aria-hidden="true">
        日
      </span>
      <span>
        <strong>Nihongo (日本語)</strong>
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
  const glyphs: Record<PlaceholderVariant, string> = {
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

  return (
    <div
      className={`placeholder placeholder-${variant}${compact ? " placeholder-compact" : ""}`}
      role="img"
      aria-label={label}
    >
      <span className="sun" />
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span className="placeholder-glyph">{glyphs[variant]}</span>
      <span className="placeholder-label">Imagen de muestra</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Aprende japonés con calma y constancia</span>
          <div className="topbar-links">
            <a href="#newsletter">Newsletter</a>
            <span
              className="login-later"
              title="Se añadirá en una fase posterior"
            >
              Acceso escuela · próximamente
            </span>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="container nav-inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label="Principal"
          >
            <NavLink className={navClass} to="/cursos" onClick={closeMenu}>
              Cursos
            </NavLink>
            <NavLink className={navClass} to="/libros" onClick={closeMenu}>
              Libros
            </NavLink>
            <NavLink className={navClass} to="/materiales" onClick={closeMenu}>
              Materiales
            </NavLink>
            <NavLink
              className={navClass}
              to="/aprende-gratis"
              onClick={closeMenu}
            >
              Aprende gratis
            </NavLink>
            <NavLink className={navClass} to="/nosotros" onClick={closeMenu}>
              Conócenos
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Una escuela online para acercarte al japonés y a su cultura a tu
            ritmo.
          </p>
          <div className="socials" aria-label="Redes sociales de muestra">
            <span>ig</span>
            <span>yt</span>
            <span>in</span>
          </div>
        </div>
        <div>
          <h3>Empieza por aquí</h3>
          <Link to="/cursos">Cursos de japonés</Link>
          <Link to="/aprende-gratis">Aprende gratis</Link>
          <Link to="/materiales">Materiales didácticos</Link>
        </div>
        <div>
          <h3>Sobre nosotros</h3>
          <Link to="/nosotros">El proyecto</Link>
          <Link to="/contacto">Contacto</Link>
          <span>Preguntas frecuentes · después</span>
        </div>
        <div>
          <h3>Estado del MVP</h3>
          <p>
            Las compras, el aula y el acceso de alumnado quedan fuera de esta
            primera versión.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Nihongo (日本語) · Proyecto demostrativo</span>
        <span>Privacidad · Cookies · Aviso legal</span>
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="container split-section newsletter-inner">
        <Placeholder variant="free" label="Ilustración de newsletter" compact />
        <div>
          <span className="eyebrow">Nihongo snacks</span>
          <h2>Japonés sin agobios, directo a tu bandeja de entrada.</h2>
          <p>
            Una píldora breve con vocabulario, cultura y consejos prácticos para
            mantener la motivación.
          </p>
          {submitted ? (
            <div className="form-success" role="status">
              ¡Gracias! El formulario de demostración funciona; conectaremos el
              envío más adelante.
            </div>
          ) : (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label>
                <span>Nombre</span>
                <input name="name" placeholder="Tu nombre" required />
              </label>
              <label>
                <span>Correo electrónico</span>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </label>
              <button className="button button-red" type="submit">
                Quiero mis snacks <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const features = [
    [
      "calendar",
      "Avanza a tu ritmo",
      "Sin fechas que te agobien. Tú decides cuándo estudiar y cuánto avanzar.",
    ],
    [
      "desk",
      "Tu aula siempre abierta",
      "Estudia donde quieras. Solo necesitas conexión y ganas de aprender.",
    ],
    [
      "materials",
      "Recursos que sí ayudan",
      "Ejercicios y materiales claros para practicar entre lecciones.",
    ],
  ] as const;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="japanese-kicker">ようこそ</span>
            <h1>
              El japonés no se aprende con trucos. Se aprende recorriendo el
              camino.
            </h1>
            <p>
              Una escuela online que combina método, cultura y acompañamiento
              para estudiantes de habla hispana.
            </p>
            <div className="button-row">
              <Link className="button button-red" to="/cursos">
                Descubre tu camino <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" to="/nosotros">
                Conoce la escuela
              </Link>
            </div>
          </div>
          <Placeholder
            variant="teacher"
            label="Retrato de profesor pendiente"
          />
        </div>
        <div className="wave wave-white" />
      </section>

      <section className="section intro-section">
        <div className="container narrow">
          <SectionTitle eyebrow="Un método que encaja contigo">
            ¡Tu nueva forma de aprender Japonés, esta te funciona!
          </SectionTitle>
          <p className="lead centered">
            Respetamos tu tiempo y tu forma de estudiar. Tú marcas el ritmo;
            nosotros ponemos el mapa, la práctica y el acompañamiento.
          </p>
        </div>
        <div className="container feature-grid">
          {features.map(([variant, title, description]) => (
            <article className="feature-card" key={title}>
              <Placeholder
                variant={variant}
                label={`Imagen pendiente: ${title}`}
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
            <span>años acompañando a estudiantes</span>
          </div>
          <div>
            <strong>5.000</strong>
            <span>alumnos en nuestra comunidad</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>cursos para distintas etapas</span>
          </div>
        </div>
      </section>

      <section className="section courses-section">
        <div className="container">
          <SectionTitle eyebrow="Elige tu siguiente paso">
            Un curso para acercarte un poco más a Japón
          </SectionTitle>
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.title}>
                <Placeholder
                  variant={course.variant}
                  label={`Imagen pendiente: ${course.title}`}
                />
                <div className="course-card-copy">
                  <span className="eyebrow">{course.eyebrow}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link className="button button-blue" to={course.to}>
                    Ver cursos <span aria-hidden="true">→</span>
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
            <span className="japanese-kicker">いっしょに</span>
            <h2>
              Una escuela con personas. Sin atajos, pero con un equipo a tu
              lado.
            </h2>
            <p>
              Te damos una ruta clara, explicaciones pensadas para
              hispanohablantes y una comunidad que entiende lo que cuesta
              aprender algo nuevo.
            </p>
            <Link className="button button-red" to="/nosotros">
              ¿Te vienes? <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Placeholder
            variant="community"
            label="Foto de la comunidad pendiente"
          />
        </div>
      </section>

      <Newsletter />

      <section className="section testimonials">
        <div className="container">
          <SectionTitle eyebrow="Voces de la comunidad">
            Así se vive aprender con nosotros
          </SectionTitle>
          <div className="testimonial-grid">
            {[
              [
                "“Por fin entiendo por qué se construyen así las frases.”",
                "Lucía · nivel inicial",
              ],
              [
                "“Puedo estudiar sin sentir que siempre llego tarde.”",
                "Marcos · curso temático",
              ],
              [
                "“La mezcla de idioma y cultura mantiene viva mi curiosidad.”",
                "Eva · nivel A2",
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
          label={`Imagen pendiente: ${title}`}
          compact
        />
      </div>
    </section>
  );
}

function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="学ぶ"
        title="Cursos de japonés para cada etapa"
        description="Empieza desde cero, retoma lo que dejaste a medias o enfócate en una habilidad concreta."
        variant="annual"
      />
      <section className="section">
        <div className="container course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <Placeholder
                variant={course.variant}
                label={`Imagen pendiente: ${course.title}`}
              />
              <div className="course-card-copy">
                <span className="eyebrow">{course.eyebrow}</span>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <Link className="button button-blue" to={course.to}>
                  Explorar <span aria-hidden="true">→</span>
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
  return (
    <>
      <PageHero
        eyebrow={type === "annual" ? "長い道" : "好きなこと"}
        title={title}
        description={description}
        variant={type}
      />
      <section className="section catalog-section">
        <div className="container catalog-grid">
          {items.map(([badge, itemTitle, itemDescription]) => (
            <article className="catalog-card" key={itemTitle}>
              <span className="catalog-badge">{badge}</span>
              <h2>{itemTitle}</h2>
              <p>{itemDescription}</p>
              <button className="button button-outline" type="button" disabled>
                Detalles próximamente
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
  const copy = {
    books: {
      eyebrow: "読む",
      title: "Libros para seguir aprendiendo",
      description:
        "Lecturas y cuadernos diseñados para convertir la curiosidad en práctica.",
      variant: "book" as PlaceholderVariant,
      items: [
        "Japonés para viajeros",
        "La magia de los kanji",
        "Lecturas graduadas",
      ],
    },
    materials: {
      eyebrow: "練習",
      title: "Materiales didácticos",
      description:
        "Recursos sencillos para organizar el estudio y practicar de forma constante.",
      variant: "materials" as PlaceholderVariant,
      items: [
        "Cuaderno de escritura",
        "Planificador de estudio",
        "Kit de preparación JLPT",
      ],
    },
    free: {
      eyebrow: "無料",
      title: "Empieza a aprender gratis",
      description:
        "Prueba el método con pequeñas lecciones y descubre por dónde continuar.",
      variant: "free" as PlaceholderVariant,
      items: [
        "Guía para empezar",
        "Mini lecciones por email",
        "Recursos de vocabulario",
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
                label={`Imagen pendiente: ${item}`}
                compact
              />
              <span className="eyebrow">
                Recurso {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{item}</h2>
              <p>
                Contenido de muestra para definir la estructura antes de
                incorporar el catálogo real.
              </p>
              <button
                className="text-link disabled-link"
                type="button"
                disabled
              >
                Disponible más adelante
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
  return (
    <>
      <PageHero
        eyebrow="私たち"
        title="Mucho más que una pantalla con lecciones"
        description="Un proyecto nacido para explicar japonés a hispanohablantes con claridad, contexto y cercanía."
        variant="teacher"
      />
      <section className="section about-story">
        <div className="container split-section reverse-mobile">
          <Placeholder variant="teacher" label="Foto del equipo pendiente" />
          <div>
            <span className="eyebrow">Nuestra manera de enseñar</span>
            <h2>
              Japón se entiende mejor cuando idioma y cultura avanzan juntos.
            </h2>
            <p>
              La escuela combina una mirada nativa con explicaciones pensadas
              para las dudas que aparecen al aprender desde el español.
            </p>
            <p>
              Este MVP presenta la experiencia pública. Los perfiles reales, el
              equipo completo y el acceso al aula se incorporarán en fases
              posteriores.
            </p>
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="container values-grid">
          {[
            ["01", "Claridad", "Explicar bien antes que impresionar."],
            ["02", "Constancia", "Un poco cada día vale más que un sprint."],
            ["03", "Cercanía", "Aprender acompañado cambia el recorrido."],
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
  return (
    <>
      <PageHero
        eyebrow="連絡"
        title="Hablemos"
        description="Cuéntanos qué quieres aprender y te ayudaremos a encontrar el mejor punto de partida."
        variant="community"
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Contacto</span>
            <h2>Estamos al otro lado</h2>
            <p>
              Este formulario es interactivo, aunque todavía no envía datos a
              ningún servicio.
            </p>
            <a href="mailto:hola@nihongo.local">hola@nihongo.local</a>
          </div>
          {sent ? (
            <div className="form-success large" role="status">
              Mensaje preparado. Conectaremos el envío real en una fase
              posterior.
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
                Nombre
                <input name="name" required />
              </label>
              <label>
                Correo electrónico
                <input name="email" type="email" required />
              </label>
              <label>
                ¿En qué podemos ayudarte?
                <textarea name="message" rows={5} required />
              </label>
              <button className="button button-red" type="submit">
                Preparar mensaje <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function SimpleCta() {
  return (
    <section className="simple-cta">
      <div className="container">
        <span className="japanese-kicker">一歩ずつ</span>
        <h2>¡El japonés es fácil, solo hay que saber algunas cosas!</h2>
        <Link className="button button-red" to="/aprende-gratis">
          Probar recursos gratis <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <span className="japanese-kicker">迷子</span>
        <h1>Esta página se ha perdido por el camino.</h1>
        <Link className="button button-red" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

function App() {
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
              title="Cursos anuales: una ruta completa"
              description="Programas por niveles para aprender con estructura, práctica y acompañamiento."
              items={annualCourses}
            />
          }
        />
        <Route
          path="cursos/tematicos"
          element={
            <CatalogPage
              type="thematic"
              title="Cursos temáticos: elige tu reto"
              description="Formaciones más cortas para trabajar una necesidad concreta a tu propio ritmo."
              items={thematicCourses}
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

export default App;
