"use client"

import { supabase } from "@/lib/supabase" 
import { spiele } from "@/data/spiele" 
import { useEffect, useState } from "react"

export default function Tipps() {

    const [geladen, setGeladen] = useState (false)

const [tipps, setTipps] = useState<{
[key: number]: {
heim: string
gast: string
}
}>({})

useEffect(() => {
const user = localStorage.getItem("wm_name")

if (user) {
ladeTipps()
setGeladen(true)
}
}, [])

const ladeTipps = async () => {
const user = localStorage.getItem("wm_name")
if (!user) return

const { data } = await supabase
.from("tipps")
.select("*")
.eq("user_name", user)

if (data) {
const formatierteTipps: any = {}

data.forEach((tipp: any) => {
formatierteTipps[tipp.match_id] = {
heim: tipp.home_tip?.toString() || "",
gast: tipp.away_tip?.toString() || "",
}
})

setTipps(formatierteTipps)
}
}

const speichern = async (
spielId: number,
heim: string,
gast: string
) => {

const user = localStorage.getItem("wm_name")

const { error } = await supabase
.from("tips")
.upsert({
user_name: user,
match_id: spielId,
home_tip: Number(heim),
away_tip: Number(gast),
},
{ onConflict: "user_name,match_id"
}   
)

if (error) {
console.log(error)
alert(JSON.stringify(error))
return
}

alert("Tipp gespeichert!")
}
return (
<main className="min-h-screen bg-black text-white p-10">

<h1 className="text-5xl font-bold text-yellow-400 mb-8">
Vorrunden-Tipps
</h1>

<div className="space-y-4">

{spiele.map((spiel, index) => {

const spielZeit = new Date(
`${spiel.datum.split(".").reverse().join("-")}T${spiel.uhrzeit}:00`
)

const jetzt = new Date()

const diffMinuten =
(spielZeit.getTime() - jetzt.getTime()) / 1000 / 60

const gesperrt = diffMinuten <= 15

return (
<div
key={index}
className="bg-zinc-900 rounded-2xl p-6 flex items-center justify-between"
>

<div>
<div className="text-zinc-400 text-sm mb-2">
{spiel.datum} • {spiel.uhrzeit} • Gruppe {spiel.gruppe}
</div>

<div className="text-2xl font-semibold">
{spiel.heim} vs {spiel.auswaerts}
</div>

{gesperrt && (
<div className="text-red-500 text-sm mt-2">
Tipps gesperrt
</div>
)}
</div>

<div className="flex items-center gap-2">
<input
type="number"
value={tipps[spiel.id]?.heim || ""}
disabled={gesperrt}
onChange={(e) =>
setTipps({
...tipps,
[spiel.id]: {
...tipps[spiel.id],
heim: e.target.value,
},
})
}
className="w-16 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1"
/>

<span>:</span>

<input
type="number"
value={tipps[spiel.id]?.gast || ""}
disabled={gesperrt}
onChange={(e) =>
setTipps({
...tipps,
[spiel.id]: {
...tipps[spiel.id],
gast: e.target.value,
},
})
}
className="w-16 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1"
/>

<button
disabled={gesperrt}
onClick={() =>
speichern(
spiel.id,
tipps[spiel.id]?.heim || "",
tipps[spiel.id]?.gast || ""
)
}
className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold disabled:opacity-40"
>
Tipp speichern
</button>
</div>
</div>
)
})}
</div>
</main>
)
}
