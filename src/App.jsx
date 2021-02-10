import React from 'react';
import shortid from 'shortid';

function App() {
	const [tarea, setTarea] = React.useState('');
	const [tareas, setTareas] = React.useState([]);
	const [modoEdicion, setModoedicion] = React.useState(false);
	const [id, setId] = React.useState('');

	const [error, setError] = React.useState(null);
	const agregarTarea = (e) => {
		e.preventDefault();
		if (!tarea.trim()) {
			setError('campos vacios');
			return;
		}

		setTareas([
			...tareas,
			{
				id: shortid.generate(),
				tarea,
			},
		]);
		setTarea('');
		setError(null);
	};
	// sirve para eliminar; excluye  los id que no son iguales//
	const eliminarTarea = (id) => {
		const arrayFiltrado = tareas.filter((item) => item.id !== id);

		setTareas(arrayFiltrado);
	};

	const editar = (item) => {
		setModoedicion(true);
		setTarea(item.tarea);
		setId(item.id);
	};

	const editarTarea = (e) => {
		e.preventDefault();
		if (!tarea.trim()) {
			console.log('Elemento vacio');
			setError('Elemento vacio');
			setTarea('');

			return;
		}

		const arrayEditado = tareas.map((item) => (item.id === id ? { id, tarea } : item));
		setTareas(arrayEditado);
		setModoedicion(false);
		setTarea('');
		setId('');
		setError(null);
	};
	return (
		<div className="container mty-5">
			<h1 className="text-center ">Crud simple</h1>

			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de tareas</h4>

					<ul className="list-group">
						{tareas.length === 0 ? (
							<li className="list-group-item">No hay tareas</li>
						) : (
							tareas.map((item) => (
								<li className="list-group-item" key={item.id}>
									<span className="lead">{item.tarea}</span>

									<button
										className="btn btn-danger btn-sm align-right mx-2"
										onClick={() => eliminarTarea(item.id)}>
										Eliminar
									</button>
									<button
										className="btn btn-warning btn-sm align-right"
										onClick={() => editar(item)}>
										Editar
									</button>
								</li>
							))
						)}
					</ul>
				</div>

				<div className="col-4">
					<h4 className="text-center">
						{modoEdicion ? 'Editar tarea ' : 'agregar tarea'}
					</h4>

					<form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
						{error ? <span className="text-danger">{error}</span> : null}

						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese tarea"
							onChange={(e) => setTarea(e.target.value)}
							value={tarea}
						/>
						{modoEdicion ? (
							<button type="submit" className="btn btn-warning block">
								Editar
							</button>
						) : (
							<button type="submit" className="btn btn-dark block">
								Agregar
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
