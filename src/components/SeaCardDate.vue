<script setup lang="ts">
    import { usePositionStore } from "@/stores/position";
    import { onMounted, ref } from "vue";
    import { Line } from 'vue-chartjs'
    import LineChart from './LineChart.vue'
    
    const API_URL = "https://www.kartverket.no/api/vsl/tideforecast";
    const TIDE_LEVEL = "https://www.kartverket.no/api/vsl/tideLevels";
    
    const currentLevel = ref();
    const nextHighTide = ref();
    const tideForecast = ref();
    const nextLowTide = ref();
    const TideData = ref()
    const tab  = ref(0)
    const store = usePositionStore();
    
    onMounted(async () => {
      store.$subscribe((mutation, state) => {
        fetchData(state.position);
      });
      await fetchData(store.position);
    });
    
    const fetchData = async (pos: any) => {
      const url1 = `${API_URL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
      const url2 = `${TIDE_LEVEL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
      let res = await (await fetch(url1)).json();
      TideData.value = await (await fetch(url2)).json();

      
      
    tideForecast.value = parseForecast(res.result.forecasts)
      
    
    
    //   parseTideData(tideData);
    
      return true;
    };
    const parseTideData = (tideData: any) => {
      currentLevel.value = tideData.result.currentLevel.measurement.value;
    
      nextHighTide.value = handleTime(
        new Date(tideData.result.nextHighTide.dateTime)
      );
    
      nextLowTide.value = handleTime(
        new Date(tideData.result.nextLowTide.dateTime)
      );
    };

    const parseForecast =(data:any)=>{
      let tempArray=[]
      let returnObject:any={}
      
      
      let i =0;
        for(let item in data){
        

          tempArray.push(data[item])
          
          i+=1
          if(i ==4){
            
            
            returnObject[data[item].dateTime] = tempArray
            tempArray=[]
          

            i=0;
            
          }
          
            



        }
        console.log(returnObject);
        
        return returnObject

    }
    
    const handleTime = (dataD: Date) => {
      let data = new Date(dataD);
      let hrs = data.getHours();
      let mins = data.getMinutes();
      let hour = hrs.toString();
      let minute = mins.toString();
      if (hrs <= 9) hour = "0" + hrs;
      if (mins < 10) minute = "0" + mins;
      const postTime = hour + ":" + minute;
      return postTime;
    };


    
    </script>
    
    <template>
  
            <q-card flat class="cards">
              <q-card-section>
               <div v-if="tideForecast" class="container x mandatory-scroll-snapping">
                    <div class="area"  v-for="(forcast, index) in tideForecast"
        :key="forcast" :name="index">

        
      
    
               <div style="display:flex;" v-for="item in forcast" >
                <q-separator :vertical="true"  inset /> 
                <div class="content">
                   
            <img v-if="item.status=='High'" src="../assets/tideup.svg" style="width: 40%" />
            <img v-else src="../assets/tidedown.svg" style="width: 40%" />
                  <div class="values">
                   <span> {{`kl. ${handleTime(item.dateTime)}`}}</span>
                  <span>{{`${item.measurement.value} cm`}}</span>

                </div>
               
          </div>
          <q-separator :vertical="true" inset />
                
               </div>

              
               


    
                    </div>

                </div>
              
            
              </q-card-section>
            </q-card>
      
    
          
        

    </template>
    
    <style scoped>
    .cards {
     
      width: 100%;
      
     
    
      
    }
    
    .x.container .area {
  

  width: 100%;
 
}
    
    h5{
      color:#777
    }
    .container .area {
  text-align: center;
  scroll-snap-align: center;
  flex: none;
  display: flex;
    align-items: center;
    justify-content: space-around;
}
    .background{}
    .aligncolumn {
      display: flex;
      align-items: center;
      align-content: stretch;
      flex-direction: row-reverse;
    }
    .vl {
  border-left: 6px solid green;
  height: 500px;
}

    .values{

      display: flex;
      flex-direction: column;
    }

    .container {
  display: flex;
  overflow: auto;
  flex: none;
}

.x.mandatory-scroll-snapping {
  scroll-snap-type: x mandatory;
 

}

.x.mandatory-scroll-snapping::-webkit-scrollbar{
  display: none;
}

.container.x {
  width: 100%;
  
  flex-flow: row nowrap;
}
.mes{

  width: 100%;
}

.child {
  scroll-snap-align: start;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    justify-content: flex-end;
    align-content: stretch;
    flex-wrap: nowrap;
}

    
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
        align-content: center;
      
    }
    
    .widget {
      padding-top: 5%;
    }
    
    .card-body {
      font-weight: bold;
    }
    .card-title {
      font-family: sans-serif;
      font-weight: bold;
    }
    </style>
    