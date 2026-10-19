import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario_name: {
      executor: 'ramping-arrival-rate',
      startRate: 10,          // старт с 10 RPS
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { duration: '30s', target: 500 },  // резкий скачок до 500 RPS
        { duration: '1m', target: 500 },   // удержание пика
        { duration: '30s', target: 10 },   // спад
      ],
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