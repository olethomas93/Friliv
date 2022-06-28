import { defineStore } from "pinia";

export const usePositionStore = defineStore({
  id: "position",
  state: () => ({
    position: { latitude: 0, longitude: 0 },
    place: "",
  }),
  getters: {},
  actions: {
    async locateMe() {
    
  const coord:GeolocationPosition  = await this.getCoord()
      
      this.position = {latitude:coord.coords.latitude,longitude:coord.coords.longitude}
      
    },

    async getCoord():Promise<GeolocationPosition >{
      return new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(res, rej)) 
    },

    setLocation(pos: any) {
      this.position = pos;
    },

   async getPlace(){

    
    

    let res =  await (await fetch(`https://ws.geonorge.no/stedsnavn/v1/punkt?nord=${this.position.latitude}&ost=${this.position.longitude}&koordsys=4258&radius=500&utkoordsys=4258&treffPerSide=10&side=1`)).json();
    this.setPLace(res.navn[0].stedsnavn[0].skrivemåte)

    
    
    },

    setPLace(place:string){

      this.place = place
    }
  },
});
