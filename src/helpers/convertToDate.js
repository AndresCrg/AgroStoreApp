const convertToDate = (stringDate) => {
	let data = stringDate.split('-');
	return new Date(data[0], data[1], data[2]);
};

module.exports = {
	convertToDate
}
