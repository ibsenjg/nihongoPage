import type { ReactNode } from "react";
import styled from "styled-components";

type SectionTitleProps = {
  eyebrow?: string;
  children: ReactNode;
};

const Title = styled.div.attrs({ className: "section-title" })``;

export function SectionTitle({ eyebrow, children }: SectionTitleProps) {
  return (
    <Title>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2>{children}</h2>
    </Title>
  );
}
