const convertDatetimeToUnix = (dt) => {
  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }
  const datetimeString = `${dt.day} ${months[dt.month]} ${dt.year} ${dt.hour}:${dt.minute}:${dt.second} ${dt.tzinfo}`
  return Date.parse(datetimeString) + dt.millisecond
}

const convertUnixToDatetime = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = date.toJSON();
  const newDt = {
    year: parseInt(dateString.slice(0,4)),
    month: parseInt(dateString.slice(5,7)),
    day: parseInt(dateString.slice(8,10)),
    hour: parseInt(dateString.slice(11,13)),
    minute: parseInt(dateString.slice(14,16)),
    second: parseInt(dateString.slice(17,19)),
    millisecond: parseInt(dateString.slice(20,23)),
    tzinfo: 'UTC',
    unix: timestamp
  };
  return newDt
}

const convertTimedeltaToUnix = (timedelta) => {
  const days = timedelta.days * 24 * 60 * 60 * 1000
  const hours = timedelta.hours * 60 * 60 * 1000
  const minutes = timedelta.minutes * 60 * 1000
  const seconds = timedelta.seconds * 1000
  return days + hours + minutes + seconds + timedelta.milliseconds
}

const convertUnixToTimedelta = (unixDiff) => {
  const days = (unixDiff - (unixDiff % (24*60*60*1000))) / (24*60*60*1000);
  const remainderAfterDays = (unixDiff % (24*60*60*1000));
  const hours = (remainderAfterDays - (remainderAfterDays % (60*60*1000))) / (60*60 *1000);
  const remainderAfterHours = remainderAfterDays % (60*60*1000);
  const minutes = (remainderAfterHours - (remainderAfterHours % (60*1000))) / (60*1000);
  const remainderAfterMinutes = remainderAfterHours % (60*1000);
  const seconds = (remainderAfterMinutes - (remainderAfterMinutes % 1000)) / 1000;
  const milliseconds = remainderAfterMinutes % 1000
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}


module.exports.convertDatetimeToUnix = convertDatetimeToUnix;
module.exports.convertUnixToDatetime = convertUnixToDatetime;
module.exports.convertTimedeltaToUnix = convertTimedeltaToUnix;
module.exports.convertUnixToTimedelta = convertUnixToTimedelta;
