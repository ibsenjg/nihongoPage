import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const BrandLink = styled(Link).attrs({ className: "logo" })`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  text-decoration: none;
  line-height: 1;

  .logo-mark {
    display: grid;
    width: 46px;
    aspect-ratio: 1;
    place-items: center;
    color: var(--white);
    background: var(--red);
    border-radius: 50% 50% 45% 50%;
    font-size: 1.38rem;
    font-weight: 800;
    box-shadow: 5px 5px 0 var(--yellow);
  }

  strong,
  small {
    display: block;
  }

  strong {
    font-size: 1.28rem;
    letter-spacing: -0.04em;
  }

  small {
    margin-top: 5px;
    color: var(--blue);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  @media (max-width: 650px) {
    .logo-mark {
      width: 40px;
    }

    strong {
      font-size: 1.08rem;
    }

    small {
      font-size: 0.64rem;
    }
  }
`;

export function Logo() {
  const { t } = useTranslation();

  return (
    <BrandLink to="/" aria-label={t("common.brandHome")}>
      <span className="logo-mark" aria-hidden="true">
        {t("common.brandMark")}
      </span>
      <span>
        <strong>{t("common.brand")}</strong>
      </span>
    </BrandLink>
  );
}
