import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario_name: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2s', target: 2 },   // разгон до 2 VUs за 2 сек
        { duration: '2s', target: 2 },   // удержание 2 сек
        { duration: '2s', target: 4 },  // ступенька до 4 VUs
        { duration: '2s', target: 4 },  // удержание 2 сек
        { duration: '2s', target: 0 },    // спад до 0 за 2 мин
      ]
    },
  },
};

export default function () {
  let res = http.get('http://localhost:8080/run');
  sleep(1);
  check(res, {
    'status 200': (r) => r.status === 200
  });
}