<template>
	<n-layout has-sider position="absolute">
		<n-layout-sider
			:collapsed="isMenuShow"
			collapse-mode="width"
			:collapsed-width="64"
			:width="240"
			content-style="padding: 0;"
		>
			<n-menu
				collapse-mode="width"
				:collapsed-width="64"
				:icon-size="22"
				:collapsed-icon-size="24"
				:options="menuOptions"
				:value="menuValue"
				@update:value="menuUpdate"
			/>
		</n-layout-sider>
		<n-layout>
			<n-layout-header>
				<div class="layout-header">
					<n-icon size="24" @click="isMenuShow = !isMenuShow">
						<menu-outline v-if="screenSize == 'small'" />
						<template v-else>
							<img v-show="!isMenuShow" src="../assets/imgs/menuClose.svg" />
							<img v-show="isMenuShow" src="../assets/imgs/menuOpen.svg" />
						</template>
					</n-icon>
					<div class="message" @click="toNotify">
						<n-badge :value="notifyStore.count" :max="10">
							<n-icon :size="22" color="#000"><mail-outline /></n-icon>
						</n-badge>
						<div>消息</div>
					</div>
					<n-popselect>
						<div class="userinfo">
							<div>{{ userStore.username }}</div>
							<n-icon size="16"><caret-down-filled /></n-icon>
						</div>
						<template #empty>
							<div class="info-item">
								<n-icon>
									<person-outline />
								</n-icon>
								<span>
									角色：{{
										userStore.role == 4
											? '志愿者'
											: userStore.role == 8
											? '工作人员'
											: '管理员'
									}}
								</span>
							</div>
							<div class="info-item">
								<n-icon>
									<location-outline />
								</n-icon>
								<span>地区：{{ userStore.region }}</span>
							</div>
						</template>
						<template #action>
							<div class="logout" @click="logout">
								<n-icon>
									<power-outline />
								</n-icon>
								<span>退出登录</span>
							</div>
						</template>
					</n-popselect>
				</div>
			</n-layout-header>
			<n-layout-content content-style="padding: 0;" :native-scrollbar="false">
				<router-view></router-view>
			</n-layout-content>
		</n-layout>
	</n-layout>
	<n-drawer v-model:show="isMenuShow" placement="left">
		<n-drawer-content>
			<n-menu
				collapse-mode="width"
				:collapsed-width="64"
				:icon-size="22"
				:collapsed-icon-size="24"
				:options="menuOptions"
				:value="menuValue"
				@update:value="menuUpdate"
			/>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
	useMessage,
	NLayout,
	NLayoutSider,
	NLayoutHeader,
	NLayoutContent,
	NLayoutFooter,
	NMenu,
	NIcon,
	NDrawer,
	NDrawerContent,
	NPopselect,
	NBadge,
} from 'naive-ui'
import {
	MenuOutline,
	HomeOutline,
	SpeedometerOutline,
	DocumentTextOutline,
	BookOutline,
	PeopleOutline,
	MailOutline,
	PersonOutline,
	LocationOutline,
	PowerOutline,
	BarChartOutline,
} from '@vicons/ionicons5'
import { CaretDownFilled, ContactsOutlined } from '@vicons/antd'
import { ChartRelationship } from '@vicons/carbon'
import { useUserStore, useNotifyStore } from '../store/index'
import { getNotifyCount } from '../api/notification'
import { decodeToken } from '../utils/utils'

window.$message = useMessage()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const notifyStore = useNotifyStore()

// 若存在token，初始化userinfo
const token = localStorage.getItem('token')
if (token) {
	const user = decodeToken(token)
	userStore.setUserinfo(user)
} else {
	window.$message.warning('请先登录！')
	router.push('/login')
}

let menuValue = ref('index')
let isMenuShow = ref(false)
let screenSize = ref('large')
screenSize = document.body.clientWidth < 500 ? 'small' : 'large'

menuValue.value = route.path

if (route.name == 'editor') menuValue.value = '/article'
if (route.name == 'observationInfo') menuValue.value = '/observation'

function renderIcon(icon) {
	return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
	// {
	//   label: "首页",
	//   key: "/",
	//   icon: renderIcon(HomeOutline),
	// },
	{
		label: '医学观察对象',
		key: '/observation',
		icon: renderIcon(PersonOutline),
	},
	{
		label: '医学隔离点',
		key: '/location',
		icon: renderIcon(LocationOutline),
	},
	{
		label: '关系图谱',
		key: '/relationship',
		icon: renderIcon(ChartRelationship),
	},
	{
		label: '文章推送',
		key: '/article',
		icon: renderIcon(BookOutline),
	},
	{
		label: '事务处理',
		key: 'henale',
		icon: renderIcon(BarChartOutline),
		children: [
			{
				label: '账号管理',
				key: '/accounts',
				// icon: renderIcon(PeopleOutline),
			},
			{
				label: '消息通知',
				key: '/notification',
				// icon: renderIcon(MailOutline),
			},
		],
	},
]

function menuUpdate(key, item) {
	router.push(key)
	menuValue.value = key
}

function logout() {
	localStorage.removeItem('token')
	router.push('/login')
}

// 获取通知数量
getNotifyCountAsyncFn()
async function getNotifyCountAsyncFn() {
	const res = await getNotifyCount()
	notifyStore.setCount(res.data.data.count)
}
function toNotify() {
	router.push('/notification')
}
</script>

<style lang="scss" scoped>
@mixin absolute-center {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
}
.n-layout-header {
	background: #fff;
	height: 60px;
	line-height: 60px;
	position: relative;
	z-index: 99;

	.layout-header {
		width: 100%;
		height: 100%;
		padding: 0 2rem 0 1rem;
		box-shadow: 0 1px 4px #00152914;
		position: relative;

		.message {
			@include absolute-center();
			width: 50px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			cursor: pointer;
			padding: 0 10px;
			border-radius: 4px;
			right: 7rem;

			&:hover {
				color: rgb(157, 157, 157);
				border: 1px solid rgb(227, 226, 226);
			}

			& > div {
				line-height: 18px;
			}
		}

		.userinfo {
			@include absolute-center();
			font-size: 18px;
			color: #000;
			display: flex;
			align-items: center;
			cursor: pointer;
			right: 2rem;
		}

		.n-icon {
			cursor: pointer;
		}

		img {
			width: 80%;
			height: 80%;
		}
	}
}

.n-layout-sider {
	background: #001428;
}

.n-layout-content {
	background: #f5f7f9;
	height: calc(100vh - 60px);

	.n-scrollbar-content {
		width: 100%;
	}
}

@media screen and (max-width: 500px) {
	.n-layout-sider {
		display: none;
	}
}
</style>

<style lang="scss">
.n-drawer {
	background: #001428;
}
@media screen and (min-width: 500px) {
	.n-drawer-container {
		display: none;
	}
}
.n-base-select-menu__empty {
	padding: 4px 0 !important;
	display: block !important;

	.info-item {
		margin: 1px 12px;
		padding: 3px 0 3px 10px;
		width: 150px;
		border-radius: 5px;
		color: #61666d;
		font-size: 13px;
		display: flex;
		align-items: center;

		span {
			padding-left: 15px;
		}
	}
}

.n-base-select-menu__action {
	padding: 4px 0 !important;
	display: block !important;

	.logout {
		margin: 1px 12px;
		height: 38px;
		line-height: 20px;
		padding: 3px 0 3px 10px;
		width: 150px;
		border-radius: 5px;
		color: #61666d;
		font-size: 13px;
		display: flex;
		align-items: center;
		cursor: pointer;

		&:hover {
			background: #e3e5e7;
		}

		span {
			padding-left: 15px;
		}
	}
}
</style>
