import { Component, type ReactNode } from "react";
import { profile } from "@/data/profile";

export default class RenderBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="project-placeholder">
          <div role="alert">
            <h1>The portfolio couldn’t load.</h1>
            <p>Please reload the page or contact me directly.</p>
            <button
              type="button"
              className="button button-dark hosted-project-link"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
            <a className="text-link" href={`mailto:${profile.email}`}>
              Email Aakash
            </a>
          </div>
        </main>
      );
    return this.props.children;
  }
}
