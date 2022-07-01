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

export const isMatchPassword = (password, cfPassword) => {
    return password === cfPassword
}

export const isLink = link => {
    return link.includes('http', 0)
}