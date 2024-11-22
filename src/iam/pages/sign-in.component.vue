<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="tittle">
    <div><img src="https://mir-s3-cdn-cf.behance.net/projects/404/e40b1536127949.Y3JvcCw0MDQsMzE2LDAsMA.jpg" alt="PCMaster"> </div>
    <div>{{ $t('iam.sign-in') }} PCMaster</div>
  </div>

  <div class="sign-in-form">
    <form @submit.prevent="onSignIn">
      <div class="p-fluid">
        <div class="field mt-5 flex flex-column align-items-center">
          <pv-float-label>
            <label for="username">{{ $t('iam.username') }}</label>
            <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}"/>
          </pv-float-label>
          <small v-if="!username" class="p-invalid">{{ $t('iam.user') }}</small>
        </div>
        <div class="field mt-5 flex flex-column align-items-center">
          <pv-float-label>
            <label for="password">{{ $t('iam.password') }}</label>
            <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
          </pv-float-label>
          <small v-if="!password" class="p-invalid">{{ $t('iam.pass') }}</small>
        </div>
        <div class="p-field mt-5">
          <pv-button class="w-full" type="submit">{{ $t('iam.sign-in') }}</pv-button>
        </div>
        <div class="new">
          {{ $t('iam.new') }}
          <router-link to='sign-up'>
            <a class="m-1">{{ $t('iam.create') }}</a>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

.tittle {
  text-align: center;
}

img {
  width: 65px;
  height: 50px;
  margin: 10px;
}

.sign-in-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.new {
  margin-top: 20px;
}

</style>