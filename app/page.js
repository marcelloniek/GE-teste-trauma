"use client";

import { useState } from 'react';

const perguntas = [
  "Ich werde durch unerwünschte Erinnerungen oder Alpträume an ein schwieriges oder traumatisches Ereignis, das ich erlebt habe, belastet.",
  "Ich habe starke emotionale Reaktionen (Angst, Beklemmung oder Nervosität), wenn ich an das Trauma erinnert werde oder damit konfrontiert bin.",
  "Ich vermeide bewusst Orte, Menschen oder Situationen, die mich an das traumatische Ereignis erinnern könnten.",
  "Es fällt mir schwer, Menschen zu vertrauen oder neue Beziehungen einzugehen, nachdem ich schwierige Erfahrungen gemacht habe.",
  "Seit dem traumatischen Ereignis fällt es mir schwer, positive Gefühle zu empfinden oder Freude an früher angenehmen Aktivitäten zu haben.",
  "Ich habe kürzlich daran gedacht, mein Leben zu beenden oder mir selbst körperlichen Schaden zuzufügen, aufgrund des Leidens durch traumatische Erinnerungen.", // FLAG
  "Ich fühle mich oft nervös, schreckhaft oder ständig wachsam, als ob jederzeit etwas Schlimmes passieren könnte.",
  "Ich stelle erhebliche Veränderungen meines Schlafs fest (Schlaflosigkeit oder unruhiger Schlaf), verbunden mit traumatischen Erinnerungen oder Gedanken.",
  "Ich habe nach einem emotional intensiven oder traumatischen Ereignis Probleme mit Konzentration, Gedächtnis oder Aufmerksamkeit.",
  "Ich ziehe mich emotional oder sozial zurück, aus Angst, Scham oder Schmerz, die ich nach traumatischen Erfahrungen empfinde."
];

export default function TesteTrauma() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Trauma-Test</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Ergebnis: {resultado}</h2>
          {resultado === "GRÜN" && <p>Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>}
          {resultado === "GELB" && <p>Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>}
          {resultado === "ROT" && <p>Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
        </>
      )}
    </div>
  );
}
