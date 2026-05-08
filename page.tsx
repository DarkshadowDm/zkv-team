"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [sent, setSent] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zkv_applications");

    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const application = {
      name: formData.get("name"),
      discord: formData.get("discord"),
      age: formData.get("age"),
      role: formData.get("role"),
      text: formData.get("text"),
      date: new Date().toLocaleString(),
    };

    const updated = [...applications, application];

    setApplications(updated);

    localStorage.setItem(
      "zkv_applications",
      JSON.stringify(updated)
    );

    setSent(true);

    e.target.reset();

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-red-600/10 blur-3xl"></div>

      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-5 right-5 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl font-bold z-50"
      >
        {musicOn ? "🔊 Musik AN" : "🔇 Musik AUS"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto p-6"
      >
        <div className="text-center py-16">
          <h1 className="text-6xl font-black text-red-500 drop-shadow-lg">
            ZKV TEAM
          </h1>

          <p className="text-zinc-300 mt-4 text-xl">
            Bewirb dich jetzt bei unserem Gaming-Team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-red-500 mb-6">
              Bewerbung
            </h2>

            {sent && (
              <div className="bg-green-600/20 border border-green-500 text-green-400 p-4 rounded-2xl mb-5">
                Bewerbung erfolgreich gesendet!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                required
                placeholder="Dein Name"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
              />

              <input
                name="discord"
                required
                placeholder="Discord Name"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
              />

              <input
                name="age"
                required
                type="number"
                placeholder="Alter"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
              />

              <select
                name="role"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
              >
                <option>Moderator</option>
                <option>Support</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Streamer</option>
              </select>

              <textarea
                name="text"
                required
                rows={5}
                placeholder="Warum willst du ins Team?"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 transition-all py-4 rounded-2xl text-xl font-bold shadow-lg"
              >
                Bewerbung absenden
              </button>
            </form>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-red-500 mb-6">
              Über ZKV
            </h2>

            <div className="space-y-5 text-zinc-300">
              <div className="bg-zinc-800 p-5 rounded-2xl">
                🎮 Gaming Community
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                🚀 Coole Projekte & Events
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                🔥 Aktives Team
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                💎 Chancen aufzusteigen
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-4xl font-bold text-center text-red-500 mb-8">
            Bewerbungen
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-red-400">
                    {app.name}
                  </h3>

                  <span className="text-xs text-zinc-500">
                    {app.date}
                  </span>
                </div>

                <p className="text-zinc-300 mb-2">
                  <strong>Discord:</strong> {app.discord}
                </p>

                <p className="text-zinc-300 mb-2">
                  <strong>Alter:</strong> {app.age}
                </p>

                <p className="text-zinc-300 mb-4">
                  <strong>Bereich:</strong> {app.role}
                </p>

                <div className="bg-zinc-800 p-4 rounded-2xl text-zinc-200">
                  {app.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}