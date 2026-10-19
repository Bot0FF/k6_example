import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario_name: {
      executor: 'constant-arrival-rate',
      rate: 10,              // 10 итераций
      timeUnit: '1s',         // в секунду (итого 10 RPS)
      duration: '10m',
      preAllocatedVUs: 10,    // подготовить 10 VUs заранее
      maxVUs: 50,            // максимум 50 VUs, если сервер тормозит
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