<template>
  <div class="container">
    <div class="container-main">
      <div class="content-module-wrapper">
        <h2 class="header">敏感词设置</h2>
        <section>
          <table>
            <tbody>
            <tr>
              <th>添加敏感词等级：</th>
              <td>
                  <el-input placeholder="请输入敏感词" v-model="sensitiveWord"  class="input-with-select">
                    <el-select class="select-input" v-model="select" slot="append" width="100px" placeholder="高危">
                      <el-option label="高危" value="fatal"></el-option>
                      <el-option label="中危" value="danger"></el-option>
                      <el-option label="低危" value="warning"></el-option>
                    </el-select>
                  </el-input>
                <el-button style="margin-top: 15px;" @click="handleAdd" type="primary" >添加</el-button>
                <div style="margin-top: 15px;">tip:红色为高危，橙色为中危，黄色为低危</div>
              </td>
            </tr>
            <tr>
              <th>已有敏感词：</th>
              <td>
                <table class="sensitiveTable">
                  <tbody v-for="item in sensitiveWordList"
                         :key="item.level">
                  <tr v-if="item.level==='fatal'"
                      class="alt"
                      v-for="(smallItem, index) in item.restrict"
                      :key="smallItem">
                    <td>
                      <div class="div-fatal">{{smallItem}}</div>
                      <i class="el-icon-error" @click="deleteRow(index,item.restrict)"></i>
                    </td>
                  </tr>
                  <tr v-if="item.level==='danger'"
                      class="alt"
                      v-for="(smallItem, index) in item.restrict"
                      :key="smallItem">
                    <td >
                      <div class="div-danger">{{smallItem}}</div>
                      <i class="el-icon-error" @click="deleteRow(index,item.restrict)"></i>
                    </td>
                  </tr>
                  <tr v-if="item.level==='warning'"
                      class="alt"
                      v-for="(smallItem, index) in item.restrict"
                      :key="smallItem">
                    <td>
                      <div class="div-warning">{{smallItem}}</div>
                      <i class="el-icon-error" @click="deleteRow(index,item.restrict)"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
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
      sensitiveWordList: [],
      sensitiveWord: '',
      select: ''
    }
  },
  methods: {
    handleAdd () {
      if (this.select === '' || this.sensitiveWord === '') {
        alert('您没有输入敏感词或者没有选择敏感词等级')
      } else {
        this.sensitiveWordList.forEach(item => {
          if (this.select === 'fatal') {
            if (item.level === 'fatal') {
              // console.log(item.restrict.indexOf(this.sensitiveWord))
              if (item.restrict.indexOf(this.sensitiveWord) === -1) {
                item.restrict.push(this.sensitiveWord)
              } else {
                alert('请不要重复添加高危级别的敏感词: ' + this.sensitiveWord)
              }
            }
          } else if (this.select === 'danger') {
            if (item.level === 'danger') {
              if (item.restrict.indexOf(this.sensitiveWord) === -1) {
                item.restrict.push(this.sensitiveWord)
              } else {
                alert('请不要重复添加中危级别的敏感词: ' + this.sensitiveWord)
              }
            }
          } else {
            if (item.level === 'warning') {
              if (item.restrict.indexOf(this.sensitiveWord) === -1) {
                item.restrict.push(this.sensitiveWord)
              } else {
                alert('请不要重复添加低危级别的敏感词: ' + this.sensitiveWord)
              }
            }
          }
        })
      }
      console.log(this.sensitiveWordList)
    },
    deleteRow (index, item) {
      // console.log(index)
      item.splice(index, 1)
    }
  },
  computed: {
  },
  created () {
    axios.get('http://192.168.3.80:8080/static/data/sensitiveWord.json')
      .then(res => {
        this.sensitiveWordList = res.data
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
  .el-icon-error {
    margin-left: 213px;
    display: inline;
    float: right
  }

  .sensitiveTable {
    /*border-collapse:collapse;*/
    margin-top: 30px;
  }

  .sensitiveTable tr td
  {
    font-size:1em;
    border:1px solid #efecec;
    padding:21px 36px 29px 18px;
    background-color:#fff;
  }
  .div-fatal{
    color: red;
    display: inline
  }
  .div-danger{
    color: orange;
    display: inline
  }
  .div-warning{
    color: yellow;
    display: inline
  }
  .select-input{
    width:90px
  }
</style>
