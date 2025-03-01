import React, { useState } from 'react';
import { Building2, Euro, Plus, Minus } from 'lucide-react';

interface EstimationForm {
  terrasse: boolean;
  garage: boolean;
  jardin: boolean;
  piscine: boolean;
  nbChambres: number;
  nbPieces: number;
  departement: string;
  parking: boolean;
  typeBien: string;
  surface: number;
  ascenseur: boolean;
  box: boolean;
  balcon: boolean;
  prixPersonnalise: boolean;
  prixAuM2: number;
}

// Prix moyens au m² par département et type de bien
const prixMoyens: Record<string, Record<string, number>> = {
  "01": { "appartement": 2743, "maison": 2577 },
  "02": { "appartement": 1350, "maison": 1288 },
  "03": { "appartement": 1341, "maison": 1224 },
  "04": { "appartement": 2157, "maison": 2584 },
  "05": { "appartement": 3177, "maison": 3110 },
  "06": { "appartement": 5162, "maison": 5465 },
  "07": { "appartement": 1742, "maison": 2152 },
  "08": { "appartement": 1139, "maison": 1251 },
  "09": { "appartement": 1344, "maison": 1594 },
  "10": { "appartement": 1586, "maison": 1472 },
  "11": { "appartement": 2029, "maison": 2093 },
  "12": { "appartement": 1603, "maison": 1568 },
  "13": { "appartement": 3548, "maison": 4173 },
  "14": { "appartement": 3099, "maison": 2773 },
  "15": { "appartement": 1475, "maison": 1331 },
  "16": { "appartement": 1575, "maison": 1370 },
  "17": { "appartement": 3843, "maison": 3187 },
  "18": { "appartement": 1455, "maison": 1236 },
  "19": { "appartement": 1442, "maison": 1265 },
  "2A": { "appartement": 4556, "maison": 4972 },
  "2B": { "appartement": 3434, "maison": 3557 },
  "21": { "appartement": 2225, "maison": 1955 },
  "22": { "appartement": 2750, "maison": 2078 },
  "23": { "appartement": 937, "maison": 860 },
  "24": { "appartement": 1582, "maison": 1514 },
  "25": { "appartement": 1918, "maison": 1895 },
  "26": { "appartement": 1927, "maison": 2398 },
  "27": { "appartement": 1831, "maison": 1770 },
  "28": { "appartement": 2043, "maison": 1856 },
  "29": { "appartement": 2333, "maison": 2317 },
  "30": { "appartement": 2284, "maison": 2606 },
  "31": { "appartement": 3130, "maison": 2650 },
  "32": { "appartement": 1435, "maison": 1717 },
  "33": { "appartement": 3794, "maison": 3393 },
  "34": { "appartement": 3300, "maison": 3250 },
  "35": { "appartement": 3505, "maison": 2636 },
  "36": { "appartement": 1251, "maison": 1068 },
  "37": { "appartement": 2565, "maison": 2170 },
  "38": { "appartement": 2545, "maison": 2765 },
  "39": { "appartement": 1497, "maison": 1733 },
  "40": { "appartement": 3552, "maison": 3140 },
  "41": { "appartement": 1666, "maison": 1550 },
  "42": { "appartement": 1382, "maison": 2001 },
  "43": { "appartement": 1570, "maison": 1603 },
  "44": { "appartement": 3419, "maison": 2941 },
  "45": { "appartement": 2037, "maison": 1777 },
  "46": { "appartement": 1448, "maison": 1628 },
  "47": { "appartement": 1432, "maison": 1579 },
  "48": { "appartement": 1455, "maison": 1582 },
  "49": { "appartement": 2744, "maison": 2099 },
  "50": { "appartement": 2282, "maison": 1884 },
  "51": { "appartement": 2115, "maison": 1855 },
  "52": { "appartement": 1108, "maison": 983 },
  "53": { "appartement": 1849, "maison": 1465 },
  "54": { "appartement": 1896, "maison": 1801 },
  "55": { "appartement": 1123, "maison": 1060 },
  "56": { "appartement": 3289, "maison": 2830 },
  "57": { "appartement": 2005, "maison": 1624 },
  "58": { "appartement": 922, "maison": 1038 },
  "59": { "appartement": 2488, "maison": 1977 },
  "60": { "appartement": 2059, "maison": 2227 },
  "61": { "appartement": 1372, "maison": 1236 },
  "62": { "appartement": 2832, "maison": 1805 },
  "63": { "appartement": 2108, "maison": 1839 },
  "64": { "appartement": 4091, "maison": 3201 },
  "65": { "appartement": 1843, "maison": 1797 },
  "66": { "appartement": 2439, "maison": 2650 },
  "67": { "appartement": 3020, "maison": 2194 },
  "68": { "appartement": 1910, "maison": 2169 },
  "69": { "appartement": 3646, "maison": 3581 },
  "70": { "appartement": 1029, "maison": 1182 },
  "71": { "appartement": 1292, "maison": 1458 },
  "72": { "appartement": 1688, "maison": 1582 },
  "73": { "appartement": 5071, "maison": 3894 },
  "74": { "appartement": 4625, "maison": 4807 },
  "75": { "appartement": 9385, "maison": 10009 },
  "76": { "appartement": 2023, "maison": 2106 },
  "77": { "appartement": 3353, "maison": 2542 },
  "78": { "appartement": 4548, "maison": 3851 },
  "79": { "appartement": 1663, "maison": 1338 },
  "80": { "appartement": 2415, "maison": 1744 },
  "81": { "appartement": 1644, "maison": 1747 },
  "82": { "appartement": 1612, "maison": 1794 },
  "83": { "appartement": 4175, "maison": 4789 },
  "84": { "appartement": 2251, "maison": 3121 },
  "85": { "appartement": 2891, "maison": 2592 },
  "86": { "appartement": 1920, "maison": 1336 },
  "87": { "appartement": 1490, "maison": 1358 },
  "88": { "appartement": 1477, "maison": 1406 },
  "89": { "appartement": 1244, "maison": 1317 },
  "90": { "appartement": 1269, "maison": 1687 },
  "91": { "appartement": 3120, "maison": 2926 },
  "92": { "appartement": 6423, "maison": 6775 },
  "93": { "appartement": 4049, "maison": 3363 },
  "94": { "appartement": 5132, "maison": 4781 },
  "95": { "appartement": 3259, "maison": 3194 }
};

// Prix par défaut si le département n'est pas dans la liste
const prixParDefaut = { "appartement": 4000, "maison": 4500 };

const departements = [
  { code: "01", nom: "Ain" },
  { code: "02", nom: "Aisne" },
  { code: "03", nom: "Allier" },
  { code: "04", nom: "Alpes-de-Haute-Provence" },
  { code: "05", nom: "Hautes-Alpes" },
  { code: "06", nom: "Alpes-Maritimes" },
  { code: "07", nom: "Ardèche" },
  { code: "08", nom: "Ardennes" },
  { code: "09", nom: "Ariège" },
  { code: "10", nom: "Aube" },
  { code: "11", nom: "Aude" },
  { code: "12", nom: "Aveyron" },
  { code: "13", nom: "Bouches-du-Rhône" },
  { code: "14", nom: "Calvados" },
  { code: "15", nom: "Cantal" },
  { code: "16", nom: "Charente" },
  { code: "17", nom: "Charente-Maritime" },
  { code: "18", nom: "Cher" },
  { code: "19", nom: "Corrèze" },
  { code: "21", nom: "Côte-d'Or" },
  { code: "22", nom: "Côtes-d'Armor" },
  { code: "23", nom: "Creuse" },
  { code: "24", nom: "Dordogne" },
  { code: "25", nom: "Doubs" },
  { code: "26", nom: "Drôme" },
  { code: "27", nom: "Eure" },
  { code: "28", nom: "Eure-et-Loir" },
  { code: "29", nom: "Finistère" },
  { code: "30", nom: "Gard" },
  { code: "31", nom: "Haute-Garonne" },
  { code: "32", nom: "Gers" },
  { code: "33", nom: "Gironde" },
  { code: "34", nom: "Hérault" },
  { code: "35", nom: "Ille-et-Vilaine" },
  { code: "36", nom: "Indre" },
  { code: "37", nom: "Indre-et-Loire" },
  { code: "38", nom: "Isère" },
  { code: "39", nom: "Jura" },
  { code: "40", nom: "Landes" },
  { code: "41", nom: "Loir-et-Cher" },
  { code: "42", nom: "Loire" },
  { code: "43", nom: "Haute-Loire" },
  { code: "44", nom: "Loire-Atlantique" },
  { code: "45", nom: "Loiret" },
  { code: "46", nom: "Lot" },
  { code: "47", nom: "Lot-et-Garonne" },
  { code: "48", nom: "Lozère" },
  { code: "49", nom: "Maine-et-Loire" },
  { code: "50", nom: "Manche" },
  { code: "51", nom: "Marne" },
  { code: "52", nom: "Haute-Marne" },
  { code: "53", nom: "Mayenne" },
  { code: "54", nom: "Meurthe-et-Moselle" },
  { code: "55", nom: "Meuse" },
  { code: "56", nom: "Morbihan" },
  { code: "57", nom: "Moselle" },
  { code: "58", nom: "Nièvre" },
  { code: "59", nom: "Nord" },
  { code: "60", nom: "Oise" },
  { code: "61", nom: "Orne" },
  { code: "62", nom: "Pas-de-Calais" },
  { code: "63", nom: "Puy-de-Dôme" },
  { code: "64", nom: "Pyrénées-Atlantiques" },
  { code: "65", nom: "Hautes-Pyrénées" },
  { code: "66", nom: "Pyrénées-Orientales" },
  { code: "67", nom: "Bas-Rhin" },
  { code: "68", nom: "Haut-Rhin" },
  { code: "69", nom: "Rhône" },
  { code: "70", nom: "Haute-Saône" },
  { code: "71", nom: "Saône-et-Loire" },
  { code: "72", nom: "Sarthe" },
  { code: "73", nom: "Savoie" },
  { code: "74", nom: "Haute-Savoie" },
  { code: "75", nom: "Paris" },
  { code: "76", nom: "Seine-Maritime" },
  { code: "77", nom: "Seine-et-Marne" },
  { code: "78", nom: "Yvelines" },
  { code: "79", nom: "Deux-Sèvres" },
  { code: "80", nom: "Somme" },
  { code: "81", nom: "Tarn" },
  { code: "82", nom: "Tarn-et-Garonne" },
  { code: "83", nom: "Var" },
  { code: "84", nom: "Vaucluse" },
  { code: "85", nom: "Vendée" },
  { code: "86", nom: "Vienne" },
  { code: "87", nom: "Haute-Vienne" },
  { code: "88", nom: "Vosges" },
  { code: "89", nom: "Yonne" },
  { code: "90", nom: "Territoire de Belfort" },
  { code: "91", nom: "Essonne" },
  { code: "92", nom: "Hauts-de-Seine" },
  { code: "93", nom: "Seine-Saint-Denis" },
  { code: "94", nom: "Val-de-Marne" },
  { code: "95", nom: "Val-d'Oise" }
];

function App() {
  const [formData, setFormData] = useState<EstimationForm>({
    terrasse: false,
    garage: false,
    jardin: false,
    piscine: false,
    nbChambres: 1,
    nbPieces: 2,
    departement: "33",
    parking: false,
    typeBien: 'appartement',
    surface: 50,
    ascenseur: false,
    box: false,
    balcon: false,
    prixPersonnalise: false,
    prixAuM2: 4000,
  });

  const [estimation, setEstimation] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(newValue) : newValue
    }));
  };

  const handleIncrement = (field: 'surface' | 'nbPieces' | 'nbChambres' | 'prixAuM2') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + (field === 'prixAuM2' ? 100 : 1)
    }));
  };

  const handleDecrement = (field: 'surface' | 'nbPieces' | 'nbChambres' | 'prixAuM2') => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(field === 'prixAuM2' ? 1000 : 1, prev[field] - (field === 'prixAuM2' ? 100 : 1))
    }));
  };

  const calculateEstimation = async () => {
    // Détermination du prix au m² (comme avant)
    let prixAuM2;
    if (formData.prixPersonnalise) {
      prixAuM2 = formData.prixAuM2;
    } else {
      const prixDepartement = prixMoyens[formData.departement];
      if (prixDepartement) {
        prixAuM2 = prixDepartement[formData.typeBien];
      } else {
        prixAuM2 = prixParDefaut[formData.typeBien];
      }
    }
  
    // Préparation du payload pour l'API
    const payload = {
      Prix_m2: prixAuM2,
      Type_de_bien: [formData.typeBien],
      Nb_de_piece: formData.nbPieces,
      Nb_de_chambre: formData.nbChambres,
      Surface: formData.surface,
      Terrasse: formData.terrasse ? "Oui" : "Non",
      Balcon: formData.balcon ? "Oui" : "Non",
      Garage: formData.garage ? "Oui" : "Non",
      Jardin: formData.jardin ? "Oui" : "Non",
      Ascenseur: formData.ascenseur ? "Oui" : "Non",
      Box: formData.box ? "Oui" : "Non",
      Parking: formData.parking ? "Oui" : "Non",
      Piscine: formData.piscine ? "Oui" : "Non",
      Departement: parseFloat(formData.departement)
    };
  
    try {
      const response = await fetch(`${process.env.VITE_REACT_APP_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'appel à l'API");
      }
  
      const data = await response.json();
  
      // Affichage de l'estimation renvoyée par l'API
      setEstimation(Math.round(data.predictions));
    } catch (error) {
      console.error("Erreur lors de la prédiction:", error);
      // Vous pouvez aussi afficher une alerte ou un message à l'utilisateur
    }
  };


  const NumberInput = ({ label, name, value, step = 1, min = 1 }: { 
    label: string; 
    name: 'surface' | 'nbPieces' | 'nbChambres' | 'prixAuM2'; 
    value: number;
    step?: number;
    min?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center">
        <button
          type="button"
          onClick={() => handleDecrement(name)}
          className="p-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleInputChange}
          min={min}
          step={step}
          className="mx-2 block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
        />
        <button
          type="button"
          onClick={() => handleIncrement(name)}
          className="p-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Building2 className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Estimations Immobilières</h1>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type de bien</label>
                  <select
                    name="typeBien"
                    value={formData.typeBien}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                  </select>
                </div>

                <NumberInput label="Surface (m²)" name="surface" value={formData.surface} />
                <NumberInput label="Nombre de pièces" name="nbPieces" value={formData.nbPieces} />
                <NumberInput label="Nombre de chambres" name="nbChambres" value={formData.nbChambres} />

                <div>
                  <label className="block text-sm font-medium text-gray-700">Département</label>
                  <select
                    name="departement"
                    value={formData.departement}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={formData.prixPersonnalise}
                  >
                    {departements.map(dept => (
                      <option key={dept.code} value={dept.code}>
                        {dept.code} - {dept.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    name="prixPersonnalise"
                    checked={formData.prixPersonnalise}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Spécifier le prix au m² manuellement
                  </label>
                </div>

                {formData.prixPersonnalise && (
                  <NumberInput 
                    label="Prix au m² (€)" 
                    name="prixAuM2" 
                    value={formData.prixAuM2} 
                    step={100}
                    min={1000}
                  />
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {[
                    { name: 'terrasse', label: 'Terrasse' },
                    { name: 'garage', label: 'Garage' },
                    { name: 'jardin', label: 'Jardin' },
                    { name: 'piscine', label: 'Piscine' },
                    { name: 'parking', label: 'Parking' },
                    { name: 'ascenseur', label: 'Ascenseur' },
                    { name: 'box', label: 'Box' },
                    { name: 'balcon', label: 'Balcon' },
                  ].map(({ name, label }) => (
                    <div key={name} className="flex items-center">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name as keyof EstimationForm] as boolean}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={calculateEstimation}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Estimer le bien
              </button>
            </div>
          </div>

          {estimation && (
            <div className="bg-white rounded-lg shadow-xl p-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-gray-800">
                <Euro className="w-6 h-6 text-green-600" />
                <span>Estimation : {estimation.toLocaleString()} €</span>
              </div>
              <p className="mt-2 text-gray-600">
                Cette estimation est donnée à titre indicatif et peut varier selon les conditions du marché.
              </p>
              {!formData.prixPersonnalise && (
                <p className="mt-1 text-sm text-gray-500">
                  Basé sur un prix moyen de {
                    prixMoyens[formData.departement] 
                      ? prixMoyens[formData.departement][formData.typeBien].toLocaleString() 
                      : prixParDefaut[formData.typeBien].toLocaleString()
                  } €/m² pour {formData.typeBien === 'appartement' ? 'un appartement' : 'une maison'} dans le département {formData.departement}.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;