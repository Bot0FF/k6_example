import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario_name: {
      executor: 'per-vu-iterations',
      vus: 4,              // 4 VUs
      iterations: 10,       // каждый делает ровно 10 итераций
      maxDuration: '10s',    // максимум 10 сек (невыполненные операции отменяются)
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