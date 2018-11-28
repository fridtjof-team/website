<template>
  <div id="app">
    <b-navbar toggleable="md" class="nav-bar-blue">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Frisko</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/check-visa">Check Visa</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#mainBody {
  background: #F6F9FF;
  color: #42436A;


  .stf-select__container {
    .stf-select__inner-wrapper {
      background-color:   #F6F9FF;
      box-shadow: 0 0 38px 20px rgba(45,31,80,0.07);
      border-radius: 4px;
          padding: 5px 10px;
    }
  }


  .stf-select_opened {
    .stf-select__options {
      background-color: #fff;
      border: 0px solid #e2e6e8;
      -webkit-box-shadow: 0 52 66px 0 rgba(34,48,73,.2);
      box-shadow: 0 52px 66px 0 rgba(34,48,73,.2);
      padding: 5px 10px;
      border-radius: 0px 0px 3px 3px;


      .stf-select-option {
        border: none;
        border-radius: 3px;
        
        &.stf-select-option_selected {
          background-color: #2e4369;
          color: white;
          font-weight: 400;
        }
      }
    }
    .stf-select__search-input{
      input {
        height: 54px;
        font-size: 18px;
        padding: 0px 20px;
        &:focus {
          background-color: #fff;
          border: 0px solid #e2e6e8;
          border-radius: 3px 3px 0px 0px;
          -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
          box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
          outline: none;
        }
      }
    }   
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  

  .nav-bar-blue {
    padding: 10px 10%;
  }
}
</style>
