function pow(base, exp = 2) {
    return base ** exp;
}

function square(base) {
    return pow(base);
}

function sqrt(base) {
    return pow(base, 0.5);
}

export {pow, sqrt, square};