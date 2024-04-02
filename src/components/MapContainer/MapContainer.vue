<template>
  <div id="GDMap"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

const MAP_CENTER_COORDINATES = [116.040989, 28.685981];
const MARKER_POSITION = {
  lng: MAP_CENTER_COORDINATES[0],
  lat: MAP_CENTER_COORDINATES[1],
};

window._AMapSecurityConfig = {
  securityJsCode: "6275e73332ad4d1d52102da5a70a3ec5",
};

export default {
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  methods: {
    async initMap() {
      try {
        const { Map, LngLat } = await AMapLoader.load({
          key: "1cc85b12ec25eeb259f4cd7ccbc9c59f",
          version: "2.0",
          plugins: [], // Update with actual plugins if needed
        });

        this.map = new Map("GDMap", {
          viewMode: "3D",
          zoom: 16,
          center: new LngLat(...MAP_CENTER_COORDINATES),
        });

        this.marker = new Map.Marker({
          position: new LngLat(MARKER_POSITION.lng, MARKER_POSITION.lat),
          title: "北京",
        });

        this.map.add(this.marker);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss">
#GDMap {
  padding: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;
}
</style>
