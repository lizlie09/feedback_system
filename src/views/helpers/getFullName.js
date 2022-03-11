var _ = require('lodash'),
        getFullName;

var string_ucwords_if_lower = function (str) {
return (str + '')
  .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase()
  })
}

getFullName = function (data) {
	if (!data)
		return "";
	var firstName = data.firstName ? data.firstName : "";
	var middleName = data.middleName ? data.middleName : "";
	var lastName = data.lastName ? data.lastName : "";

	var fullName = string_ucwords_if_lower((lastName + ", " + firstName + " " + middleName).toLowerCase());

	return fullName.replace(/\s+/g, "") === "," ? "" : fullName;
};

module.exports = getFullName;
