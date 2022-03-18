import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "./Row/Row.js";
import style from "./Table.module.css";
import { getTenDaysChanges, initializeRates, sortTable } from "../../Redux/rates_reducer";

export const Table = () => {
  const rates = useSelector((state) => state.Rates.rates);

  const dispatch = useDispatch();

  const calcTenDays = () => {
    let today = new Date();
    let prevMonth = today * 1 - 10 * 24 * 3600 * 1000;

    function getDates(d1, d2) {
      let oneDay = 24 * 3600 * 1000;
      for (var d = [], ms = d1 * 1, last = d2 * 1; ms > last; ms -= oneDay) {
        let month = new Date(ms).getMonth() + 1;
        let day = new Date(ms).getDate();
        d.push([month, day]);
      }
      return d;
    }
    let month = getDates(today, prevMonth);
    return month
  }

  useEffect(() => {
    dispatch(initializeRates());
    dispatch(getTenDaysChanges(calcTenDays()));
  }, []);

  return (
    <table className={style.table}>
      <caption className={style.table__title}>Таблица курсов валют</caption>
      <colgroup>
        <col
          className={style.table__column + " " + style.table__column_first}
        />
        <col
          className={style.table__column + " " + style.table__column_second}
        />
        <col
          className={style.table__column + " " + style.table__column_third}
        />
        <col
          className={style.table__column + " " + style.table__column_fourth}
        />
      </colgroup>
      <thead className={style.table__head}>
        <tr className={style.table__row}>
          <th className={style.table__item}>
            <p>Валюта</p>
            <div className={style.table_sortButtons}>
              <div className={style.table_sortButtonUp} onClick={() => dispatch(sortTable("name_up"))}></div>
              <div className={style.table_sortButtonDown} onClick={() => dispatch(sortTable("name_down"))}></div>
            </div>
          </th>
          <th className={style.table__item}>
            <p>Курс</p>
            <div className={style.table_sortButtons}>
              <div className={style.table_sortButtonUp} onClick={() => dispatch(sortTable("price_up"))}></div>
              <div className={style.table_sortButtonDown} onClick={() => dispatch(sortTable("price_down"))}></div>
            </div></th>
          <th className={style.table__item}>Изменение</th>
          <th className={style.table__item}>Прочее</th>
        </tr>
      </thead>
      <tbody className={style.table__body}>
        {rates.map((rate) => {
          return <Row key={rate.ID} rate={rate} />;
        })}
      </tbody>
    </table>

  );
};
