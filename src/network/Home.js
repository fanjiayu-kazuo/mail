import {
  request
} from './request.js'
/*
获取Home界面的滚动栏数据和分类的图片数据
*/
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
/*
获取商品类表数据
*/
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
