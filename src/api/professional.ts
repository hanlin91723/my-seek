import request from './request';
//获取列表数据
export function getList(data: any) {
  return request.post('/searchAuthor', data);
}
//获取基本信息
export function getBasicInfo(id: string) {
  return request.post('/getAuthorInfo', id);
}
//获取数据概览数据
export function getOverview(id: string) {
  return request.post('/dataOverview', id);
}
//获取作品详情数据
export function getWorkDetail(data: any) {
  return request.post('/authorWork', data);
}
//获取作品类型数据
export function getWorkType(data: any) {
  return request.post('/authorWorkType', data);
}
