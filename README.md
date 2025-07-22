# Bankist
A Demo Bank Website Application on JavaScript

# For Live Demo 

# Features
you can transfer money from one account to another and you will find the transition in both with its time 
you can request a loan and it will arrive to your account if it is valid after the bank review it 
(the bank only grants a loan if there is at least one deposite with at least 10% of the requested loan amount)
sum of all deposites and withdrawals and sum of interests will be calculated and also the total balance 
all the money and dates will be showed with the language of the account 


the username of each account is the first letters of the owner's name for ex : Jonas Schmedtmann -> js 

# The initial data of the accounts 
account1 : {
  owner: 'Jonas Schmedtmann'
  interestRate: 1.2%
  pin: 1111
  movements: [
    { value: 200, date: '2024-11-18' },
    { value: 455.23, date: '2024-12-23' },
    { value: -306.5, date: '2025-01-28' },
    { value: 25000, date: '2025-04-01' },
    { value: -642.21, date: '2025-06-08' },
    { value: -133.9, date: '2025-07-18' },
    { value: 79.97, date: '2025-07-20' },
    { value: 1300, date: '2025-07-21' },
  ],
  currency: 'USD'
  locale: 'en-US'
}
account2 : {
  owner: 'Jessica Davis'
  interestRate: 1.5%
  pin: 2222
  movements: [
    { value: 5000, date: '2024-11-01' },
    { value: 3400, date: '2024-11-30' },
    { value: -150, date: '2024-12-25' },
    { value: -790, date: '2025-03-25' },
    { value: -3210, date: '2025-05-05' },
    { value: -1000, date: '2025-06-10' },
    { value: 8500, date: '2025-07-18' },
    { value: -30, date: '2025-07-20' },
  ]
  currency: 'EUR'
  locale: 'de-DE'
}
const account3 : {
  owner: 'Mostafa Mohammed'
  interestRate: 1.4%
  pin: 3333
  movements: [
    { value: 3000, date: '2024-11-01' },
    { value: 5400, date: '2024-11-30' },
    { value: -450, date: '2024-12-25' },
    { value: -390, date: '2025-03-25' },
    { value: -3210, date: '2025-05-05' },
    { value: -2000, date: '2025-06-10' },
    { value: 7500, date: '2025-07-18' },
    { value: -300, date: '2025-07-20' },
  ]
  currency: 'EGP'
  locale: 'ar-EG'
}

# ----------------------
The website idea is from Jonas Schmedtmann i just did it as him and added somethings like a practice for me 
