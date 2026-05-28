"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { berechnePunkte } from "@/lib/punkte"

type Spieler = {
user_name: string
punkte: number
}

type result = {
match_id: number
home_goals: number
away_goals: number
}

export default function Tabelle() {

const [spieler, setSpieler] = useState<Spieler[]>([])

const [results, setResults] = useState<Result[]>([])

useEffect(() => {
ladeTabelle()
}, [])

const ladeTabelle = async () => {

const { data, error } = await supabase
.from("tips")
.select("*")

if (error) {
console.log(error)
return
}

const { data: resultData } = await supabase
.from("results")
.select("*")

if (resultData) {
setResults (resultData)
}
const grouped: {
[key: string]: number
} = {}

data.forEach((eintrag) => {

const spiel = resultData?.find(
(r) => r.match_id === eintrag.match_id
)

if (!spiel) return

const punkte = berechnePunkte(
eintrag.home_tip,
eintrag.away_tip,
spiel.home_goals,
spiel.away_goals
)

if (!grouped[eintrag.user_name]) {
grouped[eintrag.user_name] = 0
}

grouped[eintrag.user_name] += punkte
})

const spielerListe = Object.entries(grouped).map(
([user_name, punkte]) => ({
user_name,
punkte
})
).sort( (a, b) => b.punkte - a.punkte)

setSpieler(spielerListe)
}

return (
<main className="min-h-screen bg-black text-white p-10">

<h1 className="text-5xl font-bold text-yellow-400 mb-10">
Live-Tabelle
</h1>

<div className="bg-zinc-900 rounded-3xl overflow-hidden">

{spieler.map((spieler, index) => (

<div
key={index}
className="flex justify-between items-center px-8 py-6 border-b border-zinc-800"
>
<div className="text-4xl">
{index === 0
? "🥇"
: index === 1
? "🥈"
: index === 2
? "🥉"
: `#${index + 1}`}
</div>

<div className="text-2xl">
{spieler.user_name}
</div>

<div className="text-xl text-zinc-400">
{spieler.punkte} Punkte
</div>

</div>

))}

</div>

</main>
)
}