import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {

  try {
    const {cityName} = req.body;
    const weatherData = await WeatherService.getWeatherForCity(cityName)
    if (!weatherData) {
      return res.status ( 404 ).json({message: 'not found'})
    }
    const city = (cityName)
    await HistoryService.addCity(city)
    res.status(200).json (weatherData);
 } catch (error){
  console.error(error)
  res.status(500).json({message: 'error in retrieving data'})
 }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try { 
    const history = await HistoryService.getCities();
    res.status (200).json(history);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'error retrieving history'})
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
