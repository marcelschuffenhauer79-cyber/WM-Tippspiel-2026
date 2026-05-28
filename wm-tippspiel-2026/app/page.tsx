"use client"

import { useState } from "react"

import { supabase } from "@/lib/supabase"

export default function Home() {

const [name, setName] = useState("")
const [spieler, setSpieler] = useState("")
const [eingeloggt, setEingeloggt] = useState(false)

const handleLogin = async () => {

if (!name || !spieler) {
alert("Bitte alle Felder ausfüllen")
return
}
localStorage.setItem("wm_name", name)
localStorage.setItem("wm_spieler", spieler)

await supabase
.from("users")
.insert([
{
name,
favorite_player: spieler
}
])
setEingeloggt(true)
}

return (
<main className="min-h-screen bg-black text-white flex flex-col items-center p-10">

<h1 className="text-6xl font-bold text-yellow-400 mb-4">
WM Tippspiel 2026
</h1>

<p className="text-xl text-zinc-300 mb-10">
Tippen. Punkten. Gewinnen.
</p>

{!eingeloggt ? (

<div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl">

<h2 className="text-3xl font-semibold mb-6">
Anmeldung
</h2>

<input
type="text"
placeholder="Dein Name"
value={name}
onChange={(e) => setName(e.target.value)}
className="w-full p-4 rounded-xl text-black mb-4"
/>

<input
type="text"
placeholder="Lieblingsspieler (Nachname)"
value={spieler}
onChange={(e) => setSpieler(e.target.value)}
className="w-full p-4 rounded-xl text-black mb-6"
/>

<button
onClick={handleLogin}
className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition"
>
Einloggen
</button>

</div>

) : (

<div className="bg-zinc-900 rounded-3xl p-10 text-center max-w-xl">

<h2 className="text-4xl font-bold text-green-400 mb-4">
Willkommen {name} 👋
</h2>

<p className="text-zinc-300 text-xl">
Du bist erfolgreich eingeloggt.
</p>

</div>

)}

</main>
)
}