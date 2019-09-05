import request from '@/utils/request';
export async function uploadFile(params) {
  return request('/server/upload', {
    method: 'POST',
    body: params,
  });
}
