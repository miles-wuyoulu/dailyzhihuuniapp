<template>
	<view class="stories" @click="choose">
		<view class="text">
			<text class="tit">{{story.title}}</text>
			<text class="auth">{{story.hint}}</text>
		</view>
		<image :src="story.images[0]" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		name: 'stories',
		props: ['story'],
		methods:{
			choose(){
				console.log('hello')
				uni.navigateTo({
					url:'../detail/detail'
				})
			}
		}
	}
</script>

<style lang="less">
	.stories {
		padding-left: 20rpx;
		padding-right: 40rpx;
		width: 100%;
		height: 260rpx;
		display: flex;
		align-items: center;

		.text {
			flex: 70%;
			height: 100%;
			padding-right: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.tit {
				font-size: 37rpx;
				font-weight: 700;
			}

			.auth {
				font-size: 27rpx;
				font-weight: 400;
				color: gray;
			}
		}

		image {
			flex: 30%;
			width: 100%;
			// height: 50rpx;
		}
	}
</style>
