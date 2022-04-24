const BASE_URL = 'https://news-at.zhihu.com'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options,
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					title:'请求数据失败'
				})
				reject(err)
			}
		})
	})
}