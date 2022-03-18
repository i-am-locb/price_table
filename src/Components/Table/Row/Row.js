import { useRef, useState } from "react";
import style from "../Table.module.css";
import { SvgSelector } from "../../../Images/Icons/SvgSelector";
import { SubTable } from "./SubTable/SubTable";

//TODO Зарефакторить и разбить по компонентам (проблема с css :nth-child)
//TODO избранное в стейт и выводить вверху списка
//TODO данные за неделю и за месяц в виде таблицы и графика
//TODO tooltip на кнопке подробнее в открытом состоянии работает не правильно из-за transform rotate

export const Row = (rate) => {
  let rateChange =
    ((rate.rate.Value - rate.rate.Previous) / rate.rate.Previous) * 100;
  let dailyChange = rateChange.toFixed(2);
  let rateValue = rate.rate.Value.toFixed(2);

  // start of details
  //////////////////
  const [isDetailsOpen, toggleIsDetailsOpen] = useState(false);
  let details = useRef();
  const showDetails = () => {
    if (!isDetailsOpen) {
      details.current.style.height = "32em";
      // details.current.style.display = "block";
      toggleIsDetailsOpen(true);
    } else {
      details.current.style.height = 0;
      // details.current.style.display = "none";
      toggleIsDetailsOpen(false);
    }
  };
  //////////////////
  // end of details
  // start of tooltip
  //////////////////
  let valuteTooltip = useRef();
  let moreTooltip = useRef();
  let favoriteTooltip = useRef();

  const showTooltip = (ev, key) => {
    // console.log(key)
    let posX = ev.nativeEvent.offsetX + 10;
    let posY = ev.nativeEvent.offsetY - 30;

    switch (key) {
      case "valute":
        valuteTooltip.current.style.display = "block";
        valuteTooltip.current.style.left = posX + "px";
        valuteTooltip.current.style.top = posY + "px";
        break;
      case "more":
        moreTooltip.current.style.display = "block";
        moreTooltip.current.style.left = posX + "px";
        moreTooltip.current.style.top = posY + "px";
        break;
      case "favorite":
        favoriteTooltip.current.style.display = "block";
        favoriteTooltip.current.style.left = posX + "px";
        favoriteTooltip.current.style.top = posY + "px";
        break;
      default:
        break;
    }
  };

  const hideTooltip = (ev, key) => {
    switch (key) {
      case "valute":
        valuteTooltip.current.style.display = "none";
        break;
      case "more":
        moreTooltip.current.style.display = "none";
        break;
      case "favorite":
        favoriteTooltip.current.style.display = "none";
        break;
      default:
        break;
    }
  };
  //////////////////
  // end of tooltip
  // start of choose favorite
  //////////////////
  const [idFavorite, toggleIsFavorite] = useState(false);
  //////////////////
  // end of choose favorite

  return (
    <>
      <tr className={style.table__row}>
        <td
          onMouseMove={(ev) => showTooltip(ev, "valute")}
          onMouseLeave={(ev) => hideTooltip(ev, "valute")}
          className={style.table__item}
        >
          {rate.rate.CharCode}
          <span ref={valuteTooltip} className={style.table__tooltip}>
            {rate.rate.Name}
          </span>
        </td>
        <td className={style.table__item}>{rateValue} руб.</td>
        <td
          className={
            dailyChange > 0
              ? style.table__item + " " + style.table__item_green
              : style.table__item + " " + style.table__item_red
          }
        >
          {dailyChange}%
        </td>
        <td className={style.table__item}>
          <span
            onMouseMove={(ev) => showTooltip(ev, "more")}
            onMouseLeave={(ev) => hideTooltip(ev, "more")}
            onClick={() => showDetails()}
            className={
              !isDetailsOpen
                ? style.table__svgArrow
                : style.table__svgArrow + " " + style.table__svgArrow_up
            }
          >
            <span ref={moreTooltip} className={style.table__tooltip}>
              Подробнее
            </span>
            <SvgSelector svgId="arrow" />
          </span>
          <span
            onMouseMove={(ev) => showTooltip(ev, "favorite")}
            onMouseLeave={(ev) => hideTooltip(ev, "favorite")}
            onClick={
              !idFavorite
                ? () => toggleIsFavorite(true)
                : () => toggleIsFavorite(false)
            }
            className={
              !idFavorite
                ? style.table__svgFavorite
                : style.table__svgFavorite +
                  " " +
                  style.table__svgFavorite_favorite
            }
          >
            <span ref={favoriteTooltip} className={style.table__tooltip}>
              В избранное
            </span>
            <SvgSelector svgId="favorite" />
          </span>
        </td>
      </tr>
      <tr ref={details} className={style.table__row + " " + style.table__row_details}>
        <td colSpan={4}className={style.table__item}>
          <SubTable isDetailsOpen={isDetailsOpen} CharCode={rate.rate.CharCode} />
        </td>
      </tr>
    </>
  );
};
