import React, { useContext } from 'react';
import { RiPlantLine } from 'react-icons/ri';
import { FiCloudRain } from 'react-icons/fi';
import './Home.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import WeatherDashboard from '../components/WeatherDashboard';

const Home = () => {
  const {isuserlogin,userdetails} = useContext(AppContext)
  return (
    <div className="container">

      <section className="hero">
        <div className="hero-text">
          <h2>Welcome to <span style={{ color: 'blue' }}>Synergy</span>{isuserlogin && `, ${userdetails.name}`}</h2>
          <p>Empowering farmers with advanced technology</p>
        </div>
        <div className="butorweath">
          {isuserlogin?
          <WeatherDashboard/>
          :<Link to={'/login'}>Get Started</Link>
        }
        </div>
        <div className="hero-image">
          <img src="https://media.istockphoto.com/id/1029301814/photo/farmer-ploughing-field.jpg?s=612x612&w=0&k=20&c=DUfDbLJ_gpkdPJZu3Nu3_Y_wdB64MP1lAoNtus1ewXQ=" alt="Farmers" />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="icon">
            <RiPlantLine size={50} />
          </div>
          <h3>Crop Prediction</h3>
          <p>Predict the best crops based on location, weather, and soil conditions.</p>
        </div>
        <div className="feature">
          <div className="icon">
            <FiCloudRain size={50} />
          </div>
          <h3>Weather Alerts</h3>
          <p>Get real-time weather alerts to stay prepared for rain or extreme weather conditions.</p>
        </div>
        <div className="feature">
          <div className="icon">
            <FiCloudRain size={50} />
          </div>
          <h3>Weather Alerts</h3>
          <p>Get real-time weather alerts to stay prepared for rain or extreme weather conditions.</p>
        </div>
        {/* Add more feature cards here */}
      </section>

      <section className="about">
        <div className="about-image">
          <img src="https://media.istockphoto.com/id/1029301814/photo/farmer-ploughing-field.jpg?s=612x612&w=0&k=20&c=DUfDbLJ_gpkdPJZu3Nu3_Y_wdB64MP1lAoNtus1ewXQ=" alt="Farm" />
        </div>
        <div className="about-text">
          <h2>About Farmers' App</h2>
          <p>
            Farmers' App is a revolutionary platform that provides farmers with essential tools and
            information to optimize their agricultural practices. From crop prediction to disease
            detection and market trends, we empower farmers to make data-driven decisions for higher
            yields and profitability.
          </p>
        </div>
      </section>

      <footer>
        <div className="social-icons">
          <a href="/">
            <RiPlantLine size={30} />
          </a>
          <a href="/">
            <RiPlantLine size={30} />
          </a>
          <a href="/">
            <RiPlantLine size={30} />
          </a>
        </div>
        <p>&copy; 2023 Farmers' App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
