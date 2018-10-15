<template>
  <div class="container">
    <div class="container-main">
      <div class="content-module-wrapper">
        <h2 class="header">编辑用户组名</h2>
        <section>
          <table>
            <tbody>
            <tr>
              <th>用户组名:</th>
              <td>
                <el-select v-model="groups.groupID" @change="getGroup">
                  <el-option
                    v-for="item in groupNameList"
                    :key="item.groupID"
                    :label="item.groupName"
                    :value="item.groupID">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <th>用户：</th>
              <td>
                  <el-checkbox-group v-model="usersList.group" @change="handleDiffUsers" >
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
        <el-button type="primary">删除</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'xauditEdit',
  data () {
    return {
      oldValue: '1',
      groupNameList: [],
      groupsList: [],
      groups: {
        groupID: '1',
        groupName: '',
        group: []
      },
      key: true,
      userList: []
    }
  },
  computed: {
    usersList () {
      let myGroupID = this.groupNameList[this.groups.groupID - 1]
      return myGroupID
    },
    groupsListUsersList () {
      let myGroupID = this.groupsList[this.groups.groupID - 1]
      return myGroupID
    },
    temp () {
      return this.groups.groupID
    }
  },
  watch: {
    temp: {
      handler (val, oldVal) {
        // console.log('tempval:' + val + ' +tempoldval:' + oldVal)
        this.oldValue = val
      }
    }
  },
  methods: {
    handleDiffUsers () {
      if (this.groupsListUsersList.sort().toString() !== this.usersList.group.sort().toString()) {
        this.key = false
      } else {
        this.key = true
      }
    },
    getGroup () {
      this.groups.groupName = this.usersList.groupName
      this.groups.group = this.usersList.group
      if (this.key === false) {
        alert('请保存后切换')
        this.groups.groupID = this.oldValue
      }
    },
    handleSave () {
      this.key = true
      this.groups.groupName = this.usersList.groupName
      this.groups.group = this.usersList.group
      console.log(this.groups)
      axios.put('http://192.168.3.80:8080/static/data/userGroup.json', {
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
  updated () {
    if (this.usersList.group.length > 0) {
      this.groups.groupName = this.usersList.groupName
      this.groups.group = this.usersList.group
    }
  },
  created () {
    axios.get('http://192.168.3.80:8080/static/data/userGroup.json')
      .then(res => {
        this.userList = res.data.users
        res.data.groups.forEach(item => {
          this.groupsList.push(item.group)
        })
        res.data.groups.forEach(item => {
          this.groupNameList.push({
            groupID: item.groupID,
            groupName: item.groupName,
            group: item.group
          })
        })
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
