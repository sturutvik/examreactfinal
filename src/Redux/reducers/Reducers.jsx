const initialState = {
    roomItems: [],
}

const Reducers = (state = initialState,action) =>{
     switch(action.type){
          case "AddData" : {
              return {
                  ...state, roomItems : [...state.roomItems,action.payload]
              }
          }
          case "DeleteData" : {
              return {
                  ...state, roomItems : state.roomItems.filter(
                      (i,index) => index !== action.payload
                  )
              }
          }
          case "UpdateData" : {
               return {
                  ...state, roomItems: state.roomItems.map((i,index)=>
                      index === action.payload.id ? action.payload : i
                  ),
               };
          }
          default : 
            return state
     }
     
}

export default Reducers;