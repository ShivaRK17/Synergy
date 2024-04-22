import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({children})=>{
    const [isuserlogin, setIsuserlogin] = useState(false);
    const [userdetails, setUserdetails] = useState({
        name: '',
        phoneNumber: '',
        age: '',
        landSize: '',
        location: '',
        gender: '',
        cropsCultivated:
          []
      })
      function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const [forecastdata, setForecastData] = useState(
        {
            "city": "",
            "country": "",
            "coordinates": {},
            "daily": [
                {
                    "condition": {
                        "description": "",
                        "icon_url": "",
                        "icon": ""
                    },
                    "temperature": {
                        "day": "",
                        "minimum": "",
                        "maximum": "",
                        "humidity": ""
                    },
                    "wind": {
                        "speed": ""
                    },
                    "time": ""
                }
            ]
        });
    const getUserDetails = async ()=>{
      if(localStorage.getItem('authToken')){
          try{
              const resp = await fetch(`${process.env.REACT_APP_SYNERGY_URI}/api/auth/getuser`,{
                  method:'POST',
                  headers:{
                      'Content-type':'application/json',
                      'auth-token':localStorage.getItem('authToken')
                  }
              })
              const json = await resp.json();
              setUserdetails({
                  name: json.name,
                  phoneNumber: json.phoneNumber,
                  age: getAge(json.dob),
                  landSize: json.landSize,
                  location: json.location,
                  gender: json.gender,
                  cropsCultivated:json.crops
                })
          }
          catch(err){
              console.log(err.message);
          }
      }
    }
    const fetchForecastData = async (city) => {
        city = city || "guduru"
        const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
        const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const res = await response.json();
            // console.log(res);
            setForecastData(res);
        } catch (error) {
            console.log("Error fetching forecast data:", error);
        }
    };
    useEffect(() => {
      getUserDetails();
        // eslint-disable-next-line
    }, [])
    

    return <AppContext.Provider value={{isuserlogin,setIsuserlogin,userdetails,setUserdetails,getUserDetails,forecastdata,setForecastData,fetchForecastData}}>
        {children}
    </AppContext.Provider>
}
export { AppContext, AppProvider }