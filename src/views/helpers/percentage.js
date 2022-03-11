var getpercentage,gettotal,total=0;

percentage = function (input, index) {
    getpercentage = parseInt(index) * 5;
    gettotal = parseFloat(input / getpercentage).toFixed(2);
    total= (gettotal*100).toFixed(0);
    return total;
};

module.exports = percentage;
