import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryTest() {
  return request('/server/article_list');
}
export async function userRegister(params) {
  return request('/server/add_user', {
    method: 'POST',
    body: params
  });
}
export async function userLogin(params) {
  return request('/server/login', {
    method: 'POST',
    body: params
  });
}