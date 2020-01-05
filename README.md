Simply put your history document as `sample.pdf` here then,

```
➜  jenius-history-parser git:(master) ✗ node index.js | head -n 20
{
  date: 2020-01-04T17:00:00.000Z,
  time: '18:21',
  entityName: 'FULAN BIN FULAN',
  entityDetail: 'BCA 12345678',
  transactionNumber: '202001050001@DCB330851',
  transactionType: 'Outgoing',
  mutationType: 'credit',
  amount: '80,000'
}
{
  date: 2019-11-25T17:00:00.000Z,
  time: '12:56',
  entityName: 'FULANI BINTI FULANI',
  entityDetail: 'BANK CIMB NIAGA',
  transactionNumber: '201911260001@@AT82530',
  transactionType: 'Incoming',
  mutationType: 'debit',
  amount: '19,000,000'
}
```
