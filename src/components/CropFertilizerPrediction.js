// CropFertilizerPrediction.js
import React, { useContext, useState } from 'react';
import './Predictions.css'
import { AppContext } from '../context/AppContext';
import loading from '../assets/loading.gif'
// import axios from 'axios';

const CropFertilizerPrediction = () => {
  const { userdetails, forecastdata } = useContext(AppContext);
  const [nValue, setNValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [kValue, setKValue] = useState('');
  const [moisture, setMoisture] = useState('');
  const [temperature, settemperature] = useState(forecastdata.daily[0].temperature.day);
  const [humidity, sethumidity] = useState(forecastdata.daily[0].temperature.humidity);
  const [soiltype, setSoiltype] = useState('');
  const [croptype, setcroptype] = useState('');
  const [fertilizerName, setFertilizerName] = useState('');
  const [loadnow, setLoadnow] = useState(false)


const resultData = ["10-26-26","14-35-15","17-17-17","20-20","28-28","DAP","Urea"]
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = {
      Temperature: temperature,
      Humidity: humidity,
      Moisture: moisture,
      Soil_Type: soiltype,
      Crop_Type: croptype,
      Nitrogen: nValue,
      Potassium: pValue,
      Phosphorous: kValue
    };
    setLoadnow(true);
    setFertilizerName(null)
    console.log(data);
    const response = await fetch(`${process.env.REACT_APP_FERTI_API}/predict`, {
      "method": "POST",
      "headers": {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*"
      },
      "body": JSON.stringify(data)
    });
    const jsondata = await response.json();
    console.log(jsondata);
    setLoadnow(false);
    //   setCropName(response.data.cropName);
    //   setFertilizerName(response.data.fertilizerName);
    setFertilizerName(resultData[jsondata.prediction[0]])
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="prediction-container">
    <h2>Fertilizer Prediction</h2>
    <form className="prediction-form" onSubmit={handleSubmit}>
      <label htmlFor="nValue">Nitrogen Value(N):</label>
      <input
        type="number"
        id="nValue"
        value={nValue}
        onChange={(e) => setNValue(e.target.value)}
        required
      />

      <label htmlFor="pValue">Phosphorus Value(P):</label>
      <input
        type="number"
        id="pValue"
        value={pValue}
        onChange={(e) => setPValue(e.target.value)}
        required
      />

      <label htmlFor="kValue">Potassium Value(K):</label>
      <input
        type="number"
        id="kValue"
        value={kValue}
        onChange={(e) => setKValue(e.target.value)}
        required
      />

      <label htmlFor="temperature">Temperature:</label>
      <input
        type="number"
        id="temperature"
        value={temperature}
        onChange={(e) => settemperature(e.target.value)}
        required
      />
      <label htmlFor="humidity">Humidity:</label>
      <input
        type="number"
        id="humidity"
        value={humidity}
        onChange={(e) => sethumidity(e.target.value)}
        required
      />
      <label htmlFor="moisture">Moisture:</label>
      <input
        type="number"
        id="moisture"
        value={moisture}
        onChange={(e) => setMoisture(e.target.value)}
        required
      />

      <label htmlFor="soiltype">Soil Type:</label>
      <select
        id="soiltype"
        value={soiltype}
        onChange={(e) => setSoiltype(e.target.value)}
        required
      >
        <option value="">Select Soil Type</option>
        <option value="0">Black Soil</option>
        <option value="1">Clayey</option>
        <option value="2">Loamy Soil</option>
        <option value="3">Red Soil</option>
        <option value="4">Sandy Soil</option>
      </select>

      <label htmlFor="croptype">{userdetails.cropsCultivated && <p>Crop: (Your crops: {userdetails.cropsCultivated.map((e, ind) => <>{e + ' '}</>)})</p>}</label>
      <select
        id="croptype"
        value={croptype}
        onChange={(e) => setcroptype(e.target.value)}
        required
      >
        <option value="">Select your Crop</option>
        <option value="0">Barley</option>
        <option value="1">Ground Nuts</option>
        <option value="2">Cotton</option>
        <option value="3">Maize</option>
        <option value="4">Millets</option>
        <option value="5">Oil seeds</option>
        <option value="6">Paddy</option>
        <option value="7">Pulses</option>
        <option value="8">Sugarcane</option>
        <option value="9">Tobacco</option>
        <option value="10">Wheat</option>
      </select>

      <button type="submit">Predict</button>
    </form>
    {loadnow && <img src={loading} alt="" />}
    { fertilizerName && <div className="result-container">
      <h3>Fertilizer Prediction Result:</h3>
      <p>{fertilizerName}</p>
    </div>}
  </div>
);
};

export default CropFertilizerPrediction;
