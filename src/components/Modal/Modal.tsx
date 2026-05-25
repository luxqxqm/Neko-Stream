import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";
import type { Auth } from "../../types/types";

interface Props {
  mode: Auth;
  onClose: () => void;
  onSwitchMode: () => void;
}

export default function Modal({ onClose, mode, onSwitchMode }: Props) {
  useEffect(() => {
    const keyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", keyClose);
    return () => window.removeEventListener("keydown", keyClose);
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.topRow}>
          <span className={css.eyebrow}>
            {mode === "login" ? "Welcome back" : "Join NekoStream"}
          </span>
          <button onClick={onClose} className={css.closeBtn} aria-label="Close">
            x
          </button>
        </div>

        <div className={css.iconWrap}>
          <span className={css.iconGlow}></span>
          <span className={css.icon}>*</span>
        </div>

        <h2 className={css.title}>
          {mode === "login" ? "Login to continue" : "Create your account"}
        </h2>

        <p className={css.subtitle}>
          {mode === "login"
            ? "Access your saved anime, watchlists and latest episode updates."
            : "Start building your anime library with a premium-style experience."}
        </p>

        <form onSubmit={(event) => event.preventDefault()} className={css.form}>
          {mode === "register" && <input type="text" placeholder="Username" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {mode === "register" && (
            <input type="password" placeholder="Confirm password" />
          )}

          <button className={css.submitBtn}>
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <p className={css.switchText}>
          {mode === "login"
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className={css.switchBtn}
            onClick={onSwitchMode}
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>,
    document.body,
  );
}
