var sum_to_n_a = function(n) {
    // iteration method
    let result = 0;
    for (let i = 1; i <= n ; i++) {
        result += i;
    }

    return result;
};

var sum_to_n_b = function(n) {
    // recursive method
    if (n === 0) {
        return 0;
    } else {
        return sum_to_n_b(n - 1) + n;
    }
};

var sum_to_n_c = function(n) {
    // using accumulator
    let nums = [];
    for (let i = 1; i <= n; i++) {
        nums.push(i);
    }
    return nums.reduce((acc, current) => {return acc + current}, 0);
};