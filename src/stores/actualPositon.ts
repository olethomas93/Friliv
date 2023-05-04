import { defineStore } from "pinia";

export const useActualPositionStore = defineStore({
  id: "actualPosition",
  state: () => ({
    actualPosition:{ latitude: 0, longitude: 0,accuracy:0 },
    place: "",
    newPlace:"",
    placeNumber:0,
  }),
  getters: {},
  actions: {

    async wathPosition(){
      // this.getCoord2().then((data)=>{
      //   this.actualPosition = {latitude:data.coords.latitude,longitude:data.coords.longitude,accuracy:data.coords.accuracy}

      // })
      const data:GeolocationPosition = await this.getCoord2()
      this.actualPosition = {latitude:data.coords.latitude,longitude:data.coords.longitude,accuracy:data.coords.accuracy}
      return this.actualPosition
    },

    async getCoord2():Promise<GeolocationPosition >{
      return new Promise((res,rej)=>navigator.geolocation.watchPosition(res, rej)) 
    },


    async getActualPlace(){

    
      try{
        // https://ws.geonorge.no/stedsnavn/v1/punkt?nord=${this.position.latitude}&ost=${this.position.longitude}&koordsys=4258&radius=500&utkoordsys=4258&treffPerSide=10&side=1
        let res =  await (await fetch(`https://www.windy.northei.no/place?lat=${this.actualPosition.latitude}&lng=${this.actualPosition.longitude}`)).json();
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
