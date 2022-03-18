import { ratesAPI } from "../API/API";

const INITIALIZE_RATES = "INITIALIZE_RATES";
const ADD_PRICE = "ADD_PRICE";
const SORT_NAME_UP = "SORT_NAME_UP";
const SORT_NAME_DOWN = "SORT_NAME_DOWN";
const SORT_PRICE_UP = "SORT_PRICE_UP";
const SORT_PRICE_DOWN = "SORT_PRICE_DOWN";

const initialState = {
  rates: [],
  pricesChanges: []
};

const RatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_RATES:
      return {
        ...state,
        rates: [...action.rates],
      };
    case ADD_PRICE:
      // debugger
      return {
        ...state,
        pricesChanges: [...state.pricesChanges, action.price]
      }
    case SORT_NAME_UP:
      return {
        ...state,
        rates: [...state.rates.sort((prev, next) => {
          if (prev.Name < next.Name) return -1;
          if (prev.Name > next.Name) return 1;
          else return 0
        })]
      }
    case SORT_NAME_DOWN:
      return {
        ...state,
        rates: [...state.rates.sort((prev, next) => {
          if (prev.Name > next.Name) return -1;
          if (prev.Name < next.Name) return 1;
          else return 0
        })]
      }
    case SORT_PRICE_UP:
      return {
        ...state,
        rates: [...state.rates.sort((prev, next) => {
          if (prev.Value > next.Value) return -1;
          if (prev.Value < next.Value) return 1;
          else return 0
        })]
      }
    case SORT_PRICE_DOWN:
      return {
        ...state,
        rates: [...state.rates.sort((prev, next) => {
          if (prev.Value < next.Value) return -1;
          if (prev.Value > next.Value) return 1;
          else return 0
        })]
      }
    default: {
      return state;
    }
  }
};

const initializeRatesAC = (rates) => ({ type: INITIALIZE_RATES, rates });
const addPrice = (price) => ({ type: ADD_PRICE, price })

const sortNameUp = () => ({ type: SORT_NAME_UP })
const sortNameDown = () => ({ type: SORT_NAME_DOWN })
const sortPriceUp = () => ({ type: SORT_PRICE_UP })
const sortPriceDown = () => ({ type: SORT_PRICE_DOWN })

export const sortTable = (sortType) => (dispatch) => {
  switch (sortType) {
    case "name_up":
      dispatch(sortNameUp())
      break
    case "name_down":
      dispatch(sortNameDown())
      
      break
    case "price_up":
      dispatch(sortPriceUp())
      break
    case "price_down":
      dispatch(sortPriceDown())
      break
  }
}

export const initializeRates = () => (dispatch) => {
  ratesAPI.initializeRates().then((response) => {
    let rates = [];
    let ratesObj = response.Valute;
    for (let key in response.Valute) {
      rates.push(ratesObj[key]);
    }
    dispatch(initializeRatesAC(rates));
  });
};

export const getTenDaysChanges = (month) => (dispatch) => {

  for (let i = 0; i < 10; i++) {
    let resp
    let err = false
    setTimeout(() => {
      ratesAPI
        .getMonthlyChanges("0" + month[i][0], month[i][1])
        .then((response) => {
          dispatch(addPrice({ date: month[i][0] + "/" + month[i][1], prices: response.Valute }))
        })
        .catch(() =>
          dispatch(addPrice({ date: month[i][0] + "/" + month[i][1], prices: { ERROR: "Данных нет" } })))
    }, i * 500);
  }
};

export default RatesReducer;
