const utils = require('./utils');

const now = () => {
  const currentDatetime = Date.now()
  return new Datetime().fromUnix(currentDatetime)
}

class Datetime {
  constructor(year=1970, month=1, day=1, hour=0,
              minute=0, second=0, millisecond=0,
              unix=0, tzinfo='UTC') {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
    this.tzinfo = tzinfo;
    this.unix = utils.convertDatetimeToUnix(this)
  }

  add(timedelta) {
    if (timedelta.constructor.name !== 'Timedelta') {
      throw "Object must be a Timedelta object"
    }

    const combinedTime = this.unix + utils.convertTimedeltaToUnix(timedelta)
    const updated = utils.convertUnixToDatetime(combinedTime)
    this.year = updated.year;
    this.month = updated.month;
    this.day = updated.day;
    this.hour = updated.hour;
    this.minute = updated.minute;
    this.second = updated.second;
    this.millisecond = updated.millisecond;
    this.unix = updated.unix;
  }

  subtract(date) {
    if (date.constructor.name === 'Datetime') {
      // do datetime case
      const diff = utils.convertUnixToTimedelta(Math.abs(this.unix - date.unix));
      return new Timedelta(diff.days, diff.hours, diff.minutes, diff.seconds, diff.milliseconds);
    } else if (date.constructor.name === 'Timedelta') {
      // time delta case
      const diff = this.unix - utils.convertTimedeltaToUnix(date);
      const updated = utils.convertUnixToDatetime(diff)
      this.year = updated.year;
      this.month = updated.month;
      this.day = updated.day;
      this.hour = updated.hour;
      this.minute = updated.minute;
      this.second = updated.second;
      this.millisecond = updated.millisecond;
      this.unix = updated.unix;
    } else {
      throw "Object must be a Datetime or Timedelta object";
    }
  }
}


class Timedelta {
  constructor(days=0, hours=0, minutes=0, seconds=0, ms=0) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = ms;
  }
}


const fromUnix = (timestamp) => {
  const res = utils.convertUnixToDatetime(timestamp)
  return new Datetime(res.year, res.month, res.day, res.hour, res.minute,
                      res.second, res.millisecond)
}

module.exports.Datetime = Datetime;
module.exports.Timedelta = Timedelta
module.exports.fromUnix = fromUnix;
