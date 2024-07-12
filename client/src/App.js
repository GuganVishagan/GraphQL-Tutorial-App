import logo from './logo.svg';
import './App.css';
import {gql, useQuery} from '@apollo/client'


const query = gql`
  query Getall {
  getTasks {
    id
    title
    project {
      id
      name
      ownerId
    }
  }
}
`


function App() {

  const {loading, error, data} = useQuery(query);

  if (loading) return <h1>Loading the application.....</h1>;
  if (error) return <p>Error : {error.message}</p>;


  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
