import request from './request';
//获取列表数据
export function getList(data: any) {
  return request.post('/searchDomain', data);
}
//获取领域项
export function getFieldList() {
  return request.post('/getDomain', 'c718eac1d5f164063cba5fb022329fc7');
}
