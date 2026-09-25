import { Theory } from "@/types/theory"

export const THEORY: Record<string, Theory> = {
    "articles": {
        intro:
            "Артикль стоїть перед іменником і підказує, про що мова: про щось одне з багатьох, " +
            "про конкретну річ, яку знають обидва співрозмовники, чи про явище загалом.",
        sections: [
            {
                title: "a / an — одне з багатьох",
                text:
                    "Неозначений артикль. Лише з однинними злічуваними іменниками: коли згадуємо щось уперше, " +
                    "коли неважливо, яке саме, і коли кажемо, ким хтось є.",
                examples: [
                    "I saw [a] dog in the park.",
                    "Can I have [an] apple?",
                    "My brother is [a] doctor.",
                ],
            },
            {
                title: "a чи an — вирішує звук",
                text:
                    "Не літера, а звук на початку слова. Перед голосним звуком — an, перед приголосним — a. " +
                    "Тому hour починається з голосного звуку, а university — з приголосного [j].",
                examples: [
                    "[an] elephant, [an] hour, [an] honest man",
                    "[a] university, [a] European city, [a] one-way ticket",
                ],
            },
            {
                title: "the — саме цей",
                text:
                    "Означений артикль. Коли обидва розуміють, про що саме йдеться: предмет уже згадували, " +
                    "він очевидний з ситуації, він єдиний у своєму роді або стоїть у найвищому ступені.",
                examples: [
                    "I saw a dog. [The] dog was huge.",
                    "Could you close [the] door, please?",
                    "[The] sun is very bright today.",
                    "It's [the] best café in town.",
                ],
            },
            {
                title: "Без артикля",
                text:
                    "Коли говоримо про незлічуване чи множину загалом, а не про конкретне. " +
                    "Також без артикля — імена, міста й більшість країн.",
                examples: [
                    "[—] Water boils at 100 °C.",
                    "I don't drink [—] coffee at night.",
                    "[—] Cats sleep a lot.",
                    "She lives in [—] Kyiv.",
                ],
            },
        ],
        steps: [
            "Обидва знаєте, про що саме мова? — the",
            "Ні, і це одна злічувана річ? — a або an, за першим звуком",
            "Ні, це множина чи незлічуване загалом? — без артикля",
        ],
    },
}
