<template>
  <b-form id="reg" @submit="onSubmit" @reset="onReset" v-if="show">
    <h4>Login</h4>
    <b-form-group id="input-group-1" label="Email" label-for="input-1">
      <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Enter email" ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password" label-for="input-2">
      <b-form-input id="input-2" type="password" v-model="form.password" required placeholder="Password"></b-form-input>
    </b-form-group>

    <b-button type="submit" pill variant="outline-secondary">Login</b-button>
    <b-button type="reset" pill variant="outline-danger">Reset</b-button>
  </b-form>
</template>

<script>
import {
  Api
} from '@/Api'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      var newUser = this.form

      console.log(JSON.stringify(newUser))
      Api.post('/users/login/', newUser)
        .then(response => {
          this.$emit('signedIn', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }

}

</script>

<style>
  #reg {
    text-align: left;
  }
</style>
