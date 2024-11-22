<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      password: "",
    };
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="tittle">
    <div>{{ $t('iam.sign-up') }} PCMaster</div>
  </div>

  <div class="sign-up-form">
    <form @submit.prevent="onSignUp">
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
          <pv-button class="w-full" severity="info" type="submit">{{ $t('iam.sign-up') }}</pv-button>
        </div>
        <div class="go-sign-in">
          {{ $t('iam.already') }}
          <router-link to='sign-in'>
            <a class="m-1">{{ $t('iam.sign-in') }}</a>
            <i class="pi pi-arrow-right m-1"></i>
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

.sign-up-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.go-sign-in {
  margin-top: 20px;
}

</style>