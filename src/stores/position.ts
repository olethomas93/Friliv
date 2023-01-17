import { defineStore } from "pinia";

export const usePositionStore = defineStore({
  id: "position",
  state: () => ({
    position: { latitude: 0, longitude: 0 },
    newPosition:{ latitude: 0, longitude: 0 },
    place: "",
    placeNumber:0
  }),
  getters: {},
  actions: {
    async locateMe() {
    

      try{
        const coord:GeolocationPosition = await this.getCoord()
        this.position = {latitude:coord.coords.latitude,longitude:coord.coords.longitude}

      } catch (e){


        console.log(e);
        

      }

     
      
      
     
      
    },

    async getCoord():Promise<GeolocationPosition >{
      return new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(res, rej)) 
    },

    setLocation(pos: any) {
      this.position = pos;
    },

    setNewLocation(pos:any){
this.newPosition = pos
    },

   async getPlace(){

    
    try{
      // https://ws.geonorge.no/stedsnavn/v1/punkt?nord=${this.position.latitude}&ost=${this.position.longitude}&koordsys=4258&radius=500&utkoordsys=4258&treffPerSide=10&side=1
      let res =  await (await fetch(`https://www.windy.northei.no/place?lat=${this.position.latitude}&lng=${this.position.longitude}`)).json();
      this.setPLace(res._embedded.location[0].name)
      this.setPlaceNumber(res._embedded.location[0].id)

    }catch (e){
console.log(e)

    }

   

    
    
    },

    setPLace(place:string){

      this.place = place
    },

    setPlaceNumber(numbr:number){
this.placeNumber = numbr

    }
  },
});
