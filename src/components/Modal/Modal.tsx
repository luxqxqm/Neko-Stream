import { createPortal } from "react-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import css from "./Modal.module.css";
import type { Auth, AuthUser } from "../../types/types";
import { AuthApiError, login, register } from "../../api/authApi";

interface Props {
  mode: Auth;
  onClose: () => void;
  onSwitchMode: () => void;
  onAuthenticated: (user: AuthUser) => void;
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialForm: FormValues = { username: "", email: "", password: "", confirmPassword: "" };

export default function Modal({ onClose, mode, onSwitchMode, onAuthenticated }: Props) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const keyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", keyClose);
    return () => window.removeEventListener("keydown", keyClose);
  }, [isSubmitting, onClose]);

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (mode === "register" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = mode === "login"
        ? await login({ email: form.email, password: form.password })
        : await register({ username: form.username, email: form.email, password: form.password });
      onAuthenticated(result.user);
    } catch (requestError) {
      if (requestError instanceof AuthApiError) {
        const fieldError = Object.values(requestError.fields ?? {}).flat()[0];
        setError(fieldError ?? requestError.message);
      } else {
        setError("The server is unavailable. Please try again shortly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className={css.backdrop} onMouseDown={isSubmitting ? undefined : onClose}>
      <div
        className={css.modal}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
      >
        <div className={css.topRow}>
          <span className={css.eyebrow}>{mode === "login" ? "Welcome back" : "Join NekoStream"}</span>
          <button onClick={onClose} disabled={isSubmitting} className={css.closeBtn} aria-label="Close">×</button>
        </div>

        <div className={css.iconWrap} aria-hidden="true">
          <span className={css.iconGlow}></span>
          <span className={css.icon}>✦</span>
        </div>

        <h2 id="auth-dialog-title" className={css.title}>
          {mode === "login" ? "Login to continue" : "Create your account"}
        </h2>
        <p className={css.subtitle}>
          {mode === "login"
            ? "Access your account and stay up to date with new episodes."
            : "Start building your anime library with a premium-style experience."}
        </p>

        <form onSubmit={handleSubmit} className={css.form} noValidate>
          {mode === "register" && (
            <input type="text" placeholder="Username" name="username" autoComplete="username"
              value={form.username} onChange={updateField} minLength={3} maxLength={30} required />
          )}
          <input type="email" placeholder="Email" name="email" autoComplete="email"
            value={form.email} onChange={updateField} required />
          <input type="password" placeholder="Password" name="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={form.password} onChange={updateField} minLength={8} maxLength={72} required />
          {mode === "register" && (
            <input type="password" placeholder="Confirm password" name="confirmPassword" autoComplete="new-password"
              value={form.confirmPassword} onChange={updateField} minLength={8} maxLength={72} required />
          )}
          {error && <p className={css.error} role="alert">{error}</p>}
          <button className={css.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? "Please wait…" : mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <p className={css.switchText}>
          {mode === "login" ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <button type="button" className={css.switchBtn} onClick={onSwitchMode} disabled={isSubmitting}>
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>,
    document.body,
  );
}
