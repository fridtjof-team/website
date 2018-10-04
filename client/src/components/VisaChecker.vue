<template>
  <div>
    <b-container fluid>
        <b-row class="main-row">
            <b-col md="8" offset-md="2">
                <h1 class="header-text">Check your visa requirement.</h1>
            </b-col>
        </b-row>
        <b-row class="form-main-row">
          <b-col lg="8" offset-lg="2">
            <div class="card-holder">
              <b-row class="visa-check-form-row">
                <b-col md="4">
                  <b-row>
                    <b-col cols="2">
                        <span class="emoji-font">🛂</span>
                    </b-col>
                    <b-col cols="10">
                      <stf-select v-model="citizenshipCtryValue" class="fromSelector">
                          <div class="text-left selector-val" slot="label">Your Nationality</div>
                          <div class="text-left selector-val" slot="value">
                            <div v-if="citizenshipCtryValue">
                              <span><flag :iso="citizenshipCtryValue.iso" :squared="false" />  {{citizenshipCtryValue.name}}</span>
                            </div>
                          </div>
                          <div slot="search-input">
                            <input @input="onSearchCitizenship">
                          </div>
                          <section class="options delivery_order__options">
                            <stf-select-option  
                            v-for="item of citizenshipCountriesList" :key="item.iso"
                            :value="item"
                            :class="{'stf-select-option_selected': item.iso === (citizenshipCtryValue && citizenshipCtryValue.iso)}" 
                            >
                                <span><flag :iso="item.iso"  :squared="false" /> {{item.name}}</span>
                            </stf-select-option>
                          </section>
                      </stf-select>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col md="4" >
                  <b-row>
                    <b-col cols="2">
                      <span class="emoji-font">🛬</span>
                    </b-col>
                    <b-col cols="10">
                      <stf-select v-model="toCtryValue" class="toSelector">
                          <div class="text-left selector-val" slot="label">Flying To</div>
                          <div class="text-left selector-val" slot="value">
                            <div v-if="toCtryValue">
                              <span><flag :iso="toCtryValue.iso" :squared="false" /> {{toCtryValue.name}} </span>
                            </div>
                          </div>
                          <div slot="search-input">
                            <input @input="onSearchTo">
                          </div>
                          <section class="options country_options">
                            <stf-select-option  
                            v-for="item of toCountriesList" :key="item.iso"
                            :value="item"
                            :class="{'stf-select-option_selected': item.iso === (toCtryValue && toCtryValue.iso)}" 
                            >
                                <span><flag :iso="item.iso" :squared="false" /> <span class="country-name">{{item.name}}</span> </span>
                            </stf-select-option>
                          </section>
                      </stf-select>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col md="4" >
                  <b-row>
                      <b-col cols="2">
                        <span class="emoji-font">🛫</span>
                      </b-col>
                      <b-col cols="10">
                        <stf-select v-model="fromCtryValue" class="toSelector">
                            <div class="text-left selector-val" slot="label">Flying From</div>
                            <div class="text-left selector-val" slot="value">
                              <div v-if="fromCtryValue">
                                <span><cute-flag :iso="fromCtryValue.iso"/> {{fromCtryValue.name}} </span>
                              </div>
                            </div>
                            <div slot="search-input">
                              <input @input="onSearchFrom">
                            </div>
                            <section class="options country_options">
                              <stf-select-option  
                              v-for="item of fromCountriesList" :key="item.iso"
                              :value="item"
                              :class="{'stf-select-option_selected': item.iso === (fromCtryValue && fromCtryValue.iso)}" 
                              >
                                  <span><cute-flag :iso="item.iso"/> <span class="country-name">{{item.name}}</span> </span>
                              </stf-select-option>
                            </section>
                        </stf-select>
                      </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row v-if="!apiCallMade" class="visa-check-explain-row">
                <b-col md="10" offset-md="1">
                  <h5>How to use this ❓</h5>
                  <ol class="text-left">
                    <li>Type in the name of the country that you have a passport of here <b-badge variant="dark" >🛂 Your Nationality </b-badge></li>
                    <li>Type in the name of the country you are travelling to <b-badge variant="dark" >🛬 Flying To </b-badge></li>
                    <li>(Optional) Type in the name of the country you are travelling from <b-badge variant="light" >🛫 Flying From </b-badge></li>
                  </ol>
                </b-col>
              </b-row>
              <b-row v-if="counter < 101" class="visa-check-progress-row">
                <b-col md="10" offset-md="1">
                  <b-progress :value="counter" :max="max" show-progress animated></b-progress>
                </b-col>
              </b-row>
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
              <b-row class="visa-notes-row text-left"> 
                <b-col md="10" offset-md="1" v-if="notes && notes.length > 0">
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
              <b-row>
                <b-col>

                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VisaChecker',
  components: {},
  created() {
    axios
      .get('https://api.mlab.com/api/1/databases/fridtjof/collections/country_list?apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
      .then(response => {
        this.fromCountriesList = response.data;
        this.toCountriesList = response.data;
        this.citizenshipCountriesList = response.data;
        this.countriesList = response.data;
      })
      .catch(error => {
        console.log(error)
      });
  },
  data () {
    return {
      citizenshipCtryValue:null,
      toCtryValue: null,
      fromCtryValue: null,
      time: null,
      visaType: null,
      visaID: null,
      source: null,
      notes: null,
      apiCallMade: false,
      countriesList:[],
      citizenshipCountriesList: [],
      fromCountriesList: [],
      toCountriesList:[],
      counter: 0,
      max: 100
    }
  },
  watch: {
    citizenshipCtryValue() {
      this.counter += 30;
      if(this.toCtryValue){
        axios
          .get('https://api.mlab.com/api/1/databases/fridtjof/collections/' + this.citizenshipCtryValue.iso + '?q={\"iso\": \"' + this.toCtryValue.iso + '\"}&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
          .then(response => {
            console.log(response.data[0]);
            this.apiCallMade = true;
            this.time = response.data[0].time;
            this.visaType = response.data[0].visa;
            this.visaID = response.data[0].visa_number;
            this.source = response.data[0].source[0];
            this.notes = response.data[0].notes;

          })
          .catch(error => {
            console.log(error)
          });
      }
    },
    toCtryValue() {
      this.counter += 30;
      if (this.citizenshipCtryValue) {
        axios
          .get('https://api.mlab.com/api/1/databases/fridtjof/collections/' + this.citizenshipCtryValue.iso + '?q={\"iso\": \"' + this.toCtryValue.iso + '\"}&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
          .then(response => {
            console.log(response.data[0]);
            this.apiCallMade = true;
            this.time = response.data[0].time;
            this.visaType = response.data[0].visa;
            this.visaID = response.data[0].visa_number;
            this.source = response.data[0].source[0];
            this.notes = response.data[0].notes;

          })
          .catch(error => {
            console.log(error)
          }); 
      }
       axios
        .get('https://api.mlab.com/api/1/databases/fridtjof/collections/airport_list?q={\"iso\": \"' + this.toCtryValue.iso + '\", \"size\": \"large\"}&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
        .then(response => {
          this.toAirportList = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    fromCtryValue() {
      this.counter += 40;
      axios
        .get('https://api.mlab.com/api/1/databases/fridtjof/collections/airport_list?q={\"iso\": \"' + this.fromCtryValue.iso + '\", \"size\": \"large\" }&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
        .then(response => {
          this.fromAirportList = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    onSearchCitizenship(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);  
      if (userInput) {
        this.citizenshipCountriesList = this.countriesList.filter(el => el.name.indexOf(userInput) !== -1 || el.iso.indexOf(userInput) !== -1);
      } else {
        this.citizenshipCountriesList = this.countriesList;
      }
    },
    onSearchFrom(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);  
      if (userInput) {
        this.fromCountriesList = this.countriesList.filter(el => el.name.indexOf(userInput) !== -1 || el.iso.indexOf(userInput) !== -1);
      } else {
        this.fromCountriesList = this.countriesList;
      }
    },
    onSearchTo(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);      
      if (userInput) {
        this.toCountriesList = this.countriesList.filter(el => el.name.indexOf(userInput) !== -1 || el.iso.indexOf(userInput) !== -1);
      } else {
        this.toCountriesList = this.countriesList;
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

.emoji-font {
  font-size: 32px;
}

.main-row {
  background: linear-gradient(0deg,#f2f5f7 calc(100% - 553px),#2f4469 0);

  .header-text {
    margin: 40px 0px 200px 0px;
    font-weight: 700;
    color: white;
  }
}

.form-main-row {
  .card-holder{
    -webkit-box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
    box-shadow: 0 20px 66px 0 rgba(34,48,73,.2);
    margin-top: -150px;

    .visa-check-form-row {
      padding: 40px 20px;
      background: #F6F9FF;
      border-radius: 3px 3px 0px 0px
    }

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
