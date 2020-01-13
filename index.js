import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todo = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));
      case 'SET_VISIBILITY_FILTER':
        return todoVisibility(state, action)
      default:
        return state;
  }
};

const visibility = (state='SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return {...state}
  }
};

const todoVisibility = (state=[], action) => {
  switch(action.filter) {
    case 'SHOW_ACTIVE':
      return state.filter(todo => !todo.completed)
    case 'SHOW_COMPLETED':
      return state.filter(todo => todo.completed)
    default:
      return [...state]
  }
}

const todoApp = combineReducers({
  todos,
  visibility
});

const store = createStore(todoApp);
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Dispatching Todo',
})
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Dispatching another Todo',
})
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
})
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_ALL'
})
console.log(store.getState());