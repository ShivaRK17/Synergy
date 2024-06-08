// YieldPrediction.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import YieldResult from './YieldResult';

const YieldPrediction = () => {
  const { userdetails } = useContext(AppContext);
  const [location, setLocation] = useState(userdetails.location);
  const [area, setArea] = useState('');
  const [season, setSeason] = useState('');
  const [crop, setCrop] = useState('');
  const [production, setProduction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_YIELD_API, {
        location,
        area,
        season,
        crop,
      });
      setProduction(response.data.production);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Yield Prediction</h2>
      <form className="prediction-form" onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label htmlFor="area">Area (in acres):</label>
        <input
          type="number"
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <label htmlFor="season">Season:</label>
        {/* <input
          type="text"
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        /> */}
        <select name="season" id="season" value={season} required onChange={(e) => setSeason(e.target.value)}>
          <option value="">Select Season</option>
          <option value="0">Kharif</option>
          <option value="1">Whole Year</option>
          <option value="2">Autumn</option>
          <option value="3">Rabi</option>
          <option value="4">Summer</option>
          <option value="5">Winter</option>
        </select>

        <label htmlFor="crop">Crop:</label>
        <select
          type="text"
          id="crop"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          required
        >
          <option value="0">Crop_Arecanut</option>
          <option value="1">Crop_Other Kharif pulses</option>
          <option value="2">Crop_Rice</option>
          <option value="3">Crop_Banana</option>
          <option value="4">Crop_Cashewnut</option>
          <option value="5">Crop_Coconut </option>
          <option value="6">Crop_Dry ginger</option>
          <option value="7">Crop_Sugarcane</option>
          <option value="8">Crop_Sweet potato</option>
          <option value="9">Crop_Tapioca</option>
          <option value="10">Crop_Black pepper</option>
          <option value="11">Crop_Dry chillies</option>
          <option value="12">Crop_other oilseeds</option>
          <option value="13">Crop_Turmeric</option>
          <option value="14">Crop_Maize</option>
          <option value="15">Crop_Moong(Green Gram)</option>
          <option value="16">Crop_Urad</option>
          <option value="17">Crop_Arhar/Tur</option>
          <option value="18">Crop_Groundnut</option>
          <option value="19">Crop_Sunflower</option>
          <option value="20">Crop_Bajra</option>
          <option value="21">Crop_Castor seed</option>
          <option value="22">Crop_Cotton(lint)</option>
          <option value="23">Crop_Horse-gram</option>
          <option value="24">Crop_Jowar</option>
          <option value="25">Crop_Korra</option>
          <option value="26">Crop_Ragi</option>
          <option value="27">Crop_Tobacco</option>
          <option value="28">Crop_Gram</option>
          <option value="29">Crop_Wheat</option>
          <option value="30">Crop_Masoor</option>
          <option value="31">Crop_Sesamum</option>
          <option value="32">Crop_Linseed</option>
          <option value="33">Crop_Safflower</option>
          <option value="34">Crop_Onion</option>
          <option value="35">Crop_other misc. pulses</option>
          <option value="36">Crop_Samai</option>
          <option value="37">Crop_Small millets</option>
          <option value="38">Crop_Coriander</option>
          <option value="39">Crop_Potato</option>
          <option value="40">Crop_Other  Rabi pulses</option>
          <option value="41">Crop_Soyabean</option>
          <option value="42">Crop_Beans & Mutter(Vegetable)</option>
          <option value="43">Crop_Bhindi</option>
          <option value="44">Crop_Brinjal</option>
          <option value="45">Crop_Citrus Fruit</option>
          <option value="46">Crop_Cucumber</option>
          <option value="47">Crop_Grapes</option>
          <option value="48">Crop_Mango</option>
          <option value="49">Crop_Orange</option>
          <option value="50">Crop_other fibres</option>
          <option value="51">Crop_Other Fresh Fruits</option>
          <option value="52">Crop_Other Vegetables</option>
          <option value="53">Crop_Papaya</option>
          <option value="54">Crop_Pome Fruit</option>
          <option value="55">Crop_Tomato</option>
          <option value="56">Crop_Rapeseed &Mustard</option>
          <option value="57">Crop_Mesta</option>
          <option value="58">Crop_Cowpea(Lobia)</option>
          <option value="59">Crop_Lemon</option>
          <option value="60">Crop_Pome Granet</option>
          <option value="61">Crop_Sapota</option>
          <option value="62">Crop_Cabbage</option>
          <option value="63">Crop_Peas  (vegetable)</option>
          <option value="64">Crop_Niger seed</option>
          <option value="65">Crop_Bottle Gourd</option>
          <option value="66">Crop_Sannhamp</option>
          <option value="67">Crop_Varagu</option>
          <option value="68">Crop_Garlic</option>
          <option value="69">Crop_Ginger</option>
          <option value="70">Crop_Oilseeds total</option>
          <option value="71">Crop_Pulses total</option>
          <option value="72">Crop_Jute</option>
          <option value="73">Crop_Peas & beans (Pulses)</option>
          <option value="74">Crop_Blackgram</option>
          <option value="75">Crop_Paddy</option>
          <option value="76">Crop_Pineapple</option>
          <option value="77">Crop_Barley</option>
          <option value="78">Crop_Khesari</option>
          <option value="79">Crop_Guar seed</option>
          <option value="80">Crop_Moth</option>
          <option value="81">Crop_Other Cereals & Millets</option>
          <option value="82">Crop_Cond-spcs other</option>
          <option value="83">Crop_Turnip</option>
          <option value="84">Crop_Carrot</option>
          <option value="85">Crop_Redish</option>
          <option value="86">Crop_Arcanut (Processed)</option>
          <option value="87">Crop_Atcanut (Raw)</option>
          <option value="88">Crop_Cashewnut Processed</option>
          <option value="89">Crop_Cashewnut Raw</option>
          <option value="90">Crop_Cardamom</option>
          <option value="91">Crop_Rubber</option>
          <option value="92">Crop_Bitter Gourd</option>
          <option value="93">Crop_Drum Stick</option>
          <option value="94">Crop_Jack Fruit</option>
          <option value="95">Crop_Snak Guard</option>
          <option value="96">Crop_Pump Kin</option>
          <option value="97">Crop_Tea</option>
          <option value="98">Crop_Coffee</option>
          <option value="99">Crop_Cauliflower</option>
          <option value="100">Crop_Other Citrus Fruit</option>
          <option value="101">Crop_Water Melon</option>
          <option value="102">Crop_Total foodgrain</option>
          <option value="103">Crop_Kapas</option>
          <option value="104">Crop_Colocosia</option>
          <option value="105">Crop_Lentil</option>
          <option value="106">Crop_Bean</option>
          <option value="107">Crop_Jobster</option>
          <option value="108">Crop_Perilla</option>
          <option value="109">Crop_Rajmash Kholar</option>
          <option value="110">Crop_Ricebean (nagadal)</option>
          <option value="111">Crop_Ash Gourd</option>
          <option value="112">Crop_Beet Root</option>
          <option value="113">Crop_Lab-Lab</option>
          <option value="114">Crop_Ribed Guard</option>
          <option value="115">Crop_Yam</option>
          <option value="116">Crop_Apple</option>
          <option value="117">Crop_Peach</option>
          <option value="118">Crop_Pear</option>
          <option value="119">Crop_Plums</option>
          <option value="120">Crop_Litchi</option>
          <option value="121">Crop_Ber</option>
          <option value="122">Crop_Other Dry Fruit</option>
          <option value="123">Crop_Jute & mesta</option>
        </select>

        <button type="submit">Predict</button>
      </form>

      {production && <div className="result-container">
        <h3>Yield Prediction Result:</h3>
        <p>{production}</p>
      </div>}
    </div>
  );
};

export default YieldPrediction;
