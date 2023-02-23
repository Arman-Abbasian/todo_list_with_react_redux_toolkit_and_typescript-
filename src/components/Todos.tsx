import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../feature/hooks'
import { getAsyncTodos } from '../feature/todoSlice'
 


  const UserView = () => {
  const todo = useAppSelector(state => state.todos)
  console.log(todo.todos)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAsyncTodos())
  }, [])
  return (
    <div>
      <h2>List of Users</h2>
      {todo.loading && <div>Loading...</div>}
      {!todo.loading && todo.error ? <div>Error: {todo.error}</div> : null}
      {!todo.loading && todo.todos &&  (
        <ul>
          {todo.todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) }
    </div>
  )
}
export default UserView;