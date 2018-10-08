<template>
<div class="vue-world-map">
  <MapSVG />
</div>
</template>

<script>
import MapSVG from './MapSVG';

export default {
  components: { MapSVG },
  watch: {
    countryData() {
      this.renderMapCSS();
    },
  },
  props: {
    countryData: {
      type: Object,
      required: true,
    },
    defaultCountryFillColor: {
      type: String,
      default: '#A981F5',
    },
    countryStrokeColor: {
      type: String,
      default: 'transparent',
    },
  },
  data() {
    return {
      node: document.createElement('style'),
    };
  },
  methods: {
    renderMapCSS() {
      this.$data.node.innerHTML = ".vue-world-map .land{fill:" + this.defaultCountryFillColor + "; stroke: " + this.countryStrokeColor + ";}";
    },
  },
  mounted() {
    document.body.appendChild(this.$data.node);
    this.renderMapCSS();
  },
};
</script>

<style lang="scss">
.vue-world-map {
  height: 100%;

  .land {
    &:hover {
      
    }
  }
}

#map-svg {
  // height: 100%;
}
</style>
