import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Translation } from "react-i18next";
import styled from "styled-components";
import { normalizeComponentStack } from "./normalizeComponentStack";

type AppErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: unknown, context: { componentStack?: string }) => void;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

const ErrorSection = styled.section.attrs({
  className: "not-found error-boundary",
})``;

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.onError?.(error, {
      componentStack: normalizeComponentStack(info.componentStack),
    });
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Translation>
        {(t) => (
          <ErrorSection role="alert">
            <div className="container">
              <span className="japanese-kicker">{t("error.eyebrow")}</span>
              <h1>{t("error.title")}</h1>
              <p>{t("error.description")}</p>
              <div className="button-row">
                <button
                  className="button button-red"
                  type="button"
                  onClick={this.retry}
                >
                  {t("error.retry")}
                </button>
                <Link className="text-link" to="/">
                  {t("error.home")}
                </Link>
              </div>
            </div>
          </ErrorSection>
        )}
      </Translation>
    );
  }
}
