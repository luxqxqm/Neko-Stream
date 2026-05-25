import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HomePage from "./pages/HomePage/HomePage";
import Modal from "./components/Modal/Modal";
import AnimeDetailsModal from "./components/AnimeDetailsModal/AnimeDetailsModal";
import type { Auth } from "./types/types";

export default function App() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Auth>("login");
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

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
      />
      <main>
        <Hero />
        <HomePage search={search} onAnimeSelect={setSelectedAnimeId} />
      </main>
      {isModalOpen && (
        <Modal
          mode={authMode}
          onSwitchMode={switchMode}
          onClose={modalClose}
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
