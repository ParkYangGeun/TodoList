import {useState} from "react";

export default function Form({addTask}){
    // 추가할 새 할일의 이름
    const [name, setName] = useState("");

    // 제출 처리 함수
    function handleSubmit(e){
        e.preventDefault();
        
        addTask(name);

        // 할일 입력란을 비운다.
        setName("");
    }
    
    return(
        <form onSubmit={handleSubmit} className="mb-4">
            <input 
                type="text" 
                className="border p-2 w-full mb-2"
                value = {name}
                onChange ={(e)=>setName(e.target.value)}
                autoComplete="off"
            />
            <button 
                type="submit"
                className="p-1 w-full disabled:opacity-50 bg-blue-500 text-white font-semibold"
                disabled={!name.trim()} // name이 없으면 disabled 가 true 된다. trim 은 문자열 앞뒤 공백 제거
            >
            추가하기
            </button>
        </form>
    )
}