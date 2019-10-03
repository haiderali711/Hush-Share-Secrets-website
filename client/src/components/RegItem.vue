<template>
    <b-form id="reg" @submit="onSubmit" @reset="onReset" v-if="show">
    <h4>Register</h4>
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-alert v-model="invalidEmail" variant="danger" dismissible>
          Email already registered!
      </b-alert>
      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" pill variant="outline-secondary">Register</b-button>
      <b-button type="reset" pill variant="outline-danger">Reset</b-button>
    </b-form>
</template>

<script>

import { Api } from '@/Api';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      valid: true,
      show: true,
      invalidEmail: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var newUser = this.form;
      console.log(newUser);
      Api.post('/users', newUser)
        .then(response => {
          if (response.data.emailAready == true) {
            this.invalidEmail = true;
            // alert(JSON.stringify(response.data))
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.password = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }

  }
};
</script>

<style>
#reg {
  text-align: left;
}
</style>
