import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_TODOS = gql`
  query {
    allTodos {
      edges {
        node {
          id
          title
          description
          time
        }
      }
    }
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(ALL_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      {data.allTodos.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>{node.title}</h3>
          <p>{node.description}</p>
          <p>{node.time}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
