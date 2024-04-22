import React, { useContext } from 'react';
import './Dashboard.css'
import schemes from '../components/schemes'
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const {userdetails} = useContext(AppContext)

  return (
    <>
    <div className="dashboard-container">
      <h1 className="dashboard-title">Farmer's Dashboard</h1>
      <div className="profile">
        <h2 className="profile-title">Profile Information</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {userdetails.name}</p>
          <p><strong>Phone Number:</strong> {userdetails.phoneNumber}</p>
          <p><strong>Age:</strong> {userdetails.age}</p>
          <p><strong>Land Size:</strong> {userdetails.landSize}</p>
          <p><strong>Location:</strong> {userdetails.location}</p>
          <p><strong>Gender:</strong> {userdetails.gender}</p>
          <strong>Crops Cultivated:</strong> <ul>{userdetails.cropsCultivated && userdetails.cropsCultivated.map((e,ind)=><li key={ind}>{e}</li>)}</ul>
        </div>
      </div>
        <div className="profile">
            <h2 className="profile-title">Latest Schemes For You</h2>
            <div className="schemeslist">
                {schemes.map(e => ({ e, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({e},ind)=>{
                   return  <div key={ind} className='schemecard'>
                    <h3>{e.title}</h3>
                    <p>Scheme Details : <a rel="noopener noreferrer" href={e.pdfurl}>Click Here</a></p>
                    <p>Website : <a rel="noopener noreferrer" href={e.url}>Click Here</a></p>
                   </div>
                })}
            </div>
        </div>
    </div>
    </>
  );
};

export default Dashboard;
