export function dateToString(d) {
    return d ? d.getFullYear() + "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) : null;
}

export function stringToDate(d) {
    return d ? new Date(new Date(d).getTime() + 1000 * 60 * 60 * 12) : null;
}

export function stringToDateTime(d) {
    return d ? new Date(d) : null;
}
