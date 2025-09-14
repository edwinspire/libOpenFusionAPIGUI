export const equalObjs = (value, new_value) => {
	let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
	let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;
	return new_value_str == currect_value_str;
};

export const jsonToHtmlString = (obj) => {
	// Convierte el objeto en JSON con identación (2 espacios)
	let jsonString = JSON.stringify(obj, null, 2);

	// Divide en líneas, convierte espacios a &nbsp; y luego vuelve a unir con <br>
	return jsonString
		.split('\n')
		.map((line) => line.replace(/ /g, '&nbsp;')) // espacios → &nbsp;
		.join('<br>'); // saltos → <br>
};

export const TimeOutChangeValue = (idTimeout, fn_handler, timeout = 600) => {
	clearTimeout(idTimeout);
	return setTimeout(() => {
		fn_handler();
	}, timeout);
};
