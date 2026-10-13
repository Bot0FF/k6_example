import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    data_import: {
      executor: 'shared-iterations',
      vus: 4,              // 10 VU работают параллельно
      iterations: 100,     // всего 1000 итераций
      maxDuration: '10s',    // максимум 5 минут (невыполненные операции отменяются)
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