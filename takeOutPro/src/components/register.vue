<template>
  <div>
    <h5>硅谷外卖</h5>
  </div>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]"/>
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]">
        <van-field name="switch" label="开关">
          <template #input>
            <van-switch v-model="switchChecked" size="20" />
          </template>
        </van-field>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Form } from 'vant';
  import { Field } from 'vant';

  Vue.use(Form);
  Vue.use(Field);
  export default {
    name:"register",
    data() {
      return {
        username: '',
        password: '',
        switchChecked: false,
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
    },
  }
</script>
