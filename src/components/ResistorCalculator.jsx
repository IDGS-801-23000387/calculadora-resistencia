import { useState, useEffect } from 'react';

const ResistorCalculator = () => {
  const COLORS = {
    negro: { digit: 0, multiplier: 1, tolerance: null, color: '#000000', textColor: '#ffffff' },
    marron: { digit: 1, multiplier: 10, tolerance: '±1%', color: '#8B4513', textColor: '#ffffff' },
    rojo: { digit: 2, multiplier: 100, tolerance: '±2%', color: '#FF0000', textColor: '#ffffff' },
    naranja: { digit: 3, multiplier: 1000, tolerance: null, color: '#FFA500', textColor: '#000000' },
    amarillo: { digit: 4, multiplier: 10000, tolerance: null, color: '#FFFF00', textColor: '#000000' },
    verde: { digit: 5, multiplier: 100000, tolerance: null, color: '#008000', textColor: '#ffffff' },
    azul: { digit: 6, multiplier: 1000000, tolerance: null, color: '#0000FF', textColor: '#ffffff' },
    violeta: { digit: 7, multiplier: 10000000, tolerance: null, color: '#8B00FF', textColor: '#ffffff' },
    gris: { digit: 8, multiplier: null, tolerance: null, color: '#808080', textColor: '#ffffff' },
    blanco: { digit: 9, multiplier: null, tolerance: null, color: '#FFFFFF', textColor: '#000000' },
    dorado: { digit: null, multiplier: 0.1, tolerance: '±5%', color: '#FFD700', textColor: '#000000' },
    plateado: { digit: null, multiplier: 0.01, tolerance: '±10%', color: '#C0C0C0', textColor: '#000000' }
  };

  const [bands, setBands] = useState({
    band1: 'marron',
    band2: 'negro',
    band3: 'rojo',
    band4: 'dorado'
  });

  const [result, setResult] = useState({ value: 0, unit: 'Ω', tolerance: '±5%' });

  const formatResistance = (value) => {
    const units = [
      { threshold: 1000000, divisor: 1000000, unit: 'MΩ' },
      { threshold: 1000, divisor: 1000, unit: 'KΩ' },
      { threshold: 0, divisor: 1, unit: 'Ω' }
    ];

    const unit = units.find(u => value >= u.threshold);
    return { value: value / unit.divisor, unit: unit.unit };
  };

  useEffect(() => {
    const digit1 = COLORS[bands.band1].digit;
    const digit2 = COLORS[bands.band2].digit;
    const multiplier = COLORS[bands.band3].multiplier;
    const tolerance = COLORS[bands.band4].tolerance;

    const resistanceValue = (digit1 * 10 + digit2) * multiplier;
    const formatted = formatResistance(resistanceValue);

    setResult({ ...formatted, tolerance });
  }, [bands]);

  const updateBand = (bandName, value) => {
    setBands(prev => ({ ...prev, [bandName]: value }));
  };

  const BandSelector = ({ label, bandName, options, currentValue }) => (
    <div className="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
      <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>
      <select
        value={currentValue}
        onChange={(e) => updateBand(bandName, e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-500 rounded focus:border-blue-500 focus:outline-none text-white"
      >
        {options.map((color) => {
          const data = COLORS[color];
          const displayValue = bandName === 'band4' 
            ? data.tolerance 
            : bandName === 'band3' 
              ? `×${data.multiplier}` 
              : data.digit;
          
          return (
            <option key={color} value={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)} ({displayValue})
            </option>
          );
        })}
      </select>
    </div>
  );

  const digitColors = Object.keys(COLORS).filter(c => COLORS[c].digit !== null);
  const multiplierColors = Object.keys(COLORS).filter(c => COLORS[c].multiplier !== null);
  const toleranceColors = Object.keys(COLORS).filter(c => COLORS[c].tolerance !== null);

  const tableData = [
    { name: 'Negro', color: '#000000', digit: '0', multiplier: '×1', tolerance: '-' },
    { name: 'Marrón', color: '#8B4513', digit: '1', multiplier: '×10', tolerance: '±1%' },
    { name: 'Rojo', color: '#FF0000', digit: '2', multiplier: '×100', tolerance: '±2%' },
    { name: 'Naranja', color: '#FFA500', digit: '3', multiplier: '×1K', tolerance: '-' },
    { name: 'Amarillo', color: '#FFFF00', digit: '4', multiplier: '×10K', tolerance: '-' },
    { name: 'Verde', color: '#008000', digit: '5', multiplier: '×100K', tolerance: '-' },
    { name: 'Azul', color: '#0000FF', digit: '6', multiplier: '×1M', tolerance: '-' },
    { name: 'Violeta', color: '#8B00FF', digit: '7', multiplier: '×10M', tolerance: '-' },
    { name: 'Gris', color: '#808080', digit: '8', multiplier: '-', tolerance: '-' },
    { name: 'Blanco', color: '#FFFFFF', digit: '9', multiplier: '-', tolerance: '-' },
    { name: 'Dorado', color: '#FFD700', digit: '-', multiplier: '×0.1', tolerance: '±5%' },
    { name: 'Plateado', color: '#C0C0C0', digit: '-', multiplier: '×0.01', tolerance: '±10%' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Calculadora de Resistencia</h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-1 bg-gray-600 p-2 rounded-full">
              <div className="w-4 h-12 rounded" style={{ backgroundColor: COLORS[bands.band1].color }}></div>
              <div className="w-4 h-12 rounded" style={{ backgroundColor: COLORS[bands.band2].color }}></div>
              <div className="w-4 h-12 rounded" style={{ backgroundColor: COLORS[bands.band3].color }}></div>
              <div className="w-2 h-12 bg-gray-500 mx-1"></div>
              <div className="w-4 h-12 rounded" style={{ backgroundColor: COLORS[bands.band4].color }}></div>
            </div>
          </div>

          <div className="bg-blue-900 rounded-lg p-4 mb-6 text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {result.value} {result.unit}
            </p>
            <p className="text-base text-blue-200">
              Tolerancia: {result.tolerance}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Selecciona los Colores</h3>
            
            <BandSelector 
              label="Banda 1 (Primer Dígito)" 
              bandName="band1" 
              options={digitColors} 
              currentValue={bands.band1} 
            />
            
            <BandSelector 
              label="Banda 2 (Segundo Dígito)" 
              bandName="band2" 
              options={digitColors} 
              currentValue={bands.band2} 
            />
            
            <BandSelector 
              label="Banda 3 (Multiplicador)" 
              bandName="band3" 
              options={multiplierColors} 
              currentValue={bands.band3} 
            />
            
            <BandSelector 
              label="Banda 4 (Tolerancia)" 
              bandName="band4" 
              options={toleranceColors} 
              currentValue={bands.band4} 
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Tabla de Referencia de Colores</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="p-3 text-left font-medium">Color</th>
                  <th className="p-3 text-center font-medium">Dígito</th>
                  <th className="p-3 text-center font-medium">Multiplicador</th>
                  <th className="p-3 text-center font-medium">Tolerancia</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 last:border-b-0">
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-gray-600" style={{ backgroundColor: row.color }}></div>
                      <span className="font-medium">{row.name}</span>
                    </td>
                    <td className="p-3 text-center">{row.digit}</td>
                    <td className="p-3 text-center">{row.multiplier}</td>
                    <td className="p-3 text-center">{row.tolerance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResistorCalculator;
