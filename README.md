# Made personalWolke booking less painful

With cypress you can book your entire month in under few minutes.


https://user-images.githubusercontent.com/395555/118042743-bd64a500-b374-11eb-93b5-252155e90b44.mp4



## preparation
```bash
nvm use
npm i
```
copy your personalWolke user/password to the `.env` file base on `.env.example`

you need to add all your desired booking to the
`./cypress/fixtures/timecorrection.js`

**Important**
- don't forget the double array (it is needed because script support multiple time range)
- absent type will be Home Office always

simple format:
```js
{
  day:6,
  month:5,
  time: [['09:00', '17:30']],
  description:'Area demo, meetings'
}
```

with multiple timerange
```js
{
  day:7,
  month:5,
  time: [['09:00', '12:00'], ['13:30', '17:30']],
  description:'LIF - personalWolke automation'
}
```

## Booking

```bash
nvm use
npm run booking
```

## Debug/more fun
If you wanna see how cypress made your time correction you can run the electron app

``` bash
nvm use
npm run debug
```
