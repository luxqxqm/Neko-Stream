import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HomePage from "./pages/HomePage/HomePage";
import Modal from "./components/Modal/Modal";
import AnimeDetailsModal from "./components/AnimeDetailsModal/AnimeDetailsModal";
import type { Auth, AuthUser } from "./types/types";
import { AuthApiError, getCurrentUser, logout, refreshSession } from "./api/authApi";

export default function App() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Auth>("login");
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;
    const restoreSession = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        if (isMounted) setUser(currentUser);
      } catch (error) {
        if (!(error instanceof AuthApiError) || error.status !== 401) return;
        try {
          const { user: refreshedUser } = await refreshSession();
          if (isMounted) setUser(refreshedUser);
        } catch {
          // An unauthenticated visitor is an expected state.
        }
      }
    };
    void restoreSession();
    return () => { isMounted = false; };
  }, []);

  const openLogin = () => {
    setAuthMode("login");
    setIsModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsModalOpen(true);
  };

  const modalClose = () => setIsModalOpen(false);
  const closeAnimeModal = () => setSelectedAnimeId(null);
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch {
      // Keep the displayed session until the server confirms logout.
    }
  };

  const switchMode = () => {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <>
      <Header
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
        search={search}
        setSearch={setSearch}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        <Hero onAnimeSelect={setSelectedAnimeId} />
        <HomePage search={search} onAnimeSelect={setSelectedAnimeId} />
      </main>
      {isModalOpen && (
        <Modal
          key={authMode}
          mode={authMode}
          onSwitchMode={switchMode}
          onClose={modalClose}
          onAuthenticated={(authenticatedUser) => {
            setUser(authenticatedUser);
            modalClose();
          }}
        />
      )}
      {selectedAnimeId && (
        <AnimeDetailsModal
          animeId={selectedAnimeId}
          onClose={closeAnimeModal}
        />
      )}
      <Footer />
    </>
  );
}
