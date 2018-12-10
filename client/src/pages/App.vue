<template>
  <div id="app">
    <b-navbar toggleable="md" class="nav-bar-blue">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/" class="navbar-logo">Frisko<sup>BETA</sup></b-navbar-brand>

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
@import "~@/assets/sass/_colors.scss";
@import "~@/assets/sass/_typo.scss";

#mainBody {
  background: #F6F9FF;
  color: $color-dark-blue;

  .navbar-logo {
    font-family: CatamaranBold, sans-serif;
    font-size: 32px;
    color: $color-dark-blue;

    sup {
      font-size: 30%;
      top: -1.8em
    }
  }

  .dropdown-select-input {
    &.multiselect--active  {
      .multiselect__tags {
        background-color: #fff;
        border: 0px solid #e2e6e8;
        border-radius: 3px 3px 0px 0px;
        -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
        box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
        outline: none;
        .multiselect__input {
          background-color:   #fff;
        }
        &:hover {
          cursor: pointer;
        }
      }
      &.multiselect--above {
        .multiselect__tags {
          border-radius: 0px 0px 3px 3px;
           -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
          box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
          
        }
        .multiselect__content-wrapper {
          box-shadow: none;
          border-radius: 3px 3px 0px 0px;   
        }
      }
    }

    .multiselect__select {
      display: none;
    }
    .multiselect__tags {
      background-color:   #F6F9FF;
      box-shadow: 0 0 38px 20px rgba(45,31,80,0.07);
      border-radius: 4px;
      padding: 5px 10px;
      border: none;
      background: #F6F9FF; 
      min-height: calc(2.25rem + 2px); 

      .multiselect__input, .multiselect__single {
        background-color:   #F6F9FF;
        height: calc(2.25rem + 2px);
        padding: 12px;
        font-weight: 700;
        .flag-icon {
          margin: 0 10px 0 5px;
          border-radius: 3px;
          font-size: 20px;
          box-shadow: 0 0 3px 2px rgba(45,31,80,0.07);
        }
      }

      .multiselect__placeholder {
        font-size: 16px;
        position: relative;
        display: inline-block;
        height: calc(2.25rem + 2px);
        line-height: 20px;
        border: none;
        border-radius: 5px;
        padding: 12px;
        width: 100%;
        -webkit-transition: border .1s ease;
        transition: border .1s ease;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 8px;
        vertical-align: top;
      }
    }
    .multiselect__content-wrapper {
      background-color: #fff;
      border: 0px solid #e2e6e8;
      -webkit-box-shadow: 0 52 66px 0 rgba(34,48,73,.2);
      box-shadow: 0 52px 66px 0 rgba(34,48,73,.2);
      padding: 5px 10px 5px 10px;
      border-radius: 0px 0px 3px 3px;   
      .multiselect__content {
        width: 100%;
        .multiselect__element {
          font-size: 14px;
          line-height: 16px;
          box-sizing: border-box;
          cursor: pointer;
          outline: none;
          border-radius: 3px;

          .multiselect__option {
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;

            &.multiselect__option--selected {
              border-radius: 3px;
              background: #2e4369;
              color: white;
            }
            &.multiselect__option--highlight {
              border-radius: 3px;
              background-color: #F6F9FF;
              color: #495057;
            }
          }
        }
      }
    }
  }

  .dropdown-input-field {
    background-color:   #F6F9FF;
    box-shadow: 0 0 38px 20px rgba(45,31,80,0.07);
    border-radius: 4px;
    padding: 5px 10px;

    .selected-tag {
      font-weight: 700;
    }
    &.open {
      background-color: #fff;
      border: 0px solid #e2e6e8;
      border-radius: 3px 3px 0px 0px;
      -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
      box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
      outline: none;

      .selected-tag {
        display: none;
      }
    }
    
    .dropdown-toggle {
      border: none;
      .vs__actions {
        display: none;
      }
      &:after {
        display: none;
      }
    }
    .dropdown-menu {
      background-color: #fff;
      border: 0px solid #e2e6e8;
      -webkit-box-shadow: 0 52 66px 0 rgba(34,48,73,.2);
      box-shadow: 0 52px 66px 0 rgba(34,48,73,.2);
      padding: 5px 10px;
      border-radius: 0px 0px 3px 3px;

      li {
        a {
          font-size: 14px;
          line-height: 16px;
          padding: 12px 24px 12px 12px;
          box-sizing: border-box;
          cursor: pointer;
          outline: none;
          border-radius: 3px;
        }
        
      }

      .active {
        border-radius: 3px;

        a {
          background: $color-dark-blue;
          color: white;
        }
        &.highlight {
          background: #2e4369;
          color: white;
        }
      }

      .highlight {
        a {
          background: rgba(135,138,163,.1);
          color: inherit;
        }
      } 
    }
  }


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
