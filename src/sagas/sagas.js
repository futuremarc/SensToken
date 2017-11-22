// import { takeEvery, fork, call, put } from 'redux-saga/effects';
// import request from 'superagent';
//
// function getTokenRate(location) {
// }
//
// function* callGetTokenRate({resolve, reject}) {
//   const result = yield call(getTokenRate, location);
//   console.log(result);
//
//   if (result.query.results){
//     yield put({ type: 'FETCH_WEATHER_DONE', result });
//     yield call(resolve);
//   }else{
//     yield call(reject, {location: 'No data for that location.'})
//   }
// }
//
// function* getWeatherSaga() {
//   yield takeEvery('FETCH_WEATHER', callGetWeather);
// }
//
// export default function* root() {
//   yield [
//     fork(getWeatherSaga),
//   ];
// }
