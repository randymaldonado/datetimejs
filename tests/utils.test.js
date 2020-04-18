const datetime = require('../datetime');
const utils = require('../utils');

// Jan 1st 2010, 00:00:00::000 UTC
// Unix Timestamp (in seconds): 1262304000
// We multiply by 1000 to bring the unix timestamp into milliseconds
test('Datetime => Unix test', () => {
  let dt = new datetime.Datetime(2010, 1, 1);
  expect(dt.unix).toEqual(1262304000 * 1000)
})


test('Unix => Datetime test', () => {
  let dt = new datetime.Datetime(2010, 1, 1);
  let testDt = utils.convertUnixToDatetime(1262304000 * 1000);
  expect(testDt).toEqual(dt)
})
