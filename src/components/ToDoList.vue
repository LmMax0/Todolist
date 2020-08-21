<template>
  <div>
    <el-container>
      <el-header height="20">
        <h1>ToDoList</h1>
      </el-header>
      <el-main>
        <el-input placeholder="回车添加待办事项" class="todoinput"
                  @keyup.enter.native="add" v-model="newtodo.content">
        </el-input>
        <p>进行中：{{todolist.length}} 已完成：{{donenum}}</p>
        <el-row v-for="(item,index) in todolist" class="list-row" :key="index">
          <!--通过done的值来绑定class，当done是true时绑定green表示完成，false时绑定red这个class-->
          <el-col :xs="2" :sm="1" :lg="1" :xl="1" class="check"
                  :class="{'red':!todolist[index].done,'green':todolist[index].done}" >
            <!--双向绑定checkbox，item.done的值判断是否选中-->
            <el-checkbox size="mini" v-model="item.done" @change="update(item)"></el-checkbox>
          </el-col>

          <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="22">
            <!--给input绑定一个删除线的class，当done为true表示完成时就添加这个class-->
            <input type=text @change="update(item)" v-model="item.content"  class="ipcont" :class="{'done':todolist[index].done}">
          </el-col>

          <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="close">
            <!--点击触发删除函数，会把index传递给del函数，删除一行数据-->
            <i class="el-icon-close" @click="del(index)"></i>
          </el-col>
        </el-row>
      </el-main>
      <el-row>
        <div class="delButton">
        <el-button class="float-right " title="删除云端所有记录" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </el-row>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'app',
    data(){
      return {
        newtodo:{
          content:'',
          done:false
        },
        todolist:[
          {
            content:'start',
            done:false
          }
        ]
      }
    },
    methods:{
      add(){//增加
        if(this.newtodo.content){
          let posnewtodo = {
            content:this.newtodo.content,
            done:false,
          }
          //将添加事项导入数据库 save
          axios.post("http://localhost:8181/todolist/save",posnewtodo
          ).catch(error=>{
            console.log('接口或处理逻辑出错');
          })

          this.todolist.push(posnewtodo)
          this.newtodo.content = ''
        }
      },
      del(index){//删除 delete
        let delTodoId = this.todolist[index].id;
        // console.log(delTodoId);
        axios.delete("http://localhost:8181/todolist/deleteById/"+delTodoId).then(
              this.todolist.splice(index,1)
        ).catch(error=>{
          console.log('接口或处理逻辑出错')
        })
      },
      update(item){//更新数据
       // console.log("原数据：")
       // console.log(item);
        axios.put("http://localhost:8181/todolist/update",item).catch(error=>{
          console.log('接口或处理逻辑出错')
        })
      }
    },

//计算属性，filter()把，done为true的返回出来，然后用length得出为true的一共有几个
//在HTML部分的 “已完成：{{ donenum }}” 把已完成的显示到页面上
    computed:{
      donenum(){
        return this.todolist.filter(function (val) { return val.done }).length
      }
    },
    mounted:function () {
      //从数据库导入待办事项,查询 findAll
      var _this=this;
      axios.get("http://localhost:8181/todolist/findAll").then(
          function (resp) {
           // console.log(resp.data)
            _this.todolist = resp.data
          }
      )
    }
  };
</script>
<style scoped>
  @import "../../style/todolist.css";
  /* 给style添加一个scoped表示当前样式只给当前页面设置。 */
</style>
