<template>
  <div>
    <b-container fluid>
        <b-row class="main-row">
            <b-col md="8" offset-md="2">
                <h1 class="header-text">Check flights.</h1>
            </b-col>
        </b-row>
        <b-row class="form-main-row">
          <b-col lg="8" offset-lg="2">
            <div class="card-holder">
              <b-row class="flight-check-form-row">
                <b-col md="6" >
                  <b-row>
                      <b-col cols="2">
                        <span class="emoji-font">📍</span>
                      </b-col>
                      <b-col cols="10">
                        <stf-select v-model="fromCtryValue" class="toSelector">
                            <div class="text-left selector-val" slot="label">Flying From (Country)</div>
                            <div class="text-left selector-val" slot="value">
                              <div v-if="fromCtryValue">
                                <span><flag :iso="fromCtryValue.iso" :squared="false" /> {{fromCtryValue.name}} </span>
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
                                  <span><flag :iso="item.iso" :squared="false" /> <span class="country-name">{{item.name}}</span> </span>
                              </stf-select-option>
                            </section>
                        </stf-select>
                      </b-col>
                  </b-row>
                </b-col>
                <b-col md="6" >
                  <b-row>
                    <b-col cols="2">
                      <span class="emoji-font">🏖️</span>
                    </b-col>
                    <b-col cols="10">
                        <stf-select v-model="toCtryValue" class="toSelector">
                            <div class="text-left selector-val" slot="label">Flying To (Country)</div>
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
              </b-row>
               <b-row class="flight-check-airport-form-row">
                <b-col md="6" >
                  <b-row>
                      <b-col cols="2">
                        <span class="emoji-font">🛫</span>
                      </b-col>
                      <b-col cols="10">
                        <stf-select v-model="fromAirportValue" class="toSelector">
                            <div class="text-left selector-val" slot="label">Departing At</div>
                            <div class="text-left selector-val" slot="value">
                              <div v-if="fromAirportValue">
                                <span>{{fromAirportValue.iata}} <span class="airport-name">{{fromAirportValue.name}}</span></span>
                              </div>
                            </div>
                            <div slot="search-input">
                              <input @input="onSearchFromAirport">
                            </div>
                            <section class="options country_options">
                              <stf-select-option  
                              v-for="item of fromAirportListToShow" :key="item.iata"
                              :value="item"
                              :class="{'stf-select-option_selected': item.iata === (fromAirportValue && fromAirportValue.iata)}" 
                              >
                                  <span> <span class="country-name">{{item.name}}</span> </span>
                              </stf-select-option>
                            </section>
                        </stf-select>
                      </b-col>
                  </b-row>
                </b-col>
                <b-col md="6" >
                  <b-row>
                    <b-col cols="2">
                      <span class="emoji-font">🛬</span>
                    </b-col>
                    <b-col cols="10">
                      <stf-select v-model="toAirportValue" class="toSelector">
                          <div class="text-left selector-val" slot="label">Arriving At</div>
                          <div class="text-left selector-val" slot="value">
                            <div v-if="toAirportValue">
                                <span>{{toAirportValue.iata}} <span class="airport-name">{{toAirportValue.name}}</span></span>
                            </div>
                          </div>
                          <div slot="search-input">
                            <input @input="onSearchToAirport">
                          </div>
                          <section class="options country_options">
                            <stf-select-option  
                            v-for="item of toAirportListToShow" :key="item.iata"
                            :value="item"
                            :class="{'stf-select-option_selected': item.iata === (toCtryValue && toCtryValue.iata)}" 
                            >
                                <span> <span class="country-name">{{item.name}}</span> </span>
                            </stf-select-option>
                          </section>
                      </stf-select>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row v-if="flightDetailsFound" class="flight-details-row">
                <b-col md="2" offset-md="1">
                  <span class="header">Origin</span>
                </b-col>
                <b-col md="2">
                  <span class="header">Departure time</span>
                </b-col>
                <b-col md="2">
                  <span class="header">Destination</span>
                </b-col>
                <b-col md="2">
                  <span class="header">Arrival time</span>
                </b-col>
                <b-col md="2">
                  <span class="header">Flight Number</span>
                </b-col>
              </b-row>
              <b-row v-if="flightDetailsFound" v-for="item in flightDetails[0].legs" :key="item.flightNumber" class="flight-details-results-row">
                  <b-col md="2" offset-md="1">
                    <span class="header">{{item.origin.airportCode}}</span>
                  </b-col>
                  <b-col md="2">
                    <span class="header">{{item.scheduledDepartureTime | moment("ddd, hA")}}</span>

                  </b-col>
                  <b-col md="2">
                    <span class="header">{{item.destination.airportCode}}</span>
                  </b-col>
                  <b-col md="2">
                    <span class="header">{{item.scheduledArrivalTime  | moment("ddd, hA")}}</span>
                  </b-col>
                  <b-col md="2">
                    <span class="header">{{item.operatingAirlineCode}} {{item.flightNumber}}</span>
                  </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { StfSelect, StfSelectOption } from 'stf-vue-select';
import axios from 'axios';

export default {
  name: 'FlightChecker',
  components: {
    StfSelect, 
    StfSelectOption
  },
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
      fromCtryValue: null,
      toCtryValue: null,
      fromAirportValue: null,
      toAirportValue: null,
      time: null,
      flightDetailsFound: false,
      flightDetails:  [
            {
                "origin": {
                    "airportCode": "SIN",
                    "airportName": "Changi",
                    "airportTerminal": "3",
                    "cityCode": "SIN",
                    "cityName": "Singapore"
                },
                "destination": {
                    "airportCode": "DXB",
                    "airportName": "Dubai International",
                    "airportTerminal": "I",
                    "cityCode": "DXB",
                    "cityName": "Dubai"
                },
                "numberOfStops": 0,
                "legs": [
                    {
                        "flightNumber": "494",
                        "operatingAirlineCode": "SQ",
                        "operatingAirlineName": "Singapore Airlines",
                        "marketingAirlineCode": "SQ",
                        "marketingAirlineName": "Singapore Airlines",
                        "isFlightRenumbered": false,
                        "isFlightRerouted": false,
                        "flightStatus": "Arrived",
                        "origin": {
                            "airportCode": "SIN",
                            "airportName": "Changi",
                            "airportTerminal": "3",
                            "cityCode": "SIN",
                            "cityName": "Singapore"
                        },
                        "destination": {
                            "airportCode": "DXB",
                            "airportName": "Dubai International",
                            "airportTerminal": "I",
                            "cityCode": "DXB",
                            "cityName": "Dubai"
                        },
                        "scheduledDepartureTime": "2018-08-15T15:10",
                        "scheduledArrivalTime": "2018-08-15T18:25",
                        "estimatedArrivalTime": "2018-08-15T18:25",
                        "actualDepartureTime": "2018-08-15T15:10",
                        "actualArrivalTime": "2018-08-15T18:26",
                        "aircraftType": "773"
                    }
                ]
            }
        ],
      countriesList:[],
      fromAirportList: [],
      fromAirportListToShow: [],
      toAirportList: [],
      toAirportListToShow: [],
      fromCountriesList: [],
      toCountriesList:[],

    }
  },
  watch: {
    toAirportValue() {
      if(this.fromAirportValue) {
        var config = {
            headers: {
              "Content-Type": "application/json",
              "apikey": "aghk73f4x5haxeby7z24d2rc",
            }
          };

        axios
        .post('https://apigw.singaporeair.com/appchallenge/api/flightroutestatus', 
        {"originAirportCode": "SIN", "destinationAirportCode": "DXB", "scheduledDepartureDate": "2018-08-15"}, 
        config)
        .then(response => {
          this.flightDetailsFound = true;
          this.flightDetails = response.data.response.flights;
        });
      }
    },
    fromAirportValue() {
      if(this.toAirportValue) {
        var config = {
              headers: {
                "Content-Type": "application/json",
                "apikey": "aghk73f4x5haxeby7z24d2rc",
              }
            };

        axios
        .post('https://apigw.singaporeair.com/appchallenge/api/flightroutestatus', 
        {"originAirportCode": "SIN", "destinationAirportCode": "DXB", "scheduledDepartureDate": "2018-08-15"}, 
        config)
        .then(response => {
          this.flightDetailsFound = true;
          this.flightDetails = response.data.response.flights;
        });

      }
    },
    toCtryValue() {
      axios
        .get('https://api.mlab.com/api/1/databases/fridtjof/collections/airport_list?q={\"iso\": \"' + this.toCtryValue.iso + '\", \"size\": \"large\"}&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
        .then(response => {
          console.log(response.data);
          this.toAirportListToShow = response.data;
          this.toAirportList = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    fromCtryValue() {
      axios
        .get('https://api.mlab.com/api/1/databases/fridtjof/collections/airport_list?q={\"iso\": \"' + this.fromCtryValue.iso + '\", \"size\": \"large\" }&apiKey=SAegfE9Mt98CqImokCAv6p9sECY7V_b1')
        .then(response => {
          this.fromAirportListToShow = response.data;
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
    onSearchFromAirport(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);      
      if (userInput) {
        this.fromAirportListToShow = this.fromAirportList.filter(el => el.name.indexOf(userInput) !== -1 || el.iata.indexOf(userInput) !== -1);
      } else {
        this.fromAirportListToShow = this.fromAirportList;
      }
    },
    onSearchToAirport(e) {
      var userInput = this.capitalizeFirstLetter(e.target.value);      
      if (userInput) {
        this.toAirportListToShow = this.toAirportList.filter(el => el.name.indexOf(userInput) !== -1 || el.iata.indexOf(userInput) !== -1);
      } else {
        this.toAirportListToShow = this.toAirportList;
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

    .flight-check-form-row {
      padding: 40px 20px;
      background: white;
    }

    .flight-check-airport-form-row {
      background-color: #f2f5f7;
      border-bottom: 1px solid rgb(226, 230, 232);
      padding: 40px 20px;
    }

    .flight-details-row {
       background-color: #253655;
      color: white;
      padding: 20px 0px;
      .header {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .flight-details-results-row {
      background-color: #fff;
      padding: 20px 0px;
      .header {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}


.nav-bar-blue {
  background-color: #253655;
}


.toSelector, .fromSelector {
  height: 45px;
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

    .airport-name {
      font-size: 12px;
      line-height: 45px;
    }
  }
}

</style>
