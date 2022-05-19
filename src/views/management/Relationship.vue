<template>
	<div id="relationship">
		<n-card
			style="width: 300px; margin-bottom: 10px"
			content-style="padding: 10px"
		>
			<div style="display: flex">
				<n-input-number
					v-model:value="id"
					placeholder="请输入id"
				></n-input-number>
				<n-button
					style="margin-left: 10px"
					color="#1288ff"
					@click="getObservationTreeAsyncFn('all')"
					>查询</n-button
				>
			</div>
		</n-card>
		<n-card>
			<div id="relationChart" v-show="!empty"></div>
			<n-empty v-show="empty" description="无内容"> </n-empty>
		</n-card>
	</div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { NInputNumber, NEmpty } from 'naive-ui'
import * as echarts from 'echarts'
import { getObservationTree } from '../../api/management'

let id = ref(undefined)
let chart = undefined

// 判断是否有内容
let empty = computed(() => {
	if (
		JSON.stringify(observationTree.value) == '{}' ||
		!observationTree.value.id
	)
		return true
	else return false
})

// 获取关系树
let observationTree = ref({})
async function getObservationTreeAsyncFn(direction = 'all') {
	const res = await getObservationTree(id.value, direction)
	observationTree.value = res.data.data || {}
	insertValue(observationTree.value)
	if (chart) chart.dispose()
	nextTick(() => {
		if (!empty.value) setChart([observationTree.value])
	})
}

function setChart(data) {
	console.log('set')
	chart = echarts.init(document.getElementById('relationChart'))
	// 绘制图表
	chart.setOption({
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove',
		},
		series: [
			{
				type: 'tree',
				data,
				top: '1%',
				left: '7%',
				bottom: '1%',
				right: '20%',
				symbolSize: 7,
				label: {
					position: 'left',
					verticalAlign: 'middle',
					align: 'right',
					fontSize: 14,
				},
				leaves: {
					label: {
						position: 'right',
						verticalAlign: 'middle',
						align: 'left',
					},
				},
				emphasis: {
					focus: 'descendant',
				},
				expandAndCollapse: true,
				animationDuration: 550,
				animationDurationUpdate: 750,
			},
		],
	})
}

function insertValue(node) {
	console.log('insert')
	node.value = node.id
	let color = ''
	switch (node.healthSituation) {
		case 1:
			color = '#ff2525'
			break
		case 2:
			color = '#ffc03d'
			break
		case 3:
			color = '#e7eefb'
			break
		default:
			color = ''
	}
	node.itemStyle = {
		color,
	}
	if (node.children) {
		for (let item of node.children) {
			insertValue(item)
		}
	}
}
</script>

<style lang="scss" scoped>
#relationship {
	padding: 1rem;

	#relationChart {
		width: 100%;
		height: 500px;
	}
}
</style>
