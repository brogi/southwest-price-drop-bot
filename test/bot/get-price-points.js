const test = require('tape');

const { getFlights } = require('../../lib/bot/get-price.js');

test('getFlights domestic points', async t => {
  const tomorrow = (new Date()).setDate((new Date()).getDate() + 1);
  const args = {
    from: 'SEA',
    to: 'CLE',
    departDate: tomorrow,
    isPointsBooking: true,
    passengerCount: 1
  };
  const flights = await getFlights(args);

  t.true(flights.outbound, 'flights.outbound');
  t.true(flights.outbound[0], 'flights.outbound[0]');
  if (flights.outbound[0]) {
    t.true(flights.outbound[0].number, 'flights.outbound[0].number');
    t.true(flights.outbound[0].stops, 'flights.outbound[0].stops');
    t.true(flights.outbound[0].price, 'flights.outbound[0].price');
  }
  t.end();
});

test('getFlights international points', async t => {
  const tomorrow = (new Date()).setDate((new Date()).getDate() + 1);
  const args = {
    from: 'DEN',
    to: 'CUN',
    departDate: tomorrow,
    isPointsBooking: true,
    passengerCount: 1
  };
  const flights = await getFlights(args);

  t.true(flights.outbound, 'flights.outbound');
  t.true(flights.outbound[0], 'flights.outbound[0]');
  if (flights.outbound[0]) {
    t.true(flights.outbound[0].number, 'flights.outbound[0].number');
    t.true(flights.outbound[0].stops, 'flights.outbound[0].stops');
    t.true(flights.outbound[0].price, 'flights.outbound[0].price');
  }
  t.end();
});

test('getFlights fake FROM airport points', async t => {
  const tomorrow = (new Date()).setDate((new Date()).getDate() + 1);
  const args = {
    from: 'FOO',
    to: 'CLE',
    departDate: tomorrow,
    isPointsBooking: true,
    passengerCount: 1
  };
  const flights = await getFlights(args);

  t.true(!Array.isArray(flights.outbound) || !flights.outbound.length, 'flights.outbound');
  t.end();
});

test('getFlights fake TO airport points', async t => {
  const tomorrow = (new Date()).setDate((new Date()).getDate() + 1);
  const args = {
    from: 'SEA',
    to: 'FOO',
    departDate: tomorrow,
    isPointsBooking: true
  };
  const flights = await getFlights(args);

  t.true(!Array.isArray(flights.outbound) || !flights.outbound.length, 'flights.outbound');
  t.end();
});

test('getFlights previous date points', async t => {
  const yesterday = (new Date()).setDate((new Date()).getDate() - 2);
  const args = {
    from: 'SEA',
    to: 'CLE',
    departDate: yesterday,
    isPointsBooking: true,
    passengerCount: 1
  };
  const flights = await getFlights(args);

  t.true(!Array.isArray(flights.outbound) || !flights.outbound.length, 'flights.outbound');
  t.end();
});
