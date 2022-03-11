var getindex,totalindex,gettotal,total=0;

ranking = function (input, index) {
    getindex = parseInt(index) * 5;
    totalindex = parseInt(getindex) * 10;
    gettotal = parseFloat(input / totalindex).toFixed(2);
    total= (gettotal*100).toFixed(0);
    return total;
};

module.exports = ranking;
