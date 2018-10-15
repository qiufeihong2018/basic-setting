<template>
  <div class="container">
    <div class="container-main">
      <div class="content-module-wrapper">
        <h2 class="header">新建用户组名</h2>
        <section>
          <table>
            <tbody>
            <tr>
              <th>用户组名：</th>
              <td>
                <el-input v-model="groups.groupName" placeholder="请输入用户组名"></el-input>
              </td>
            </tr>
            <tr>
              <th>用户：</th>
              <td>
                <el-checkbox-group v-model="groups.group" >
                  <el-checkbox :label="item" v-for="item in userList" :key="item"></el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div class="action-button">
        <el-button @click="handleSave" type="primary">保存</el-button>
        <el-button type="primary">取消</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      groups: {
        groupName: '',
        group: []
      },
      userList: []
    }
  },
  methods: {
    handleSave () {
      console.log(this.groups)
      axios.post('http://192.168.3.80:8080/static/data/userGroup.json', {
        groups: this.groups
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    axios.get('http://192.168.3.80:8080/static/data/userGroup.json')
      .then(res => {
        this.userList = res.data.users
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 10px;
    background-color: #EBF7F7;
  }

  .container-main {
    background-color: #fff;
    padding: 15px;
    width: 1170px;
    margin-right: auto;
    margin-left: auto;
  }

  .content-module-wrapper {
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    background: #fdfdfd;
    margin-bottom: 20px;
  }

  .header {
    background: #f7f7f7;
    padding: 15px;
    margin-top: 0;
    border-radius: 5px 5px 0 0;
    border: 0;
    border-bottom: 1px solid #efecec;
    color: #e87e04;
    font-size: 16px;
    box-shadow: none;
  }

  section {
    margin: 1em;
    padding: 0;
  }

  .action-button {
    text-align: center;
    margin-bottom: 1em;
  }

  .el-button {
    background: #39bac2;
    color: #fff;
    padding: 10px 30px 8px;
    border: none;
    font-size: 16px;
    box-shadow: none;
    text-shadow: none;
    border-radius: unset;
  }

  .el-button:hover {
    background-color: #5A5A5A;
  }

  .el-checkbox-group {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    height: 200px;
    overflow-y: scroll;
    margin-top: 20px;
  }

  .el-checkbox {
    display: block;
    margin-left: 0;
  }

  th {
    text-align: right;
    font-weight: normal;
    padding-right: 1em;
    min-width: 100px;
  }
</style>
