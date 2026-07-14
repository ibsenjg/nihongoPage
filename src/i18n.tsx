import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Language = "es" | "ja";
export type Translator = (text: string) => string;

const mirroredCopy: Record<string, string> = {
  "Nihongo (日本語)": "日本語 (Nihongo)",
  "Nihongo (日本語), inicio": "日本語（Nihongo）、ホーム",
  "MVP de una escuela online de japonés: cursos, materiales y recursos gratuitos.":
    "日本語オンラインスクールのMVP。コース、教材、無料リソースを紹介します。",
  "Nihongo (日本語) · Aprende japonés online":
    "日本語 (Nihongo)・オンラインで日本語を学ぼう",
  "Cambiar idioma a japonés": "言語をスペイン語に変更",
  "Imagen de muestra": "サンプル画像",
  "Imagen pendiente:": "準備中の画像：",
  "Aprende japonés con calma y constancia": "焦らず、こつこつ日本語を学ぼう",
  Newsletter: "ニュースレター",
  "Se añadirá en una fase posterior": "今後のバージョンで追加予定です",
  "Acceso escuela · próximamente": "スクールログイン・近日公開",
  "Cerrar menú": "メニューを閉じる",
  "Abrir menú": "メニューを開く",
  Principal: "メインナビゲーション",
  Cursos: "コース",
  Libros: "本",
  Materiales: "教材",
  "Aprende gratis": "無料で学ぶ",
  Conócenos: "私たちについて",
  "Una escuela online para acercarte al japonés y a su cultura a tu ritmo.":
    "自分のペースで日本語と日本文化に近づけるオンラインスクールです。",
  "Redes sociales de muestra": "ソーシャルメディアのサンプル",
  "Empieza por aquí": "ここから始めよう",
  "Cursos de japonés": "日本語コース",
  "Materiales didácticos": "学習教材",
  "Sobre nosotros": "私たちについて",
  "El proyecto": "プロジェクト",
  Contacto: "お問い合わせ",
  "Preguntas frecuentes · después": "よくある質問・今後追加予定",
  "Estado del MVP": "MVPの状況",
  "Las compras, el aula y el acceso de alumnado quedan fuera de esta primera versión.":
    "購入機能、オンライン教室、受講生ログインは、この最初のバージョンには含まれていません。",
  "© 2026 Nihongo (日本語) · Proyecto demostrativo":
    "© 2026 日本語 (Nihongo)・デモプロジェクト",
  "Privacidad · Cookies · Aviso legal": "プライバシー・Cookie・法的情報",
  "Ilustración de newsletter": "ニュースレターのイラスト",
  "Nihongo snacks": "日本語スナック",
  "Japonés sin agobios, directo a tu bandeja de entrada.":
    "無理なく学べる日本語を、あなたの受信箱へ。",
  "Una píldora breve con vocabulario, cultura y consejos prácticos para mantener la motivación.":
    "語彙や文化、学習を続けるための実践的なヒントを短くまとめてお届けします。",
  "¡Gracias! El formulario de demostración funciona; conectaremos el envío más adelante.":
    "ありがとうございます！デモフォームは動作しました。実際の配信機能は今後接続します。",
  Nombre: "お名前",
  "Tu nombre": "お名前を入力",
  "Correo electrónico": "メールアドレス",
  "tu@email.com": "メールアドレスを入力",
  "Quiero mis snacks": "スナックを受け取る",
  "Avanza a tu ritmo": "自分のペースで進める",
  "Sin fechas que te agobien. Tú decides cuándo estudiar y cuánto avanzar.":
    "締め切りに追われる必要はありません。いつ、どれだけ学ぶかはあなたが決められます。",
  "Tu aula siempre abierta": "いつでも開いている教室",
  "Estudia donde quieras. Solo necesitas conexión y ganas de aprender.":
    "好きな場所で学べます。必要なのはインターネット環境と学びたい気持ちだけです。",
  "Recursos que sí ayudan": "本当に役立つ教材",
  "Ejercicios y materiales claros para practicar entre lecciones.":
    "レッスンの合間に練習できる、わかりやすい問題と教材を用意しています。",
  ようこそ: "Bienvenido",
  "El japonés no se aprende con trucos. Se aprende recorriendo el camino.":
    "日本語は裏技では身につきません。一歩ずつ道を進むことで身につきます。",
  "Una escuela online que combina método, cultura y acompañamiento para estudiantes de habla hispana.":
    "スペイン語話者の学習者に向けて、学習法、文化、サポートを組み合わせたオンラインスクールです。",
  "Descubre tu camino": "自分の学び方を見つける",
  "Conoce la escuela": "スクールについて知る",
  "Retrato de profesor pendiente": "講師の写真は準備中です",
  "Un método que encaja contigo": "あなたに合う学習法",
  "¡Tu nueva forma de aprender Japonés, esta te funciona!":
    "新しい日本語の学び方。今度こそ、あなたに合う方法です！",
  "Respetamos tu tiempo y tu forma de estudiar. Tú marcas el ritmo; nosotros ponemos el mapa, la práctica y el acompañamiento.":
    "あなたの時間と学び方を大切にします。ペースを決めるのはあなた。私たちは道しるべ、練習、サポートを用意します。",
  "años acompañando a estudiantes": "年以上、学習者をサポート",
  "alumnos en nuestra comunidad": "人の学習者がコミュニティに参加",
  "cursos para distintas etapas": "以上のレベル別コース",
  "Elige tu siguiente paso": "次の一歩を選ぼう",
  "Un curso para acercarte un poco más a Japón":
    "日本をもっと身近に感じるためのコース",
  "Formación continua": "継続的な学び",
  "Cursos anuales de japonés": "年間日本語コース",
  "Un recorrido guiado por niveles, con una base sólida y tiempo para afianzar cada paso.":
    "レベルごとに進むガイド付きの学習プラン。確かな基礎を築き、一歩ずつ定着させます。",
  "Aprendizaje flexible": "柔軟な学び",
  "Cursos temáticos de japonés": "テーマ別日本語コース",
  "Retos concretos para empezar desde cero, mejorar tu gramática o profundizar en un tema.":
    "ゼロから始めたい方、文法を伸ばしたい方、特定のテーマを深めたい方のための実践的なコースです。",
  "Ver cursos": "コースを見る",
  いっしょに: "Juntos",
  "Una escuela con personas. Sin atajos, pero con un equipo a tu lado.":
    "人とつながるスクール。近道はなくても、そばにはチームがいます。",
  "Te damos una ruta clara, explicaciones pensadas para hispanohablantes y una comunidad que entiende lo que cuesta aprender algo nuevo.":
    "わかりやすい学習ルート、スペイン語話者向けの解説、そして新しいことを学ぶ難しさを理解するコミュニティを提供します。",
  "¿Te vienes?": "一緒に始めませんか？",
  "Foto de la comunidad pendiente": "コミュニティ写真は準備中です",
  "Voces de la comunidad": "コミュニティの声",
  "Así se vive aprender con nosotros": "私たちと学ぶということ",
  "“Por fin entiendo por qué se construyen así las frases.”":
    "「なぜこの語順になるのか、やっと理解できました。」",
  "Lucía · nivel inicial": "ルシア・初級レベル",
  "“Puedo estudiar sin sentir que siempre llego tarde.”":
    "「遅れていると感じることなく、自分のペースで勉強できます。」",
  "Marcos · curso temático": "マルコス・テーマ別コース",
  "“La mezcla de idioma y cultura mantiene viva mi curiosidad.”":
    "「言葉と文化を一緒に学べるので、好奇心がずっと続きます。」",
  "Eva · nivel A2": "エバ・A2レベル",
  学ぶ: "Aprender",
  "Cursos de japonés para cada etapa": "すべての段階に合う日本語コース",
  "Empieza desde cero, retoma lo que dejaste a medias o enfócate en una habilidad concreta.":
    "ゼロから始めることも、途中から再開することも、特定のスキルに集中することもできます。",
  Explorar: "詳しく見る",
  長い道: "Un largo camino",
  好きなこと: "Lo que te gusta",
  "Detalles próximamente": "詳細は近日公開",
  "Nivel inicial desde cero": "ゼロから始める初級",
  "Tu primera base de escritura, vocabulario y conversación.":
    "文字、語彙、会話の最初の基礎を身につけます。",
  "Nivel inicial II": "初級 II",
  "Consolida lo aprendido y empieza a expresarte con más soltura.":
    "学んだことを定着させ、より自然に表現できるようになります。",
  "Nivel elemental I": "初中級 I",
  "Amplía estructuras y comprende situaciones cotidianas.":
    "表現の幅を広げ、日常の場面を理解します。",
  "Nivel elemental II": "初中級 II",
  "Gana autonomía para comunicarte con naturalidad.":
    "より自然に、自分の力でコミュニケーションできるようになります。",
  "Nivel intermedio I": "中級 I",
  "Da el salto a textos y conversaciones más complejas.":
    "より複雑な文章や会話へステップアップします。",
  "Nivel intermedio II": "中級 II",
  "Profundiza y conecta todas tus competencias.":
    "すべてのスキルを深め、つなげていきます。",
  旅: "Viaje",
  "Japonés para viajeros": "旅行者のための日本語",
  "Frases, costumbres y recursos para disfrutar de tu viaje.":
    "旅を楽しむためのフレーズ、習慣、役立つ知識を学びます。",
  あ: "Kana",
  "Hiragana y katakana": "ひらがなとカタカナ",
  "Aprende a leer y escribir los dos silabarios paso a paso.":
    "2つの仮名を一歩ずつ読み書きできるようになります。",
  文: "Frases",
  "Gramática japonesa": "日本語文法",
  "Ordena lo que sabes y entiende cómo funciona el idioma.":
    "知識を整理し、日本語の仕組みを理解します。",
  読: "Lectura",
  "Entrenamiento de lectura": "読解トレーニング",
  "Mejora ritmo, comprensión y confianza con textos graduados.":
    "レベル別の文章で、読む速度、理解力、自信を高めます。",
  "Cursos anuales: una ruta completa": "年間コース：体系的に学ぶ道",
  "Programas por niveles para aprender con estructura, práctica y acompañamiento.":
    "体系、練習、サポートを組み合わせたレベル別プログラムです。",
  "Cursos temáticos: elige tu reto": "テーマ別コース：挑戦を選ぼう",
  "Formaciones más cortas para trabajar una necesidad concreta a tu propio ritmo.":
    "特定の課題に自分のペースで取り組める短期コースです。",
  読む: "Leer",
  "Libros para seguir aprendiendo": "学びを続けるための本",
  "Lecturas y cuadernos diseñados para convertir la curiosidad en práctica.":
    "好奇心を実践につなげるために作られた読み物とワークブックです。",
  "La magia de los kanji": "漢字の魅力",
  "Lecturas graduadas": "レベル別読み物",
  練習: "Práctica",
  "Recursos sencillos para organizar el estudio y practicar de forma constante.":
    "学習を整理し、継続して練習するためのシンプルな教材です。",
  "Cuaderno de escritura": "文字練習帳",
  "Planificador de estudio": "学習プランナー",
  "Kit de preparación JLPT": "JLPT対策キット",
  無料: "Gratis",
  "Empieza a aprender gratis": "無料で学び始めよう",
  "Prueba el método con pequeñas lecciones y descubre por dónde continuar.":
    "短いレッスンで学習法を試し、次に進む道を見つけましょう。",
  "Guía para empezar": "スタートガイド",
  "Mini lecciones por email": "メールで届くミニレッスン",
  "Recursos de vocabulario": "語彙リソース",
  Recurso: "リソース",
  "Contenido de muestra para definir la estructura antes de incorporar el catálogo real.":
    "実際のカタログを追加する前に構成を確認するためのサンプルコンテンツです。",
  "Disponible más adelante": "今後公開予定",
  私たち: "Nosotros",
  "Mucho más que una pantalla con lecciones":
    "画面の中のレッスンだけではない学び",
  "Un proyecto nacido para explicar japonés a hispanohablantes con claridad, contexto y cercanía.":
    "スペイン語話者に、日本語をわかりやすく、背景と親しみを込めて伝えるために生まれたプロジェクトです。",
  "Foto del equipo pendiente": "チーム写真は準備中です",
  "Nuestra manera de enseñar": "私たちの教え方",
  "Japón se entiende mejor cuando idioma y cultura avanzan juntos.":
    "言葉と文化を一緒に学ぶと、日本がもっとよくわかります。",
  "La escuela combina una mirada nativa con explicaciones pensadas para las dudas que aparecen al aprender desde el español.":
    "ネイティブの視点と、スペイン語から学ぶときに生まれる疑問に寄り添った解説を組み合わせています。",
  "Este MVP presenta la experiencia pública. Los perfiles reales, el equipo completo y el acceso al aula se incorporarán en fases posteriores.":
    "このMVPでは公開部分の体験を紹介しています。実際のプロフィール、チーム全体、教室へのアクセスは今後追加します。",
  Claridad: "わかりやすさ",
  "Explicar bien antes que impresionar.":
    "感心させるより、まずわかりやすく伝える。",
  Constancia: "継続",
  "Un poco cada día vale más que un sprint.":
    "一気に頑張るより、毎日少しずつ続ける。",
  Cercanía: "寄り添い",
  "Aprender acompañado cambia el recorrido.":
    "一緒に学ぶ人がいると、道のりが変わります。",
  連絡: "Contacto",
  Hablemos: "お話ししましょう",
  "Cuéntanos qué quieres aprender y te ayudaremos a encontrar el mejor punto de partida.":
    "学びたいことを教えてください。最適なスタート地点を一緒に見つけます。",
  "Estamos al otro lado": "いつでもご連絡ください",
  "Este formulario es interactivo, aunque todavía no envía datos a ningún servicio.":
    "このフォームは操作できますが、まだ外部サービスへデータを送信しません。",
  "Mensaje preparado. Conectaremos el envío real en una fase posterior.":
    "メッセージを準備しました。実際の送信機能は今後接続します。",
  "¿En qué podemos ayudarte?": "どのようなお手伝いが必要ですか？",
  "Preparar mensaje": "メッセージを準備する",
  一歩ずつ: "Paso a paso",
  "¡El japonés es fácil, solo hay que saber algunas cosas!":
    "日本語は簡単！いくつかのポイントを知れば大丈夫です！",
  "Probar recursos gratis": "無料教材を試す",
  迷子: "Perdido",
  "Esta página se ha perdido por el camino.":
    "このページは道に迷ってしまったようです。",
  "Volver al inicio": "ホームに戻る",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translator;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    return window.localStorage.getItem("nihongo-language") === "ja"
      ? "ja"
      : "es";
  } catch {
    return "es";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const t = useCallback<Translator>(
    (text) => (language === "ja" ? (mirroredCopy[text] ?? text) : text),
    [language],
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "es" ? "ja" : "es"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t("Nihongo (日本語) · Aprende japonés online");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        t(
          "MVP de una escuela online de japonés: cursos, materiales y recursos gratuitos.",
        ),
      );

    try {
      window.localStorage.setItem("nihongo-language", language);
    } catch {
      // The language still works when storage is unavailable.
    }
  }, [language, t]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, t, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// The provider and its companion hook intentionally live together.
// oxlint-disable-next-line react/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
