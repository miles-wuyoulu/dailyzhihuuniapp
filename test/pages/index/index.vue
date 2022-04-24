<template>
	<view class="app">
		<view class="top">
			<view class="top_left">
				<text>{{todaysDate.slice(6)}}</text>
				<text class="mouth">{{todaysDate.slice(4,5) === '0'?todaysDate.slice(5,6):todaysDate.slice(4,6)}} 月</text>
			</view>
			<view class="top_right">
				<text>To Be Continue~</text>
			</view>
		</view>

		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" 
			indicator-color='grey' indicator-active-color='#fff'>
				<swiper-item v-for="hNews in hotNews" :key="hNews.id">
					<image :src="hNews.image" mode=""></image>
					<view class="swiper-item-title">
						<text>{{hNews.title}}</text>
						<text class="author">{{hNews.hint}}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="content">
			<stories v-for="story in todaysNews" :key='story.id' :story='story'></stories>

			<view class="more" v-for="stories in moreNews" :key="stories.date">
				<view class="date">
					<text>{{stories.date.slice(4,5) === '0'?stories.date.slice(5,6):stories.date.slice(4,6)}} 月{{stories.date.slice(6)}} 日
					</text>
					<view class="hr"></view>
				</view>
				<stories v-for="story in stories.stories" :key='story.id' :story='story'></stories>
			</view>
		</view>

	</view>
</template>

<script>
	import stories from '../../components/stories/stories.vue'
	export default {
		data() {
			return {
				news: [],
				hotNews: [],
				todaysDate:'',
				todaysNews: [],
				moreNews: [],
				date: ''
			}
		},
		components: {
			stories
		},
		onLoad() {
			this.getResponse('/api/3/stories/latest').then((res) => {
				this.hotNews = this.news[0].top_stories
				this.todaysNews = this.news[0].stories
				this.todaysDate = this.news[0].date
			})
		},

		onReachBottom() {
			this.getResponse('/api/3/news/before/' + this.date)
			console.log('页面触底了')
		},
		methods: {
			async getResponse(url) {
				let res = await this.$myRequest(url)
				this.date = res.data.date
				this.news.push(res.data)
				if (this.news.length != 1) {
					this.moreNews.push(res.data)
				}
			}
		}
	}
</script>



<style lang="less">
	.app {
		.top {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			display: flex;

			.top_left {
				flex: 20%;
				display: flex;
				flex-direction: column;
				margin: 10rpx 0;
				justify-content: space-between;
				align-items: center;
				border-right: 1px solid grey;
				.mouth{
					font-size: 30rpx;
				}
			}

			.top_right {
				flex: 80%;
				padding-left: 40rpx;
				line-height: 100rpx;
			}
		}

		.banner {
			margin-top: 100rpx;

			swiper {
				width: 100%;
				height: 600rpx;

				swiper-item {
					image {
						width: 100%;
						height: 100%;
					}

					.swiper-item-title {
						position: absolute;
						bottom: 0;
						left: 0;
						padding-left: 30rpx;
						width: 100%;
						height: 200rpx;
						background: linear-gradient(to top, #000, transparent);
						color: #fff;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.author {
							font-size: 30rpx;
							padding-bottom: 65rpx;
						}
					}
				}
			}
		}

		.content {
			.more {
				.date {
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 100%;
					height: 50rpx;

					text {
						flex: 20%;
						text-align: center;
						color: grey;
						font-size: 30rpx;
					}

					.hr {
						flex: 80%;
						// margin-top: 25rpx;
						// height: 100%;
						border-top: 1px solid grey;
					}
				}
			}
		}

	}
</style>
