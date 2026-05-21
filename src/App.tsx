import { useState } from 'react';

export default function App() {
  const [operacion, setOperacion] = useState<string>('0');

  const agregarNumero = (num: string) => {
    setOperacion((prev) => (prev === '0' ? num : prev + num));
  };

  const operar = (op: string) => {
    setOperacion((prev) => prev + ` ${op} `);
  };

  const limpiar = () => {
    setOperacion('0');
  };

  const calcular = () => {
    try {
      let expresion = operacion;

      // Si la operación contiene la división entera '//'
      if (expresion.includes('//')) {
        // Separamos los números usando el '//' como punto de división
        const partes = expresion.split('//');
        
        if (partes.length === 2) {
          // Evaluamos matemáticamente la parte izquierda y la parte derecha por separado
          const num1 = eval(partes[0]);
          const num2 = eval(partes[1]);
          
          if (num2 === 0) {
            setOperacion('Error: Div 0');
            return;
          }

          // Math.floor quita los decimales dando el resultado entero (ej: 5 // 2 = 2)
          const resultadoEntero = Math.floor(num1 / num2);
          setOperacion(String(resultadoEntero));
          return;
        }
      }

      // Si es una operación normal (+, -, *, /) se calcula directo
      const resultado = eval(expresion);
      setOperacion(String(resultado));
    } catch (error) {
      setOperacion('Error');
    }
  };


  return (
    <div className="bg-slate-900 flex items-center justify-center h-screen w-screen m-0 p-0 absolute top-0 left-0">
      <div className="bg-slate-800 p-6 rounded-3xl shadow-2xl w-80 border border-slate-700">
        
        <div className="bg-slate-950 text-emerald-400 text-right text-4xl p-4 rounded-2xl font-mono mb-6 h-20 flex items-center justify-end overflow-hidden shadow-inner">
          {operacion}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button className="bg-rose-600 hover:bg-rose-500 text-white p-4 rounded-2xl font-bold col-span-2 transition shadow-md cursor-pointer" onClick={limpiar}>C</button>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => operar('/')}>/</button>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => operar('*')}>*</button>
          
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('7')}>7</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('8')}>8</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('9')}>9</button>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => operar('-')}>-</button>
          
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('1')}>1</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('2')}>2</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('3')}>3</button>

          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => operar('+')}>+</button>

          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('4')}>4</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('5')}>5</button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => agregarNumero('6')}>6</button>

          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-2xl font-bold transition shadow-md cursor-pointer" onClick={() => operar('//')}>//</button>
          
          
          <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-2xl font-bold col-span-2 transition shadow-md cursor-pointer" onClick={() => agregarNumero('0')}>0</button>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 p-4 rounded-2xl font-bold col-span-2 transition shadow-md cursor-pointer" onClick={calcular}>=</button>
        </div>
      </div>
    </div>
  );
}
