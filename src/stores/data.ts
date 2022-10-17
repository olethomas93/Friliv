import { defineStore } from "pinia";
import { usePositionStore } from "@/stores/position";

export const useDataStore = defineStore({
    
  id: "sea",
  state: () => ({
    seaData:{}
  }),
  getters: {





  },
  actions: {

    async getSeaData(pos:any){




    }
 
  },
  
});