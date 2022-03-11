var cost;

cost = function (price,quantity) {
    total = parseFloat(price * quantity).toFixed(2);
    return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports = cost;
