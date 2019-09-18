import request from '@/utils/request';
export async function getArticleList(params) {
  return request('/server/article_list', {
    method: 'POST',
    body: params,
  });
}
export async function releaseArticle(params) {
  // console.log('request')
  return request('/server/add_article', {
    method: 'POST',
    body: params,
  });
}

export async function showArticle(params) {
  // console.log('request')
  return request('/server/detail', {
    method: 'POST',
    body: params,
  });
}
