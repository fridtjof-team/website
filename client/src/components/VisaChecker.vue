<template>
  <div>
    <b-container fluid>
        <b-row class="form-main-row">
            <b-col cols="10" offset="1">
               <b-row class="row-eq-height">
                  <b-col lg="7">
                    <b-row class="visa-check-form-row">
                      <b-col cols="10" offset="1" offset-md="0" md="12" class="my-3 p-0">
                        <h1 class="header-text text-left">Check your visa requirement.</h1>
                      </b-col>
                      <b-col cols="10" offset="1"  offset-md="0"  md="5" class="my-3 p-0">
                          <multiselect 
                          v-model="citizenshipCtryValue" 
                          placeholder="From Country" 
                          noResult="No results."
                          label="name" 
                          track-by="name" 
                          :options="countriesList" 
                          :option-height="104" 
                          :custom-label="customLabel"
                          :show-labels="false"
                          class="dropdown-select-input">
                          <template slot="singleLabel" slot-scope="props">
                            <span><flag :iso="props.option.iso" :squared="false" />  {{props.option.name}}</span>
                          </template>
                          <template slot="option" slot-scope="props">
                            <span><flag :iso="props.option.iso" :squared="false" />  {{props.option.name}}</span>
                          </template>
                          <template slot="noResult">
                            <span>No results.</span>
                          </template>
                        </multiselect>
                      </b-col>
                      <b-col md="2" class="my-3 text-center p-0 d-none d-md-block">
                        <img class="mt-2" src="/static/svg/airplane.svg" alt="">
                      </b-col>
                      <b-col cols="10" offset="1" offset-md="0" md="5" class="my-3 p-0">
                        <multiselect 
                          v-model="toCtryValue" 
                          placeholder="To Country" 
                          noResult="No results."
                          label="name" 
                          track-by="name" 
                          :options="countriesList" 
                          :option-height="104" 
                          :custom-label="customLabel"
                          :show-labels="false"
                          class="dropdown-select-input">
                          <template slot="singleLabel" slot-scope="props">
                            <span><flag :iso="props.option.iso" :squared="false" />  {{props.option.name}}</span>
                            </template>
                          <template slot="option" slot-scope="props">
                            <span><flag :iso="props.option.iso" :squared="false" />  {{props.option.name}}</span>
                          </template>
                          <template slot="noResult">
                            <span>No results.</span>
                          </template>
                        </multiselect>

                      </b-col>
                    </b-row>
                    <b-row v-if="citizenshipCtryValue && toCtryValue && !apiCallMade"  class="loading-icon-row text-center">
                      <svg class="spinner mx-auto" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                      </svg>
                    </b-row>
                    <div class="card-holder">
                      <transition name="fade">
                        <b-row v-if="apiCallMade" class="visa-check-result-heading-row">
                          <b-col md="4">
                            <span class="header">Visa type</span>
                          </b-col>
                          <b-col md="4">
                            <span class="header">Duration of stay</span>
                          </b-col>
                          <b-col md="4">
                            <span class="header">More information</span>
                          </b-col>
                        </b-row>
                      </transition>
                        <transition name="fade">
                        <b-row v-if="apiCallMade" class="visa-check-result-row">
                          <b-col md="4">
                            <span class="result">{{visaType}}</span>
                          </b-col>
                          <b-col md="4">
                            <span v-if="time" class="result">{{time}}</span>
                          </b-col>
                          <b-col md="4" class="text-center">
                            <b-button v-if="source" :href="source" variant="success" class="more-info-btn" target="_blank">Learn More</b-button>
                          </b-col>
                        </b-row>
                      </transition>
                        <transition name="fade">
                        <b-row v-if="apiCallMade && notes &&notes.length > 0" class="visa-notes-row text-left"> 
                          <b-col md="10" offset-md="1">
                            <b-button variant="primary" href="#" v-b-toggle.usefulInfo>
                              ⚠️ Information <b-badge variant="light">{{notes.length}}</b-badge>
                            </b-button>
                            <b-collapse id="usefulInfo" visible accordion="useful-info-accord" role="tabpanel">
                              <b-list-group >
                                <b-list-group-item v-for="item in notes" :key="item.text" class="d-flex justify-content-between align-items-center">
                                  <span class="notes-text">{{item.text}}</span>
                                  <a v-if="item.source" :href="item.source" target="blank">
                                    <b-badge variant="primary" > Learn More </b-badge>
                                  </a>
                                </b-list-group-item>
                              </b-list-group>  
                            </b-collapse>
                          </b-col>                     
                        </b-row>
                      </transition>

                    </div>                  
                  </b-col>
                  <b-col lg="5">
                      <world-map :countryData="countryData" />
                  </b-col>
               </b-row>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import CountryService from '@/services/CountryService'
import VisaService from '@/services/VisaService'

export default {
  name: 'VisaChecker',
  components: {},
  mounted() {
    this.getCountries();
  },
  data () {
    return {
      citizenshipCtryValue:null,
      toCtryValue: null,
      time: null,
      visaType: null,
      visaID: null,
      source: null,
      notes: null,
      apiCallMade: false,
      countriesList:[],
      citizenshipCountriesList: [],
      toCountriesList: [],
      countryData:{},
      color: "green",
      selected: null,
    }
  },
  watch: {
    citizenshipCtryValue() {
      this.apiCallMade = false;
      if(this.toCtryValue){
        VisaService.fetchVisaConnectivity(this.citizenshipCtryValue.iso, this.toCtryValue.iso )
        .then(response => {
            const visaConnectivity = response.data;
            this.apiCallMade = true;
            this.time = visaConnectivity.time;
            this.visaType = visaConnectivity.visa;
            this.visaID = visaConnectivity.visa_number;
            this.source = visaConnectivity.source[0];
            this.notes = visaConnectivity.notes;
          })
          .catch(error => {
            console.log(error)
          }); 
      }
    },
    toCtryValue() {
      this.apiCallMade = false;
      if (this.citizenshipCtryValue) {
       VisaService.fetchVisaConnectivity(this.citizenshipCtryValue.iso, this.toCtryValue.iso )
       .then(response => {
            const visaConnectivity = response.data;
            this.apiCallMade = true;
            this.time = visaConnectivity.time;
            this.visaType = visaConnectivity.visa;
            this.visaID = visaConnectivity.visa_number;
            this.source = visaConnectivity.source[0];
            this.notes = visaConnectivity.notes;
            
          })
          .catch(error => {
            console.log(error)
          }); 
      }
    },
  },
  methods: {
    async getCountries () {
      const response = await CountryService.fetchCountries()
      this.toCountriesList = response.data.countries;
      this.citizenshipCountriesList = response.data.countries;
      this.countriesList = response.data.countries;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    onSearchTo(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);      
      if (userInput) {
        this.toCountriesList = this.countriesList.filter(el => el.name.indexOf(userInput) !== -1 || el.iso.indexOf(userInput) !== -1);
      } else {
        this.toCountriesList = this.countriesList;
      }
    },
    customLabel ({ name, iso }) {
      return `${name} – ${iso}`
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

h1, h2 {
  font-weight: normal;
  font-family: CatamaranBold, sans-serif;

}

.emoji-font {
  font-size: 32px;
}

.form-main-row {
  .header-text {
    font-weight: 700;
    color: #42436A

  }

  .visa-check-form-row {
    padding: 40px 20px;
    background: #F6F9FF;
    border-radius: 3px 3px 0px 0px
  }

  .loading-icon-row {
    margin: 40px 20px;

    .spinner {
      animation: rotate 2s linear infinite;
      z-index: 2;
      width: 50px;
      height: 50px;
      
      & .path {
        stroke: #42436A;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
      }
      
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  }

  .card-holder{
    -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
    box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);

    .visa-check-result-heading-row {
      background-color: #253655;
      color: white;
      padding: 20px 0px;
      .header {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .visa-check-result-row {
      background-color: #f2f5f7;
      border-bottom: 1px solid rgb(226, 230, 232);
      padding: 20px 0px;

      .result {
        font-size: 24px;
        text-transform: capitalize;
      }
      .more-info-btn {
        border-radius: 2px;
      }
    }
    .visa-check-explain-row {
      background-color: #f2f5f7;
      padding: 20px 0px;
    }
    .visa-check-progress-row {
      background-color: #f2f5f7;
      padding: 20px 0px;
      display: none;
    }
    .visa-notes-row {
      background-color: white;
      padding: 20px 0px 20px 0px;
      border-radius: 0px 0px 3px 3px;

      .notes-text {
        font-weight: 500;
      }

      .btn {
        margin-bottom: 10px;
      }
    }
  }
}


.nav-bar-blue {
  background-color: #253655;
}


.toSelector, .fromSelector {

  height: 54px;
  .flag-icon {
    width: 25px;
    height: 16px;
  }

  .country-name {
    font-size: 16px;
    margin-top: 5px;
  }

  .selector-val {
    font-size: 18px;
    line-height: 45px;
  }
}

</style>
