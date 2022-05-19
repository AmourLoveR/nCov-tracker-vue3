<template>
	<n-card title="接触者获取">
		<span class="tooltip">将从虚拟数据中获取该患者的接触者！</span>
		<div class="faker-action">
			<span>姓名：{{ observation?.name }}</span>
			<span>id：{{ observation?.id }}</span>
			<n-button
				color="#1288ff"
				style="width: 100px"
				:loading="fakerLoading"
				@click="getFakerAsyncFn"
				>查询</n-button
			>
		</div>
		<n-alert type="info" closable v-show="isInfoShow">
      共获取到个{{ fakerData?.pullAmount }}接触者信息，请注意查收
    </n-alert>
	</n-card>
</template>

<script setup>
import { ref, inject } from 'vue'
import { NAlert } from 'naive-ui'
import { getFaker } from '../../../api/management'

const observation = inject('observation')
const id = inject('id')

let fakerLoading = ref(false)
let isInfoShow = ref(false)

let fakerData = ref({})
async function getFakerAsyncFn() {
  console.log(observation);
	fakerLoading.value = true
	try {
		const res = await getFaker(id)
		if (res.data.msg == 'Success') {
      fakerData.value = res.data.data
			window.$message.success('查询成功')
      isInfoShow.value = true
		}
	} finally {
		fakerLoading.value = false
	}
}
</script>

<style lang="scss" scoped>
.tooltip {
	font-size: 13px;
	color: #555;
}

.faker-action {
	max-width: 400px;
  height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
