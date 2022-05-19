<template>
    <div id="location">
        <n-card content-style="padding: 10px;" style="margin-bottom: 10px">
            <n-space justify="space-between">
                <div class="search-item">
                    <span>id：</span>
                    <n-input-number style="width: 150px" v-model:value="params.id"></n-input-number>
                </div>
                <div class="search-item">
                    <span>名称：</span>
                    <n-input style="width: 150px" v-model:value="params.name"></n-input>
                </div>

                <div class="search-item">
                    <span>负责人姓名：</span>
                    <n-input v-model:value="params.principalName"></n-input>
                </div>
                <div class="search-item">
                    <span>负责人电话：</span>
                    <n-input v-model:value="params.principalPhone"></n-input>
                </div>
                <div class="search-action">
                    <n-button color="#1288ff" style="width: 80px;margin-right: 10px" :loading="searchBtnLoading"
                        @click="getLocationsAsyncFn">查询
                    </n-button>
                    <n-button @click="reset">重置</n-button>
                </div>
            </n-space>
        </n-card>
        <n-card content-style="padding: 10px">
            <n-space justify="space-between" align="center">
                <n-button color="#1288ff" style="width: 100px; margin-bottom: 10px" @click="insertFn">添加</n-button>
                <n-tooltip>
                    <template #trigger>
                        <n-icon size="22" style="cursor: pointer" @click="getLocationsAsyncFn">
                            <refresh />
                        </n-icon>
                    </template>
                    刷新
                </n-tooltip>
            </n-space>
            <n-data-table :columns="columns" :data="locations" :pagination="pagination" />
        </n-card>
        <insert ref="insertRef" />
    </div>
</template>

<script setup>
import { ref, reactive, watch, h, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NInputNumber, NSpace, NSelect, NTooltip } from 'naive-ui'
import { ChevronDown, ChevronUp, Refresh } from '@vicons/ionicons5'
import Insert from '../../components/location/Insert.vue'
import { getLocations, deleteLocation } from '../../api/management'

const router = useRouter()

// 修改insert子组件modalShow
let insertRef = ref(null)
function insertFn () {
    insertRef.value.modalShow = true
}

let params = ref({
    id: undefined,
    name: undefined,
    principalName: undefined,
    principalPhone: undefined,
    address: undefined,
})
let showMoreSearch = ref(false)
let searchBtnLoading = ref(false)

// 获取隔离点信息
let locations = ref([])
getLocationsAsyncFn(false)
async function getLocationsAsyncFn (showSuc = true) {
    searchBtnLoading.value = true
    try {
        const res = await getLocations(params.value)
        if (res.data.msg == 'Success' && showSuc) window.$message.success('查询成功')
        locations.value = res.data.data || []
    } finally {
        searchBtnLoading.value = false
    }

}

// 删除
async function deleteLocationAsyncFn (id) {
    const res = await deleteLocation(id)
    if (res.data.msg == 'Success') {
        window.$message.success('删除成功')
        getLocationsAsyncFn(false)
    }
}

function reset () {
    for (let key in params.value) {
        params.value[key] = null
    }
    getLocationsAsyncFn()

}

const columns = [
    {
        title: 'id',
        key: 'id',
    },
    {
        title: '名称',
        key: 'name',
    },
    {
      title: '所属地区',
      key: 'region'
    },
    {
        title: '负责人姓名',
        key: 'principal_name',
    },
    {
        title: '负责人电话',
        key: 'principal_phone',
    },
    {
        title: '具体地址',
        key: 'address',
    },
    {
        title: '操作',
        key: 'action',
        render (row) {
            return h(
                'span',
                {
                    class: 'delete-location',
                    onClick: () => deleteLocationAsyncFn(row.id),
                },
                '删除'
            )
        },
    },
]

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
</script>

<style lang="scss" scoped>
#location {
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

    :deep(.delete-location) {
        color: red;
        cursor: pointer;
    }
}
</style>
