import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario_name: {
      executor: 'constant-vus',
      vus: 10,              // 10 одновременных пользователей
      duration: '10s'       // в течение 10 секунд
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