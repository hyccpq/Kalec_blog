<template>
    <div>
        <h1>文章列表</h1>
        <i-table size="default" border :columns="columns7" :data="data"></i-table>
        <Page
            :total="articleNum"
            show-sizer
            show-total
            :transfer="true"
            :page-size-opts="[10, 20]"
            @on-change="pageChange"
            @on-page-size-change="pageCountChange"
        ></Page>
        <is-remove :is-showlog="isShowRemove" @onChange="showRemove">
            <h3>确定要删除吗？</h3>
            <Button size="default" type="warning" @click="articleRemove">确定</Button>
            <Button size="default" style="margin-left: 8px" @click="showRemove">取消</Button>
        </is-remove>
    </div>
</template>

<script>
	import { Table, Page } from 'iview'
	import isRemove from './plug/modal'
	export default {
		name: "article-manage",
		components:{
			iTable:Table,
			isRemove,
            Page
		},
		data () {
			return {
				columns7: [
					{
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('div', [
								h('strong', params.row.title)
							]);
						}
					},
					{
						title: '发布时间',
						key: 'time',
                        render: (h, params) => h('div', this.$formatTime(params.row.time))
					},
					{
						title: '作者',
						key: 'author'
					},
					{
						title: '操作',
						key: 'action',
						// width: 150,
						align: 'center',
						render: (h, params) => {
							if(params.row.show === 0){
								return h('div', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.$router.push(`/admin/edit/articleManage/commentManage/${params.row._id}`)
											}
										}
									}, '评论'),
									h('Button', {
										props: {
											type: 'success',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.editShow(params.row._id,1);
											}
										}
									}, '上线'),
									h('Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.$router.push(`/admin/edit/articleManage/edit/${params.row._id}`)
											}
										}
									}, '编辑'),
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										on: {
											click: () => {
												this.remove(params.index,params.row._id);
											}
										}
									}, '删除')
								])
							} else {
								return h('div', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.$router.push(`/admin/edit/articleManage/commentManage/${params.row._id}`)
											}
										}
									}, '评论'),
									h('Button', {
										props: {
											type: 'warning',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.editShow(params.row._id, 0);
											}
										}
									}, '下线'),
									h('Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '3px'
										},
										on: {
											click: () => {
												this.$router.push(`/admin/edit/articleManage/edit/${params.row._id}`);
											}
										}
									}, '编辑'),
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										on: {
											click: () => {
												this.remove(params.index,params.row._id)
											}
										}
									}, '删除')
								]);
							}

						}
					}
				],
				data: [],
                articleNum: 0,
				isShowRemove:false,
				removeId:{},
                pageNum: 1,
                pageCount: 10
			}
		},
		methods: {
			pageChange(pageNum){
                this.pageNum = pageNum
                this.reqTable(this.pageNum, this.pageCount)
            },
            pageCountChange(pageCount){
			    this.pageCount = pageCount
                this.reqTable(this.pageNum, this.pageCount)
            },
			editShow (id,show) {
				this.axios.put('/admin/v0/editShow',{
					id,
					show
				}).then(res => {
					console.log(res);
					if(res.data.status === 1){
						if(res.data.show){
							this.$Notice.success({
								title:'上线成功！！'
							})
						} else {
							this.$Notice.warning({
								title:'已下线！！'
							})
						}
					} else {
						console.log(res.data);
					}
				})
					.then(this.reqTable(this.pageNum, this.pageCount))
					.catch(err => {
						console.log(err);
					});
			},
			remove (index,id) {
				console.log(index);
				this.removeId={
					id,
					index
				};
				this.showRemove();

			},
			articleRemove(){
				this.axios.delete('/admin/v0/deleteArticle',{
					params:{
						id:this.removeId.id
					}
				}).then(res=>{
					if(res.data.status === 1){
						console.log(res.data);
					} else {
						console.log(res.data.msg);
					}
				}).then(()=>{
					this.data.splice(this.removeId.index, 1);
					this.showRemove();
				}).catch(e=>{
					console.log(e);
				})
			},
			showRemove(){
				this.isShowRemove = !this.isShowRemove;
			},
			reqTable (pageNum, pageCount){
				this.axios.get('/admin/v0/searchAll', {
					params:{
						page: pageNum - 1,
                        count: pageCount
                    },
                }).then(res=>{
					// console.log(res.data.data.list);
					if(res.data.status === 1){
						this.articleNum = res.data.data.allArticleList
						this.data = res.data.data.articleListAllInfo;
					} else {
						console.log(res.data.msg);
					}
				}).catch(e =>{
					console.log(e);
				})
			}
		},
		created(){
			this.reqTable(this.pageNum, this.pageCount);
		}
	}
</script>

<style scoped>

</style>
