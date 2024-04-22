import React from 'react'
import { Link } from 'react-router-dom'
import './PredHome.css'
const PredHome = () => {
  return (
    <div className="home-container">
      <h1>Farmer's Prediction App</h1>
      <ul className="prediction-links">
        <li>
          <Link to="/crop-fertilizer-prediction">Fertilizer Prediction</Link>
        </li>
        <li>
          <Link to="/yield-prediction">Yield Prediction</Link>
        </li>
        <li>
          <Link to="/disease-prediction">Disease Prediction</Link>
        </li>
        <li>
          <Link to="/rainfall-prediction">Rainfall Prediction</Link>
        </li>
      </ul>
    </div>
  )
}

export default PredHome