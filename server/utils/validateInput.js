export const validateEmail = email => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = password => {
    return password.length >= 6
}

export const validateDate = date => {
    return true
}


export const getWeek = (target) => {
    let dayNr = (target.getDay() + 6) % 7;
    let firstSunday = target.valueOf();
    target.setDate(target.getDate() - dayNr + 3);
    target.setMonth(0, 1);
    if (target.getDay() != 6) {
        target.setMonth(0, 1 + ((6 - target.getDay()) + 7) % 7);
    }
    return Math.ceil((firstSunday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}