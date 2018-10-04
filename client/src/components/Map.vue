<template>
<div class="vue-world-map">
  <MapSVG />
</div>
</template>

<script>
import chroma from 'chroma-js';
import MapSVG from './MapSVG';

export default {
  components: { Map },
  watch: {
    countryData() {
      this.renderMapCSS();
    },
  },
  props: {
    lowColor: {
      type: String,
      default: '#fde2e2',
    },
    highColor: {
      type: String,
      default: '#d83737',
    },
    countryData: {
      type: Object,
      required: true,
    },
    defaultCountryFillColor: {
      type: String,
      default: '#dadada',
    },
    countryStrokeColor: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      node: document.createElement('style'),
      chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
    };
  },
  methods: {
    // We multiply this unit by the (value of a country - min) to get the
    // decimal value to provide to the Chroma scale instance.
    getColorScaleUnit (min, max) {
        1 / (max - min)
    },
    getMaxAndMinCountryDataValues (countryData) {
        let min, max;

        Object.keys(countryData).forEach((key) => {
            if (key === 'unknown') return;

            const value = countryData[key];

            if (value < min || min === undefined) min = value;
            if (value > max || max === undefined) max = value;
        });

        return { min, max };
    },
    getBaseCss ({ defaultCountryFillColor, countryStrokeColor }) {
        `.vue-world-map .land{fill:${defaultCountryFillColor};stroke:${countryStrokeColor};}`
    },
    getDynamicMapCss (countryData, chromaScale) {
        const { min, max } = getMaxAndMinCountryDataValues(countryData);
        const colorScaleUnit = getColorScaleUnit(min, max);
        const css = [];

        Object.keys(countryData).forEach((key) => {
            if (key === 'unknown') return;

            const value = countryData[key];
            const scaleValue = colorScaleUnit * (value - min);
            const hex = chromaScale(scaleValue).hex();

            css.push(`.vue-world-map #${key} { fill: ${hex}; }`);
        });

        return css;
    },
    getCombinedCssString(baseCss, dynamicCss) {
        dynamicCss.push(baseCss);

        return dynamicCss.join(' ');
    },
    renderMapCSS() {
      const baseCss = getBaseCss(this.$props);
      const dynamicMapCss = getDynamicMapCss(this.$props.countryData, this.chromaScale);
      this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    },
  },
  mounted() {
    document.body.appendChild(this.$data.node);
    this.renderMapCSS();
  },
};
</script>

<style>
.vue-world-map {
  height: 100%;
}

#map-svg {
  height: 100%;
}
</style>
