import { useState } from "react";

export default function DSWUberApp() {
  const [corridas, setCorridas] = useState([]);
  const [novaCorrida, setNovaCorrida] = useState({ valor: "", km: "" });

  const adicionarCorrida = () => {
    if (!novaCorrida.valor || !novaCorrida.km) return;
    setCorridas([
      ...corridas,
      { valor: parseFloat(novaCorrida.valor), km: parseFloat(novaCorrida.km) },
    ]);
    setNovaCorrida({ valor: "", km: "" });
  };

  const total = corridas.reduce((acc, c) => acc + c.valor, 0);
  const totalKm = corridas.reduce((acc, c) => acc + c.km, 0);
  const custoGasolina = (totalKm / 30) * 6.3;
  const lucro = total - custoGasolina;

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">DSW Uber Moto Fortaleza</h1>

      <div className="bg-white shadow rounded p-4 space-y-2">
        <input
          type="number"
          placeholder="Valor da corrida (R$)"
          value={novaCorrida.valor}
          onChange={(e) =>
            setNovaCorrida({ ...novaCorrida, valor: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Distância (km)"
          value={novaCorrida.km}
          onChange={(e) =>
            setNovaCorrida({ ...novaCorrida, km: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <button
          onClick={adicionarCorrida}
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Adicionar Corrida
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 space-y-1 text-sm">
        <p>Total ganho: <strong>R${total.toFixed(2)}</strong></p>
        <p>Total km: <strong>{totalKm.toFixed(1)} km</strong></p>
        <p>Gasto estimado com gasolina: <strong>R${custoGasolina.toFixed(2)}</strong></p>
        <p>Lucro líquido: <strong className="text-green-600">R${lucro.toFixed(2)}</strong></p>
        <p className="text-xs text-gray-500">Meta: R$30/hora</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="font-bold mb-2">Corridas</h2>
        <ul className="space-y-1 text-sm">
          {corridas.map((c, i) => (
            <li key={i}>R${c.valor.toFixed(2)} - {c.km} km</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
