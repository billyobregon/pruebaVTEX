import preguntasDieselTrivia from "./preguntas"; 
import { useState, useEffect } from "react";

function GameDiesel() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(40);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);




  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta

    setTimeout(() => {
      if (preguntaActual === preguntasDieselTrivia.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(40);
      }
    }, 1500);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);
  // const puntuacionCorrecto = function(){
  //   if(puntuacionCorrecto <= 3){
  //     return console.log("Correcto")
  //   }else if (puntuacionCorrecto >= 3){
  //       return console.log("Incorrecto")
      
  //   }
  //  }


  if (isFinished){
  return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            {" "}
            Obtuviste {puntuación} de {preguntasDieselTrivia.length}{" "}            
          </span><h4>Cupon:diesel</h4>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );
  }
  

  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntasDieselTrivia.length}
          </div>
          <div className="titulo-pregunta">
            {preguntasDieselTrivia[preguntaActual].titulo}
          </div>
          <div>
            {
              preguntasDieselTrivia[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntasDieselTrivia.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === preguntasDieselTrivia.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span> Pregunta {preguntaActual + 1} de</span> {preguntasDieselTrivia.length}
        </div>
        <div className="titulo-pregunta">
          {preguntasDieselTrivia[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}{" "}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === preguntasDieselTrivia.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {preguntasDieselTrivia[preguntaActual].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default GameDiesel;