'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  interestRate: 1.2, // %
  pin: 1111,
  movements: [
    { value: 200, date: '2024-11-18T21:31:17.178Z' },
    { value: 455.23, date: '2024-12-23T07:42:02.383Z' },
    { value: -306.5, date: '2025-01-28T09:15:04.904Z' },
    { value: 25000, date: '2025-04-01T10:17:24.185Z' },
    { value: -642.21, date: '2025-06-08T14:11:59.604Z' },
    { value: -133.9, date: '2025-07-18T17:01:17.194Z' },
    { value: 79.97, date: '2025-07-20T23:36:17.929Z' },
    { value: 1300, date: '2025-07-21T10:51:36.790Z' },
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  interestRate: 1.5,
  pin: 2222,
  movements: [
    { value: 5000, date: '2024-11-01T13:15:33.035Z' },
    { value: 3400, date: '2024-11-30T09:48:16.867Z' },
    { value: -150, date: '2024-12-25T06:04:23.907Z' },
    { value: -790, date: '2025-03-25T14:18:46.235Z' },
    { value: -3210, date: '2025-05-05T16:33:06.386Z' },
    { value: -1000, date: '2025-06-10T14:43:26.374Z' },
    { value: 8500, date: '2025-07-18T18:49:59.371Z' },
    { value: -30, date: '2025-07-20T12:01:20.894Z' },
  ],
  currency: 'EUR',
  locale: 'de-DE',
};
const account3 = {
  owner: 'Mostafa Mohammed',
  interestRate: 1.4,
  pin: 3333,
  movements: [
    { value: 3000, date: '2024-11-01T13:15:33.035Z' },
    { value: 5400, date: '2024-11-30T09:48:16.867Z' },
    { value: -450, date: '2024-12-25T06:04:23.907Z' },
    { value: -390, date: '2025-03-25T14:18:46.235Z' },
    { value: -3210, date: '2025-05-05T16:33:06.386Z' },
    { value: -2000, date: '2025-06-10T14:43:26.374Z' },
    { value: 7500, date: '2025-07-18T18:49:59.371Z' },
    { value: -300, date: '2025-07-20T12:01:20.894Z' },
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};

const accounts = [account1, account2, account3];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const error = document.querySelector('.error');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(date, new Date());
  if (daysPassed === 0) return locale.slice(0, 2) === 'ar' ? 'اليوم' : 'Today';
  if (daysPassed === 1)
    return locale.slice(0, 2) === 'ar' ? 'الأمس' : 'Yesterday';
  if (daysPassed <= 7)
    return locale.slice(0, 2) === 'ar'
      ? `قبل ${Intl.NumberFormat(locale).format(daysPassed)} أيام`
      : `${daysPassed} Days Ago`;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  );
};

const displayMovments = function (acc, sorted = false) {
  containerMovements.innerHTML = '';
  const movs = sorted
    ? acc.movements.toSorted((a, b) => a.value - b.value)
    : acc.movements;
  movs.forEach(function ({ value: mov, date: movDate }, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const displayDate = formatMovementDate(
      new Date(movDate),
      currentAccount.locale
    );
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCur(
            mov,
            acc.locale,
            acc.currency
          )}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, { value: mov }) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements
    .filter(mov => mov.value >= 0)
    .reduce((acc, { value: deposite }) => acc + deposite, 0);
  const sumOut = acc.movements
    .filter(mov => mov.value < 0)
    .reduce((acc, { value: withdrawal }) => acc - withdrawal, 0); // acc-withdrawal because i want it to be +ve
  const interestRate = acc.interestRate / 100;
  const sumInterest = acc.movements
    .filter(mov => mov.value >= 0)
    .map(deposite => deposite.value * interestRate)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0); // this bank calculate the interests for each deposite and takes it if it is >= 1
  labelSumIn.textContent = `${formatCur(sumIn, acc.locale, acc.currency)}`;
  labelSumOut.textContent = `${formatCur(sumOut, acc.locale, acc.currency)}`;
  labelSumInterest.textContent = `${formatCur(
    sumInterest,
    acc.locale,
    acc.currency
  )}`;
};

const updateUI = function (acc) {
  displayMovments(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

let currentAccount, timer;
let sorted = false;

const startLogoutTimer = function () {
  const tick = function () {
    const min = `${Math.floor(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      currentAccount = null;
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 600;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    updateUI(currentAccount);
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      year: 'numeric',
      day: '2-digit',
      weekday: 'short',
    }).format(new Date());
    containerApp.style.opacity = 1;
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = '🔴 Username or Pin is incorrect';
    setTimeout(() => {
      labelWelcome.textContent = 'Log in to get started';
    }, 2000);
  }
  sorted = false;
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = '';
  inputTransferTo.blur();
  if (
    recieverAccount &&
    recieverAccount.username !== currentAccount.username &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push({
      value: -amount,
      date: new Date().toISOString(),
    });
    recieverAccount.movements.push({
      value: amount,
      date: new Date().toISOString(),
    });
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogoutTimer();
    sorted = false;
  } else {
    error.textContent = 'Please Enter A Correct Username And Amount';
    error.classList.add('show-error');
    setTimeout(function () {
      error.textContent = '';
      error.classList.remove('show-error');
    }, 2000);
  }
});

//the bank only grants a loan if there is at least one deposite with at least 10% of the requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov.value >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push({
        value: amount,
        date: new Date().toISOString(),
      });
      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogoutTimer();
      sorted = false;
    }, 3000);
  } else {
    error.textContent = 'Please Enter A Valid Amount';
    error.classList.add('show-error');
    setTimeout(function () {
      error.textContent = '';
      error.classList.remove('show-error');
    }, 2000);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username), // or accounts.indexOf(currentAccount)
      1
    );
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    console.log(accounts);
    sorted = false;
  } else {
    error.textContent = 'Please Enter A Correct Username And Pin';
    error.classList.add('show-error');
    setTimeout(function () {
      error.textContent = '';
      error.classList.remove('show-error');
    }, 2000);
  }
  inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.value = '';
  inputCloseUsername.blur();
});

btnSort.addEventListener('click', function (e) {
  sorted = !sorted;
  displayMovments(currentAccount, sorted);
  clearInterval(timer);
  timer = startLogoutTimer();
});
