<template>
  <b-container fluid>
    <b-row>
      <b-col>
         <b-card class="about-us-card" title="About Us">
            <div v-for="country in countries" :key="country.id">
                  <p>
                    <span><b>{{ country.iso }}</b></span><br />
                    <span>{{ country.name }}</span>
                  </p>
            </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'About',
  data () {
    return {
      countries: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.countries = response.data.countries
    }
  }
}
</script>

<style lang="scss">
  .about-us-card {
    margin: 50px 40px;
    padding: 50px 40px;
  }
</style>
