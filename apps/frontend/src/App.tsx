import { useCallback, useState } from 'react';

function App() {
  const [checkData, setCheckData] = useState({
    name: '',
    age: 0
  });
	const checkServer = useCallback(async () => {
		const response = await fetch(
      '/api/test',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
		const data = await response.json();
    setCheckData(data);
	}, []);

	return (
		<div>
			<button onClick={checkServer}>Check Server</button>
      <p>{JSON.stringify(checkData)}</p>
		</div>
	);
}

export default App;
