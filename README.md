# Bankist
A Demo Bank Website Application on JavaScript

# For Live Demo 
bankist-mostafatk.netlify.app <br>
OR <br>
https://mostafamtk.github.io/Bankist/

# Features
you can transfer money from one account to another and you will find the transition in both with its time <br/>
you can request a loan and it will arrive to your account if it is valid after the bank review it <br/>
(the bank only grants a loan if there is at least one deposite with at least 10% of the requested loan amount) <br/>
sum of all deposites and withdrawals and sum of interests will be calculated and also the total balance  <br/>
all the money and dates will be showed with the language of the account <br/>


**the username of each account is the first letters of the owner's name for ex : Jonas Schmedtmann -> js**

# The initial data of the accounts 
account1 : { <br/>
  owner: 'Jonas Schmedtmann' <br/>
  interestRate: 1.2% <br/>
  **pin: 1111**<br/>
  movements: <br/>
    { value: 200, date: '2024-11-18' }, <br/>
    { value: 455.23, date: '2024-12-23' }, <br/>
    { value: -306.5, date: '2025-01-28' }, <br/>
    { value: 25000, date: '2025-04-01' }, <br/>
    { value: -642.21, date: '2025-06-08' }, <br/>
    { value: -133.9, date: '2025-07-18' }, <br/>
    { value: 79.97, date: '2025-07-20' }, <br/>
    { value: 1300, date: '2025-07-21' }, <br/>
    currency: 'USD' <br/>
    locale: 'en-US' <br/>
} <br/>
account2 : { <br/>
  owner: 'Jessica Davis' <br/>
  interestRate: 1.5% <br/>
  **pin: 2222** <br/>
  movements: <br/>
    { value: 5000, date: '2024-11-01' }, <br/>
    { value: 3400, date: '2024-11-30' }, <br/>
    { value: -150, date: '2024-12-25' }, <br/>
    { value: -790, date: '2025-03-25' }, <br/>
    { value: -3210, date: '2025-05-05' }, <br/>
    { value: -1000, date: '2025-06-10' }, <br/>
    { value: 8500, date: '2025-07-18' }, <br/>
    { value: -30, date: '2025-07-20' }, <br/>
  currency: 'EUR' <br/>
  locale: 'de-DE' <br/>
} <br/>
const account3 : { <br/>
  owner: 'Mostafa Mohammed' <br/>
  interestRate: 1.4% <br/>
  **pin: 3333** <br/>
  movements: <br/>
    { value: 3000, date: '2024-11-01' }, <br/>
    { value: 5400, date: '2024-11-30' }, <br/>
    { value: -450, date: '2024-12-25' }, <br/>
    { value: -390, date: '2025-03-25' }, <br/>
    { value: -3210, date: '2025-05-05' }, <br/>
    { value: -2000, date: '2025-06-10' }, <br/>
    { value: 7500, date: '2025-07-18' }, <br/>
    { value: -300, date: '2025-07-20' }, <br/>
  currency: 'EGP' <br/>
  locale: 'ar-EG' <br/>
}

# ----------------------
The website idea is from Jonas Schmedtmann i just did it as him and added somethings like a practice for me 
