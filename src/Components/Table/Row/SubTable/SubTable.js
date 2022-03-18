import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./SubTable.module.css";

export const SubTable = ({ isDetailsOpen, CharCode }) => {
  const subTable = useRef()
  useEffect(()=> {
    if (!isDetailsOpen) {
      subTable.current.style.opacity = 0;
    } else {
      subTable.current.style.opacity = 1;
    }
  }, [isDetailsOpen])

  const pricesChanges = useSelector((state) => state.Rates.pricesChanges);
  let rates = [];
  
  for (let i = 0; i < pricesChanges.length; i++) {
    for (let key in pricesChanges[i].prices) {
      if (key == CharCode) {
        rates.push({ date: pricesChanges[i].date, value: pricesChanges[i].prices[key].Value });
      } else if (key == "ERROR") {
        rates.push({ date: pricesChanges[i].date, value: "Данных нет" })
      }
    }
  }

  return (
    <table ref={subTable} className={style.subTable}>
      <tbody className={style.subTable__body}>

        {rates.map(e => {
          return <SubRow price={e} />
        })}


      </tbody>
    </table>
  )
};

const SubRow = ({ price }) => {
  return (
    <tr className={style.subTable__row}>
      <td className={style.subTable__item}>{price.date}</td>
      <td className={style.subTable__item}>{price.value}</td>
    </tr>
  )
}
