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
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Geben Sie an, wie häufig jede Situation derzeit auf Sie zutrifft:<br />
              <strong>(1) Nie | (2) Selten | (3) Manchmal | (4) Häufig | (5) Immer</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${corGradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Resultado: {resultado}</h2>
          <img
            src={
              resultado === "GRÜN"
                ? "/images/semaforo-verde.png"
                : resultado === "GELB"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Indicador ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "GRÜN" && (
            <p className="text-center">Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>
          )}
          {resultado === "GELB" && (
            <p className="text-center">Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>
          )}
          {resultado === "ROT" && (
            <p className="text-center">Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
    
        </>
      )}
    </div>
  );
}
