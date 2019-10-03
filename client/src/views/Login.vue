<template>
  <div>
    <b-jumbotron >
      <b-container >
        <b-row align-h="end" align-v="center" class="mt-5">
          <b-col cols="5" >
            <b-card class="p-2">
              <LoginItem/>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import { Api } from '@/Api';
import LoginItem from '@/components/LoginItem';

export default {
  name: 'home',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error;
        });
    }
  },
  components: {
    LoginItem
  }
};
</script>

<style>
  .p-1 {
    padding-right: 5rem;
  }
</style>
