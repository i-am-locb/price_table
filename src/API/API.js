import * as axios from "axios";
import { initializeRates } from "../Redux/rates_reducer";

const instanceDaily = axios.create({
  baseURL: "https://www.cbr-xml-daily.ru/daily_json.js",
});
const instanceMonth = axios.create({
  baseURL: "https://www.cbr-xml-daily.ru/archive/2022/",
});

export const ratesAPI = {
  initializeRates() {
    return instanceDaily.get().then((response) => {
      return response.data;
    });
  },
  getMonthlyChanges(month, day) {
    return instanceMonth
      .get(month + `/` + day + `/daily_json.js`)
      .then((response) => {
        return response.data;
      });
  },
};
