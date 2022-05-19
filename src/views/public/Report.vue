<template>
	<div class="report">
		<div class="hover">
			<domestic></domestic>
			<city-report></city-report>
			<div class="china-hover">
				<china color="#f8f9fa" :zoom="1.4" :provinceRes="provinceRes"></china>
			</div>
			<div class="trend-menu">
				<div
					class="trend-item"
					:class="{ active: activeTrend == 'add' }"
					@click="activeTrend = 'add'"
				>
					本土新增确诊趋势
				</div>
				<div
					class="trend-item"
					:class="{ active: activeTrend !== 'add' }"
					@click="activeTrend = 'all'"
				>
					本土现有确诊趋势
				</div>
			</div>
			<div class="trend-hover">
				<growth-trend
					ref="trendRef"
					:chinaTrend="chinaTrend"
					:type="activeTrend"
				></growth-trend>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import Domestic from '../../components/report/Domestic.vue'
import CityReport from '../../components/report/CityReport.vue'
import China from '../../components/chart/China.vue'
import GrowthTrend from '../../components/chart/GrowthTrend.vue'
import {
	getChina,
	getCity,
	getProvince,
	getChinaTrend,
} from '../../api/statistics'

export default {
	name: 'Report',
	components: {
		China,
		Domestic,
		CityReport,
		GrowthTrend,
	},
	setup() {
		const state = reactive({
			chinaRes: {},
			chinaData: {},
			provinceRes: {},
			provinceData: [],
			cityData: [],
			chinaTrend: [],
		})

		let activeTrend = ref('add')
		async function getProvinceFunc() {
			state.provinceRes = await getProvince('today')
		}
		getProvinceFunc()

		// 获取国内疫情趋势数据
		getChinaTrendAsyncFn()
		async function getChinaTrendAsyncFn() {
			const res = await getChinaTrend()
			state.chinaTrend = res.data.data
		}
		return {
			...toRefs(state),
			activeTrend,
		}
	},
}
</script>

<style lang="scss" scoped>
.report {
	background-color: #2fbcc4;

	.hover {
		width: 800px;
		max-width: 800px;
		margin: 0 auto;
		background: #fff;
    padding-bottom: 16px;

		.china-hover {
			width: 100%;
			height: 80vh;
		}

		.trend-menu {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin: 0 auto;
			background: #e3e6eb;
			height: 40px;
			border-radius: 5px;

			.trend-item {
				width: 50%;
				width: 48%;
				height: 36px;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.trend-item.active {
				background: #fff;
				font-weight: 700;
				border-radius: 5px;
			}
		}

		.trend-hover {
			background: #fff;
			width: 100%;
			height: 500px;
		}
	}
}
</style>
