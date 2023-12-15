import React, { useEffect, useState } from "react";

const endpoint="https://playground.4geeks.com/apis/fake/todos/user/hector27gab";

const Home = () => {
	
	const [tasksData, setTasksData] = useState([]);
	const [myNewTask, setMyNewTask] = useState("");

	const getTasks = async() => {
		try{
			const response = await fetch(endpoint);
			const task = await response.json();
			console.log(task);
			setTasksData(task);
		}catch(error){
			console.log(error,"ERROR the task is not admited")
		}
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const response = await fetch(endpoint,{
			method: 'PUT',
			body: JSON.stringify([...tasksData, {
				done: false,
				label: myNewTask,
			}]),
			headers: {'Content-Type': 'application/json'}
		})
		getTasks();
	}
	
	const handleChange = (e) => {
		const value = e.target.value;
		setMyNewTask(value);
	}
	
	const removeTask = async (index) => {
		const deleteTask = tasksData.filter((element, indice) => indice !== index);
		const response = await fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(deleteTask),
			headers: {'Content-Type': 'application/json'}
		})
		getTasks();
	}
	
	useEffect(() => {
		getTasks();
	},[])

	return (
		<>
			<div className="container">
				<div className="row mx-1">
					<form onSubmit={(e) => handleClick (e)}>
						<h1>
							Tasks
						</h1>						
						<label className="mb-1">
							Enter your task
						</label>
						<div className="d-flex justify-content-between">
							<input className="input form-control" onChange={handleChange}/> 

							<button className="button btn btn-success" type="submit">
								<i class="fa-solid fa-pencil"></i>
							</button>
						</div>							
					</form>
					<div className="my-3">
						<ul>
							{tasksData.map((task, index) => {
								return (
								<div className="my-3 d-flex justify-content-between" key={index}> 
									{task.label}			
									<button className="redbutton btn btn-danger" onClick={() => removeTask(index)}>
										X 
									</button>
								</div>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};


export default Home;
