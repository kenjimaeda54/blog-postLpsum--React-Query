import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const handleDelete = useMutation((postId) => deletePost(postId));

  // replace with useQuery
  const { data, isError, isLoading, error } = useQuery(
    //se nao fizer assim o react nao vai atualizar o post
    //porque esta vindo uma lista aqui e so tera uma chave no react query
    ["comments", post.id],
    //quando passar props precisa envolver em () => { return { ...props } }
    () => fetchComments(post.id),
    {
      staleTime: 2000,
    }
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.toString()}</h1>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => handleDelete.mutate(post.id)}>Deletar post</button>
      {handleDelete.isLoading && <span>Deletando...</span>}
      {handleDelete.isError && <span>Erro ao deletar o post</span>}
      {handleDelete.isSuccess && <span>Post deletado</span>}
      <button> Update file</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
