"use client"

import { useState } from "react"

import { supabase } from "@/lib/supabase"

export default function Home() {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [eingeloggt, setEingeloggt] = useState(false)

const handleRegister = async () => {
const { error } = await supabase.auth.signUp({
email,
password,
})

if (error) {
alert(error.message)
return
}

alert("Registrierung erfolgreich")
}

return (
<main
className="min-h-screen bg-cover bg-center text-white"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop')",
}}
>

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
type="email"
placeholder="E-Mail"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full p-4 rounded-xl text-black mb-4"
/>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full p-4 rounded-xl text-black mb-6"
/>

<button
onClick={handleRegister}
className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition"
>
Einloggen
</button>

</div>

) : (

<div className="bg-zinc-900 rounded-3xl p-10 text-center max-w-xl">

<h2 className="text-4xl font-bold text-green-400 mb-4">
Willkommen {email} 👋
</h2>

<p className="text-zinc-300 text-xl">
Du bist erfolgreich eingeloggt.
</p>

</div>

)}
</main>
)
}