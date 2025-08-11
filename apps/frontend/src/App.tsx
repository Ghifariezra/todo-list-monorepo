import { useState, useCallback, useEffect } from 'react';

function App() {
	const [hello, setHello] = useState('');
	const [open, setOpen] = useState(false);
	const [check, setCheck] = useState({
		name: '',
		email: '',
		password: '',
	});

	const checkData = useCallback(async () => {
		const response = await fetch('/api/check', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		setCheck(data);
		setOpen(!open);
	}, [setCheck, setOpen, open]);

	useEffect(() => {
		fetch('/api')
			.then((response) => response.text())
			.then((data) => setHello(data));
	}, [setHello]);

	return (
		<>
			<h1>{open && hello}</h1>
			<button onClick={checkData}>Check</button>
			{open && (
				<div>
					<pre>{JSON.stringify(check, null, 2)}</pre>
				</div>
			)}
		</>
	);
}

export default App;
