import {useState, useEffect} from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo'

// 필터 조건을 가지고있는 객체
const FILTER_MAP={
  All:()=>true,
  Done:(task)=>task.completed,
  Active:(task)=>!task.completed
};

// git hub testsfsfd


const FILTER_NAMES = Object.keys(FILTER_MAP);
// console.log(FILTER_NAMES);

// 로컬 스토리지를 동기화하는 함수
function saveDoc(tasks){
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  // 첫번째 인자는 key 값, 두번째 인자는 value 이다.
}

// 초기 할일목록 리스트
const initialTasks =JSON.parse(localStorage.getItem("tasks")||"[]");

export default function App(){
  // tasks 는 할일 목록
  const [tasks, setTasks] = useState(initialTasks);
  // 필터
  const [filter, setFilter] = useState("All");

  // 할일 목록의 변화 상태를 추적한다.
  console.log(tasks); // key state

  // 할일 목록 추가
  function addTask(name){
    const newTask={
      id:`todo-${Date.now()}`,
      name,
      completed:false
    }
    // console.log(newTask);

    // 새 할일 추가
    const updatedTasks = [...tasks, newTask];

    // 로컬스토리지 동기화
    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  }

  // 할일 삭제
  function deleteTask(id){}

  // 할일의 상태 변경
  function toggleTaskCompleted(id){}

  // 할일 업데이트
  function editTask(id, newName){}

  // 필터버튼
  const filterButtons = FILTER_NAMES.map(name=>(
    <FilterButton
      key={name}
      name={name}
      isPressed={filter===name}
      setFilter={setFilter}
    />
  ))

  // 할일 목록
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task=>(
    <Todo 
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))

  return(
    <div className="max-w-sm mx-auto mt-8 border p-8 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">할일 목록 &#128526; &#127928;</h1>

      {/* 폼 */}
      <Form addTask={addTask} />

      {/* 필터 버튼 */}
      <div className="flex flex-nowrap gap-1 mb-4">
        {filterButtons}
      </div>

      {/* 할일 목록 */}
      <h2 className="text-xl mb-4">
        <span className="font-semibold">{taskList.length}</span> 개의 할일이 있습니다.
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}
