import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type Todo = {
  id: number,
    title: string,
    completed: boolean,
    dueDate:string
}
type InitialState = {
  loading: boolean
  todos: Todo[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  todos: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const getAsyncTodos=createAsyncThunk("todos/getAsyncTodos", async (payload,{rejectWithValue})=>{
  try {
    const {data}=await axios.get(`http://localhost:4000/todos`);
    return data;
  } catch (err) {
    return rejectWithValue([])
  }
});

export const addAsyncTodo=createAsyncThunk("costs/addAsyncTodo", async (payload:any,{rejectWithValue})=>{
  try {
    await axios.post(`http://localhost:4000/todos`,payload.formValues)
    const {data}=await axios.get(`http://localhost:4000/todos`)
    return data;
  } catch (error) {
    return rejectWithValue([])
  }
});
export const removeAsyncTodo=createAsyncThunk("costs/removeAsyncTodo", async (payload:any,{rejectWithValue})=>{
  try {
    await axios.delete(`http://localhost:4000/todos/${payload.id}`)
    const {data}=await axios.get(`http://localhost:4000/todos`)
    return  data;
  } catch (error) {
    return rejectWithValue([])
  }
});
export const changeAsyncTodo=createAsyncThunk("costs/changeAsyncTodo", async (payload:any,{rejectWithValue})=>{
  try {
    console.log(payload)
    await axios.put(`http://localhost:4000/todos/${payload.id}`,payload.formValues);
    const {data}=await axios.get(`http://localhost:4000/expenses`)
    return  data; 
    
  } catch (error) {
    return rejectWithValue([])
  }
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAsyncTodos.pending, state => {
      state.loading = true,
      state.todos = []
        state.error = ''
    })
    builder.addCase(getAsyncTodos.fulfilled,(state,action: PayloadAction<Todo[]>|any) => {
        state.loading = false
        state.todos = action.payload
        state.error = ''
      }
    )
    builder.addCase(getAsyncTodos.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message || 'Something went wrong'
    })


    builder.addCase(addAsyncTodo.pending, state => {
      state.loading = true,
      state.todos = []
        state.error = ''
    })
    builder.addCase(addAsyncTodo.fulfilled,(state,action: PayloadAction<Todo[]>|any) => {
        state.loading = false
        state.todos = action.payload
        state.error = ''
      }
    )
    builder.addCase(addAsyncTodo.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message || 'Something went wrong'
    })


    builder.addCase(removeAsyncTodo.pending, state => {
      state.loading = true,
      state.todos = []
        state.error = ''
    })
    builder.addCase(removeAsyncTodo.fulfilled,(state,action: PayloadAction<Todo[]>|any) => {
        state.loading = false
        state.todos = action.payload
        state.error = ''
      }
    )
    builder.addCase(removeAsyncTodo.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message || 'Something went wrong'
    })


    builder.addCase(changeAsyncTodo.pending, state => {
      state.loading = true,
      state.todos = []
        state.error = ''
    })
    builder.addCase(changeAsyncTodo.fulfilled,(state,action: PayloadAction<Todo[]>|any) => {
        state.loading = false
        state.todos = action.payload
        state.error = ''
      }
    )
    builder.addCase(changeAsyncTodo.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message || 'Something went wrong'
    })
    
  }
})

export default todoSlice.reducer