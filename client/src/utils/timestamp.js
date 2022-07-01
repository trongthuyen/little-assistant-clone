export const getDates = (month, year) => {
    const date = new Date()
    const firstday = new Date(year, month - 1, 1, 0, 0, 1, -420)

    let dates = []
    let i = 0
    let str = ''
    switch (date.getDay()) {
        case 0:
            str = 'Sun'
            break
        case 1:
            str = 'Mon'
            break
        case 2:
            str = 'Tue'
            break
        case 3:
            str = 'Wed'
            break
        case 4:
            str = 'Thu'
            break
        case 5:
            str = 'Fri'
            break
        case 6:
            str = 'Sat'
            break
        default: break
    }
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        while (i++ < firstday.getDay()) dates.push(null)
        i = 0
        while (i < 31) dates.push(++i)
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        while (i++ < firstday.getDay()) dates.push(null)
        i = 0
        while (i < 30) dates.push(++i)
    } else if (month === 2) {
        while (i++ < firstday.getDay()) dates.push(null)
        i = 0
        if (year.isLeap) {
            while (i < 29) dates.push(++i)
        } else {
            while (i < 28) dates.push(++i)
        }
    }

    return {
        dates,
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        date: month !== date.getMonth() + 1 ? null : date.getDate(),
        today: str
    }
}

export const getMonth = (month = -1) => {
    let m
    let str = ''
    if (month < 1 || month > 12) {
        m = new Date().getMonth() + 1
    } else {
        m = month
    }
    switch (m) {
        case 1:
            str = 'Jan'
            break
        case 2:
            str = 'Feb'
            break
        case 3:
            str = 'Mar'
            break
        case 4:
            str = 'Apr'
            break
        case 5:
            str = 'May'
            break
        case 6:
            str = 'Jun'
            break
        case 7:
            str = 'Jul'
            break
        case 8:
            str = 'Aug'
            break
        case 9:
            str = 'Sep'
            break
        case 10:
            str = 'Oct'
            break
        case 11:
            str = 'Nov'
            break
        case 12:
            str = 'Dec'
            break
        default: break
    }
    return {
        month: m,
        eng: str
    }
}

export const getNumOfDate = (month, isLeap) => {
    if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) return 31
    else if (month === 4 || month === 6 || month === 9 || month === 11) return 30
    else if(month === 2) return isLeap ? 29 : 28
    else return 1
}

export const getYear = (year = -1) => {
    const y = year === -1 ? new Date().getFullYear() : year
    return {
        year: y,
        isLeap: y % 4 === 0 ? true : y % 400 === 0 ? true : false
    }
}

export const getWeek = (target) => {
    let dayNr = (target.getDay() + 6) % 7;
    let firstSunday = target.valueOf();
    target.setDate(target.getDate() - dayNr + 3);
    target.setMonth(0, 1);
    if (target.getDay() !== 6) {
        target.setMonth(0, 1 + ((6 - target.getDay()) + 7) % 7);
    }
    return Math.ceil((firstSunday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

export const getDay = (d, date) => {
    d = d.trim()
    date = new Date(date);
    let day = date.getDay()
    let diff = null
    switch (d) {
        case 'Sunday':
            diff = date.getDate() - day + 0
            break
        case 'Monday':
            diff = date.getDate() - day + 1
            break
        case 'Tuesday':
            diff = date.getDate() - day + 2
            break
        case 'Wednesday':
            diff = date.getDate() - day + 3
            break
        case 'Thursday':
            diff = date.getDate() - day + 4
            break
        case 'Friday':
            diff = date.getDate() - day + 5
            break
        case 'Saturday':
            diff = date.getDate() - day + 6
            break
        default: break
    }
    return new Date(date.setDate(diff));
}

export const getMonday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getTuesday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -5 : 2); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getWednesday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -4 : 3); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getThursday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -3 : 4); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getFriday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -2 : 5); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getSaturday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -1 : 6); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getSunday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day; // adjust when day is sunday
    return new Date(d.setDate(diff));
}