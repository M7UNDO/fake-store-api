import {useEffect, useState} from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  //Basic Fetch
  /*async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
      const data = await response.json();
      
      console.log(data);
      return data;
  }*/

  //try catch but the fetch does not throw for 404 error
  /*
  async function fetchUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }*/

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        } else {
          const data = await response.json();

          //return data;
          setUsers(data); 
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
