/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import "./App.css";
import { ForecastDayType, Weather } from "./@types/types";

function App() {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const key = "5d33bb46f3f04f3e88f130706232806";

  const getWeatherHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchData = async () => {
      const respons = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${key} &q=${value}&days=5&aqi=no&alerts=no`
      );
      const data = await respons.json();
      setWeather(data);
    };
    fetchData();
    console.log(weather);
  };
  
  const getInformationHandler = (info:ForecastDayType) =>{
    console.log(info)
  }

  return (
    <Box>
      <h1
        style={{
          alignItems: "center",
          textAlign: "center",
          marginTop: "30px",
          fontSize: "50px",
          color: "white",
        }}
      >
        Check Weather
      </h1>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <form action="submit" onSubmit={(e) => getWeatherHandler(e)}>
          <input
            className="inputer"
            style={{ color: "white", padding: "20px" }}
            placeholder="Enter Place"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </Box>
      {value ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            flexDirection: "column",
          }}
        >
          <Box>
            <Paper
              sx={{
                padding: "15px",
                backgroundColor: "transparent",
                borderRadius: "12px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
              elevation={16}
            >
              <Typography sx={{ color: "white" }} variant="h3">
                {weather?.location.name}
              </Typography>
              <img src={weather?.current.condition.icon} alt="Enter Correct Place" />
              <Typography sx={{ color: "White" }} variant="h6">
                Current Temperature: {weather?.current.temp_c}
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ marginTop: "100px", display: "flex", gap: "30px" }}>
            {weather?.forecast.forecastday.map((eachDay) => {
              return (
                <Paper
                  key={eachDay.date}
                  elevation={16}
                  onClick={()=> getInformationHandler(eachDay)}
                  sx={{
                    padding: "15px",
                    backgroundColor: "transparent",
                    borderRadius: "12px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    cursor:"pointer"
                  }}
                >
                  <Typography sx={{ color: "white" }} variant="h6">
                    Date: {eachDay.date}
                  </Typography>
                  <img src={eachDay.day.condition.icon} alt="" />
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{color:"white"}} variant="body1">
                      MaxTemp: {eachDay.day.maxtemp_c}C | MinTemp:{" "}
                      {eachDay.day.mintemp_c}C
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default App;
