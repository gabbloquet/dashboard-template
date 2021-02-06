import {handleJSONResponse} from "../../utils/calls";
import {parseDate} from "../../utils/date";

/**
 * Informations sur le stock
 * @returns {Promise<string>}
 */
export function getStockData() {
	return fetch("http://localhost:8887/stock/daily/")
		.then(handleJSONResponse)
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				data[i].date = parseDate(data[i].date)
			}
			return data;
		});
}