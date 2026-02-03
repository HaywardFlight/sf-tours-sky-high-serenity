import React from "react";

type Props = { children: React.ReactNode };

type State = { error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui", color: "#fff", background: "#000", minHeight: "100vh" }}>
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>Site Error</h1>
          <p style={{ opacity: 0.85, marginBottom: 12 }}>
            Copy the text below and share it for debugging.
          </p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.4, background: "#111", padding: 12, borderRadius: 8 }}>
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
