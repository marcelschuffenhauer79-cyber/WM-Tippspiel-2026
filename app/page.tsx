export default function Home() {
return (
<main className="min-h-screen bg-black text-white flex flex-col items-center p-10">
<h1 className="text-6xl font-bold text-yellow-400 mb-4">
WM Tippspiel 2026
</h1>
<p className="text-xl text-zinc-300 mb-10">
Tippen. Punkten. Gewinnen.
</p>
<div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl">
<h2 className="text-3xl font-semibold mb-6">
Anmeldung
</h2>
<input
type="text"
placeholder="Dein Name"
className="w-full p-4 rounded-xl text-black mb-4"
/>
<input
type="text"
placeholder="Lieblingsspieler (Nachname)"
className="w-full p-4 rounded-xl text-black mb-6"
/>
<button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition">
Einloggen
</button>
</div>
<div className="mt-12 text-center text-zinc-400">
<p>⚽ Original FIFA WM 2026 Spielplan</p>
<p>🏆 Live-Tabelle & automatische Punkte</p>
<p>🔥 Sondertipps inklusive</p>
</div>
</main>
)
}