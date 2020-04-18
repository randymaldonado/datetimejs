const datetime = require('../datetime');

test('creation of datetime object, year', () => {
  let dt = new datetime.Datetime(2010, 10, 1);
  expect(dt.year).toBe(2010)
});

test('creation of datetime object, month', () => {
  let dt = new datetime.Datetime(2010, 10, 1);
  expect(dt.month).toBe(10)
});


test('adding time to a datetime', () => {
  let dt = new datetime.Datetime(2010,10,1);
  let timedelta = new datetime.Timedelta(days=4);
  let resDt = new datetime.Datetime(2010, 10, 5);
  dt.add(timedelta)
  expect(dt).toEqual(resDt)
});

test('adding time type error', () => {
  let dt = new datetime.Datetime(2010,10,1);
  expect(() => { dt.add(1) }).toThrowError("Object must be a Timedelta object")
})

test('subtracting time from time to get a timedelta', () => {
  let dt = new datetime.Datetime(2010,10,1);
  let dt2 = new datetime.Datetime(2010,9,25,1,2,3,4);
  let timedelta = dt.subtract(dt2)
  expect(timedelta).toEqual(new datetime.Timedelta(5,22,57,56,996))
})

test('subtracting time from timedelta to get a datetime', () => {
  let dt = new datetime.Datetime(2010,10,1);
  let timedelta = new datetime.Timedelta(1,2,3);
  dt.subtract(timedelta);
  expect(dt).toEqual(new datetime.Datetime(2010, 9, 29, 21, 57))
})

test('subtracting time type error', () => {
  let dt = new datetime.Datetime(2010,10,1);
  expect(() => { dt.subtract(1) }).toThrowError("Object must be a Datetime or Timedelta object")
})

test('from unix', () => {
  let dt = datetime.fromUnix(1262304000 * 1000)
  let resDt = new datetime.Datetime(2010, 1, 1);
  expect(dt).toEqual(resDt)
})
