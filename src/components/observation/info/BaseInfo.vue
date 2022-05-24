<template>
	<n-card title="基本信息">
		<template #header-extra>
			<span v-if="!isChange" class="update" @click="isChange = true">更新</span>
			<span v-else class="update" @click="cancle">取消</span>
		</template>
		<div v-if="!isChange">
			<div class="info-item">
				<span>id：</span><span>{{ observation?.id }}</span>
			</div>
			<div class="info-item">
				<span>姓名：</span><span>{{ observation?.name }}</span>
			</div>
			<div class="info-item">
				<span>性别：</span
				><span>{{ observation?.sex == 1 ? '男' : '女' }}</span>
			</div>
			<div class="info-item">
				<span>年龄：</span><span>{{ observation?.age }}</span>
			</div>
			<div class="info-item">
				<span>类型：</span>
				<span>{{
					observation?.healthSituation == 0
						? '其他'
						: observation?.healthSituation == 1
						? '患者'
						: observation?.healthSituation == 2
						? '密接'
						: '次密接'
				}}</span>
			</div>
			<div class="info-item">
				<span>接触患者：</span><span>{{ observation?.contactPerson }}</span>
			</div>
			<div class="info-item">
				<span>所属地区：</span><span>{{ observation?.region }}</span>
			</div>
			<div class="info-item">
				<span>联系电话：</span><span>{{ observation?.phone }}</span>
			</div>
			<div class="info-item">
				<span>身份证号：</span><span>{{ observation?.identification }}</span>
			</div>
			<div class="info-item">
				<span>居住地址：</span><span>{{ observation?.address }}</span>
			</div>
			<div class="info-item">
				<span>采取措施：</span>
				<span>{{
					observation?.measureSituation == 0
						? '未采取措施'
						: observation?.measureSituation == 1
						? '接触风险'
						: observation?.measureSituation == 2
						? '正在治疗'
						: observation?.measureSituation == 3
						? '集中隔离'
						: '居家隔离'
				}}</span>
			</div>
			<div class="info-item">
				<span>行程轨迹：</span><span>{{ observation?.trajectory }}</span>
			</div>
		</div>
		<div v-else>
			<n-form
				ref="uptForm"
				:model="observation"
				:rules="uptRules"
				label-placement="left"
				label-width="auto"
				require-mark-placement="right-hanging"
			>
				<n-form-item label="姓名" path="name">
					<n-input v-model:value="observation.name" placeholder=""></n-input>
				</n-form-item>
				<n-form-item label="性别" path="sex">
					<n-radio
						:checked="observation.sex == 1"
						:value="1"
						@change="handleSexChange"
						>男</n-radio
					>
					<n-radio
						:checked="observation.sex == 0"
						:value="0"
						@change="handleSexChange"
						>女</n-radio
					>
				</n-form-item>
				<n-form-item label="年龄" path="age">
					<n-input-number
						v-model:value="observation.age"
						placeholder=""
					></n-input-number>
				</n-form-item>
				<n-form-item label="类型" path="healthSituation">
					<n-select
						v-model:value="observation.healthSituation"
						:options="healthOptions"
					/>
				</n-form-item>
				<n-form-item path="contactPerson">
					<template #label>
						<span>
							接触患者
							<n-tooltip trigger="hover">
								<template #trigger>
									<n-icon size="15" style="cursor: pointer">
										<information-circle-outline />
									</n-icon>
								</template>
								该观察对象所接触患者的id
							</n-tooltip>
						</span>
					</template>
					<n-input-number
						v-model:value.number="observation.contactPerson"
						placeholder="观察对象所接触患者的id"
					></n-input-number>
				</n-form-item>
				<n-form-item label="身份证号" path="identification">
					<n-input
						v-model:value="observation.identification"
						placeholder=""
					></n-input>
				</n-form-item>
				<n-form-item label="联系电话" path="phone">
					<n-input v-model:value="observation.phone" placeholder=""></n-input>
				</n-form-item>
				<n-form-item label="所属地区" path="region">
					<n-cascader
						:options="getRegionOptions()"
						:default-value="defaultRegion"
						check-strategy="child"
						clearable
						placeholder=""
						@update:value="handleUpdateRegion"
					></n-cascader>
				</n-form-item>
				<n-form-item label="居住地址" path="address">
					<n-input v-model:value="observation.address" placeholder=""></n-input>
				</n-form-item>
				<n-form-item label="采取措施" path="measureSituation">
					<n-select
						v-model:value="observation.measureSituation"
						:options="measureOptions"
					></n-select>
				</n-form-item>
				<n-form-item label="行程轨迹" path="trajectory">
					<n-input
						v-model:value="observation.trajectory"
						type="textarea"
						cols="50"
						rows="6"
						placeholder=""
					></n-input>
				</n-form-item>
			</n-form>
			<div style="display: flex; justify-content: center">
				<n-button
					type="info"
					color="#1288ff"
					style="width: 100px"
					:loading="uptBtnLoading"
					@click="uptInfoAsyncFn"
					>更新基本信息</n-button
				>
			</div>
		</div>
	</n-card>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
	NRadio,
	NSelect,
	NInputNumber,
	NCascader,
	NScrollbar,
	NTooltip,
} from 'naive-ui'
import { InformationCircleOutline } from '@vicons/ionicons5'
import { getObservationById, uptObservation } from '../../../api/management'
import { getRegionOptions } from '../../../utils/utils'

const id = useRoute().params.id
let isChange = ref(false)
let uptForm = ref(null)
let defaultRegion = ref('')

const emit = defineEmits(['changeInfo'])

// 获取信息
let observation = ref({})
getObservationAsyncFn()
async function getObservationAsyncFn() {
	const res = await getObservationById(id)
	observation.value = res.data.data
	defaultRegion.value = observation.value.region.substring(3)
}

// 取消更新
function cancle() {
	// getObservationAsyncFn(id)
	isChange.value = false
}

// 更新
let uptBtnLoading = ref(false)
async function uptInfoAsyncFn() {
	uptForm.value?.validate(async (err) => {
		if (!err) {
			if (observation.value.trajectory == '')
				observation.value.trajectory = '无'
			try {
				uptBtnLoading.value = true
				const res = await uptObservation(observation.value)
				if (res.data.msg == 'Success') {
					window.$message.success('更新成功')
					emit('changeInfo')
					cancle()
				}
			} finally {
				uptBtnLoading.value = false
			}
		} else window.$message.error('表单校验未通过！')
	})
}

function handleSexChange(e) {
	observation.value.sex = e.target.value
}

const uptRules = {
	name: {
		required: true,
		message: '请输入姓名',
	},
	age: [
		{
			required: true,
			message: '请输入年龄',
		},
		{
			validator(rule, value) {
				return value >= 0
			},
			message: '年龄不能为负数',
		},
		{
			validator(rule, value) {
				return Number(value).toString() !== 'NaN'
			},
			message: '年龄不能为负数',
		},
	],
	healthSituation: {
		required: true,
		message: '请输入观察者类型',
	},
	identification: {
		required: true,
		message: '请输入身份证号',
	},
	contactPerson: [
		{
			required: true,
			message: '请输入接触患者id，若无则为0',
		},
		{
			validator(rule, value) {
				return Number(value).toString() !== 'NaN'
			},
			message: '接触患者id应该由数字组成',
		},
	],
	region: {
		required: true,
		message: '请选择所属地区',
	},
	address: {
		required: true,
		message: '请输入居住地址',
	},
	measureSituation: {
		required: true,
		message: '请选择已采取的措施',
	},
}

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
	observation.value.region = option.parent + ' ' + option.value
}
</script>

<style lang="scss" scoped>
.update {
	color: #2d8cf0;
	cursor: pointer;
}
.info-item {
	line-height: 36px;
	display: flex;

	& > span {
		&:first-child {
			flex-shrink: 0;
		}
	}
}
</style>
