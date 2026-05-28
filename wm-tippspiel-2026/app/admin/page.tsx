"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { spiele } from "@/data/spiele"

export default function Admin() {

const [ergebnisse, setErgebnisse] = useState<{
[key: number]: {
heim: string
gast: string
}
}>({})

const speichern = async (
spielId: number,
heim: string,
gast: string
) => {

const { error } = await supabase
.from("results")
.upsert({
match_id: spielId,
home_goals: Number(heim),
away_goals: Number(gast),
},
{ onConflict: "match_id"
}
)

if (error) {
console.log(error)
alert(error.message)
return
}

alert("Ergebnis gespeichert")
}

return (
<main className="min-h-screen bg-black text-white p-10">

<h1 className="text-5xl font-bold text-yellow-400 mb-10">
Ergebnisse eintragen
</h1>

<div className="space-y-4">

{spiele.map((spiel, index) => (

<div
key={index}
className="bg-zinc-900 rounded-2xl p-6 flex items-center justify-between"
>

<div>

<div className="text-zinc-400 text-sm">
{spiel.datum} • {spiel.uhrzeit}
</div>

<div className="text-2xl">
{spiel.heim} vs {spiel.auswaerts}
</div>

</div>

<div className="flex items-center gap-3">

<input
value={ergebnisse[index]?.heim || ""}
onChange={(e) =>
setErgebnisse({
...ergebnisse,
[index]: {
heim: e.target.value,
gast: ergebnisse[index]?.gast || "",
},
})
}
/>

<span>:</span>

<input
value={ergebnisse[index]?.gast || ""}
onChange={(e) =>
setErgebnisse({
...ergebnisse,
[index]: {
heim: ergebnisse[index]?.heim || "",
gast: e.target.value,
},
})
}
/>

<button
onClick={() =>
speichern(
spiel.id,
ergebnisse[index]?.heim || "",
ergebnisse[index]?.gast || ""
)
}
className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold"
>
Speichern
</button>

</div>

</div>

))}

</div>

</main>
)
}