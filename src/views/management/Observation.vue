<template>
	<div id="observation">
		<n-card content-style="padding: 10px;" style="margin-bottom: 10px">
			<n-space justify="space-between">
				<div class="search-item">
					<span>id：</span>
					<n-input-number
						style="width: 150px"
						v-model:value="params.id"
					></n-input-number>
				</div>
				<div class="search-item">
					<span>姓名：</span>
					<n-input style="width: 150px" v-model:value="params.name"></n-input>
				</div>
				<div class="search-item">
					<span>性别：</span>
					<n-select
						style="width: 100px"
						v-model:value="params.sex"
						:options="sexOptions"
					></n-select>
				</div>
				<div class="search-item">
					<span>身份证号：</span>
					<n-input v-model:value="params.identification"></n-input>
				</div>
				<template v-if="showMoreSearch">
					<div class="search-item">
						<span>接触患者id：</span>
						<n-input-number
							style="width: 150px"
							v-model:value="params.contactPerson"
						></n-input-number>
					</div>
					<div class="search-item">
						<span>类型：</span>
						<n-select
							style="width: 150px"
							v-model:value="params.healthSituation"
							:options="healthOptions"
						>
						</n-select>
					</div>
					<div class="search-item">
						<span>采取措施：</span>
						<n-select
							style="width: 150px"
							v-model:value="params.measureSituation"
							:options="measureOptions"
						></n-select>
					</div>
					<div class="search-item">
            <span>所属地区：</span>
						<n-cascader
              style="width: 150px"
							:options="getRegionOptions()"
							check-strategy="child"
							clearable
							@update:value="handleUpdateRegion"
						></n-cascader>
					</div>
          <div class="search-item">
					<span>所在地：</span>
					<n-input v-model:value="params.address"></n-input>
				</div>
				</template>
				<div class="search-action">
					<n-button
						color="#1288ff"
						style="width: 80px; margin-right: 10px"
						:loading="searchBtnLoading"
						@click="getObservationsAsyncFn"
						>查询
					</n-button>
					<n-button @click="reset">重置</n-button>
					<div
						class="show-more-search"
						@click="showMoreSearch = !showMoreSearch"
					>
						<template v-if="!showMoreSearch">
							<n-icon>
								<chevron-down />
							</n-icon>
							<span>展开</span>
						</template>
						<template v-else>
							<n-icon>
								<chevron-up />
							</n-icon>
							<span>收起</span>
						</template>
					</div>
				</div>
			</n-space>
		</n-card>
		<n-card content-style="padding: 10px">
			<n-space justify="space-between" align="center">
				<n-button
					color="#1288ff"
					style="width: 100px; margin-bottom: 10px"
					@click="insertFn"
					>添加</n-button
				>
				<n-tooltip>
					<template #trigger>
						<n-icon
							size="22"
							style="cursor: pointer"
							@click="getObservationsAsyncFn"
						>
							<refresh />
						</n-icon>
					</template>
					刷新
				</n-tooltip>
			</n-space>
			<n-data-table
				:columns="columns"
				:data="observations"
				:pagination="pagination"
			/>
		</n-card>
		<insert ref="insertRef"></insert>
	</div>
</template>

<script setup>
import { ref, reactive, watch, h, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NInputNumber, NSpace, NSelect, NTooltip, NCascader } from 'naive-ui'
import { ChevronDown, ChevronUp, Refresh } from '@vicons/ionicons5'
import Insert from '../../components/observation/Insert.vue'
import { getObservations } from '../../api/management'
import { getRegionOptions } from '../../utils/utils'

const router = useRouter()

// 修改insert子组件modalShow
let insertRef = ref(null)
function insertFn() {
	insertRef.value.modalShow = true
}

let params = ref({
	id: undefined,
	name: undefined,
	age: undefined,
	sex: undefined,
	phone: undefined,
	identification: undefined,
	contactPerson: undefined,
	healthSituation: undefined,
	measureSituation: undefined,
	address: undefined,
	region: undefined,
})
let showMoreSearch = ref(false)
let searchBtnLoading = ref(false)

// 获取观察对象信息
let observations = ref([])
getObservationsAsyncFn(false)
async function getObservationsAsyncFn(showSucess = true) {
	searchBtnLoading.value = true
	try {
		const res = await getObservations(params.value)
		if (res.data.msg == 'Success' && showSucess)
			window.$message.success('查询成功')
		observations.value = res.data.data || []
		observations.value.reverse().forEach((item) => {
			item.healthSituation =
				item.healthSituation == 0
					? '其他'
					: item.healthSituation == 1
					? '患者'
					: item.healthSituation == 2
					? '密接'
					: '次密接'
			item.measureSituation =
				item.measureSituation == 0
					? '未采取措施'
					: item.measureSituation == 1
					? '接触风险'
					: item.measureSituation == 2
					? '正在治疗'
					: item.measureSituation == 3
					? '集中隔离'
					: '居家隔离'
      if(item.record.includes('确诊')) {
        item.record = item.record.substring(0, 9) + item.record.substring(item.record.indexOf('确诊'))
      }
		})
	} finally {
		searchBtnLoading.value = false
	}
}

function reset() {
	for (let key in params.value) {
		params.value[key] = null
	}
	getObservationsAsyncFn()
}

const columns = [
	{
		title: 'id',
		key: 'id',
	},
	{
		title: '姓名',
		key: 'name',
	},
	{
		title: '年龄',
		key: 'age',
	},
	{
		title: '联系电话',
		key: 'phone',
	},
	{
		title: '接触患者id',
		key: 'contactPerson',
	},
	{
		title: '类型',
		key: 'healthSituation',
	},
	{
		title: '采取措施',
		key: 'measureSituation',
	},
	{
		title: '状态记录',
		key: 'record',
	},
	{
		title: '操作',
		key: 'action',
		render(row) {
			return h(
				'span',
				{
					class: 'read-more',
					onClick: () => readMore(row.id),
				},
				'更多信息'
			)
		},
	},
]

// 查看更多信息
function readMore(id) {
	router.push(`/observation/${id}`)
}

// 分页
const pagination = reactive({
	page: 1,
	pageSize: 5,
	showSizePicker: true,
	pageSizes: [3, 5, 7],
	onChange: (page) => {
		pagination.page = page
	},
	onUpdatePageSize: (pageSize) => {
		pagination.pageSize = pageSize
		pagination.page = 1
	},
})

const sexOptions = [
	{
		label: '男',
		value: 1,
	},
	{
		label: '女',
		value: 0,
	},
]

const healthOptions = [
	{
		label: '患者',
		value: 1,
	},
	{
		label: '密接',
		value: 2,
	},
	{
		label: '次密接',
		value: 3,
	},
	{
		label: '其他',
		value: 0,
	},
]

const measureOptions = [
	{
		label: '未采取措施',
		value: 0,
	},
	{
		label: '解除风险',
		value: 1,
	},
	{
		label: '正在治疗',
		value: 2,
	},
	{
		label: '集中隔离',
		value: 3,
	},
	{
		label: '居家隔离',
		value: 4,
	},
]

function handleUpdateRegion(value, option) {
	params.value.region = option.parent + ' ' + option.value
}
</script>

<style lang="scss" scoped>
#observation {
	padding: 1rem;

	.search-item {
		display: flex;
		align-items: center;

		span {
			display: block;
			white-space: nowrap;
		}
	}

	.search-action {
		.show-more-search {
			display: inline-block;
			color: #2d8cf0;
			cursor: pointer;
			padding-left: 10px;
		}
	}

	:deep(.read-more) {
		color: #2d8cf0;
		cursor: pointer;
	}
}

.trajectory {
	font-size: 14px;
	border: #bbb 1px solid;
	outline: none;
	padding: 10px;
}
</style>
