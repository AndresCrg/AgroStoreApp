const convertToDate = (stringDate) => {
	let data = stringDate.split('-');
	return new Date(data[0], data[1] - 1, data[2]);
};

const formatDate = () => {
	let currentTime = new Date();

	let month = currentTime.getMonth() + 2;

	let day = currentTime.getDate();

	let year = currentTime.getFullYear();

	return year + '-' + month + '-' + day;
};

module.exports = {
	convertToDate,
	formatDate,
};
