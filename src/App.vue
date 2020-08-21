<template>
  <div>
    <el-tabs active-name="ToDoList" type="card" >
      <el-tab-pane label="ToDoList" name="ToDoList">
        <ToDoList></ToDoList>
      </el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ToDoList from "./components/ToDoList.vue";
export default {
  name: 'app',
  components: {
    ToDoList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
