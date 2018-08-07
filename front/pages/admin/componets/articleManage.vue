<template>
  <div>
    <h3>文章列表</h3>
    <i-table border :columns="columns7" :data="data"></i-table>
    <is-remove :is-showlog="isShowRemove" @onChange="showRemove">
      <h3>确定要删除吗？</h3>
      <Button size="default" type="warning" @click.native="articleRemove">确定</Button>
      <Button size="default" style="margin-left: 8px" type="ghost" @click.native="showRemove">取消</Button>
    </is-remove>
  </div>
</template>

<script>
  import { Table } from 'iview'
  import isRemove from './plug/login'
	export default {
		name: "article-manage",
    components:{
      iTable:Table,
      isRemove
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
            key: 'time'
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
                        this.$router.push(`/articleManage/commentManage/${params.row.id}`)
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
                        this.editShow(params.row.id,1);
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
                        this.$router.push(`/articleManage/edit/${params.row.id}`)
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
                        this.remove(params.index,params.row.id);
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
                        this.$router.push(`/articleManage/commentManage/${params.row.id}`)
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
                        this.editShow(params.row.id,0);
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
                        this.$router.push(`/articleManage/edit/${params.row.id}`);
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
                        this.remove(params.index,params.row.id)
                      }
                    }
                  }, '删除')
                ]);
              }

            }
          }
        ],
        data: [],
        isShowRemove:false,
        removeId:{},
      }
    },
    methods: {
      editShow (id,show) {
        this.axios.put('/editShow',{
          id,
          show
        }).then(res => {
          if(res.data.status === 1){
            if(show){
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
          .then(this.reqTable())
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
        this.axios.delete('/deleteArticle',{
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
          console.log('error');
        })
      },
      showRemove(){
        this.isShowRemove = !this.isShowRemove;
      },
      reqTable (){
        this.axios.get('/searchAll').then(res=>{
          // console.log(res.data.data.list);
          if(res.data.status === 1){
            this.data = res.data.data.list;
          } else {
            console.log(res.data.msg);
          }
        }).catch(e=>{
          console.log('error');
        })
      }
    },
    created(){
		  this.reqTable();
    }
	}
</script>

<style scoped>

</style>
