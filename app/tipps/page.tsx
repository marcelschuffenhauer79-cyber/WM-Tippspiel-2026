const spiele = [
  {
    datum: "11.06.2026",
    uhrzeit: "15:00",
    gruppe: "A",
    heim: "Mexiko",
    auswaerts: "Südafrika"
  }
]

export default function Tipps() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Tippschein</h1>

      {spiele.map((spiel, index) => (
        <div key={index} className="bg-zinc-900 p-4 rounded-2xl mb-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-zinc-400">
              {spiel.datum} • {spiel.uhrzeit} • Gruppe {spiel.gruppe}
            </div>

            <div className="text-xl">
              {spiel.heim} vs {spiel.auswaerts}
            </div>
          </div>

          <div className="flex gap-2">
            <input className="w-12 p-2 rounded text-black" />
            <span>:</span>
            <input className="w-12 p-2 rounded text-black" />
          </div>
        </div>
      ))}
    </main>
  )
}
