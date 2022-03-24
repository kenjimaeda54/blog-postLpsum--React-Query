# React Blog Loren
Aplicação feita em react com react query. </br>
Api usada [JSON Placeholder](https://jsonplaceholder.typicode.com/) server.

## Motivcao 
Aprender o uso das principais feature do react query. Uso de mutations,query,pre fetching

## Feature
- React query usa conceito idêntico ao Styled Component,Context API entre outros recursos do React
- Na maior hierarquia do react precisa de um provider e prover um cliente para poder realizar as requests
- As requestes são feitas usando [useQuery](https://react-query.tanstack.com/reference/useQuery#_top)
- UseQuery retorna um objeto gigante, entre eles temos a data 
- Data vai retornar todas as respostas do servidor
- Por padrão o ideal e construir um array com o valor da chave mais um id ,para as key do react query, assim garantimos que as key de cada query sera única
- As key de cada query e essencial para a lib identificar oque possivelmente esta ou não obsoleto na chamada daquele endpoint
- React query trabalha com lógica entre staleTime vs cacheTime, para verificar se existe algo no cache ou mandar para garbage collect
- Basicamente o cache de cada request e 5 minutos, se não ocorrer nenhuma chamada nas key é limpado para garbage colect
- SaleTime basicamente e o responsável por determinar qual tempo seria o ideal para novamente fazer uma nova request no servidor, por default e 0.
- Caso mantenha o default do saletime ele sempre vai realizar  refresh no http

```javascript

const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      //mantém o valor anterior
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return (
      <>
        <h1>Error</h1>
        <p>{error.toString()}</p>
     </>


```

##

- Para melhorar a experiencia nas paginacoes foi usado o prefetchQuery, assim antes de ocorrer a mudanca de paginacao armazeno no cache os dados
- Com essa abordagem sempre vou possuir no cache os dados suficientes para mostrar na tela,assim nao precisa da abordagem de loading
- Para tudo ocorrer bem e ideal usar o KeePreviosData,assim quando as chaves serem iguais ele vai manter os dados




```
  useEffect(() => {
    if (currentPage < maxPostPage) {
      let nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);
  
  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  );

```
##

- Usei os conceitos  useMutation para deletar e fazer update dos valores
- [UseMutation](https://react-query.tanstack.com/reference/useMutation#_top)  retorna um objeto gigante
- PlaceholderJson de fato não possibilita atualização dos valores então apenas foi usado para fins de didáticos 



```javascript
  const handleDelete = useMutation((postId) => deletePost(postId));
  const handleUpdate = useMutation((postId) => updatePost(postId));
  
   <button onClick={() => handleDelete.mutate(post.id)}>Deletar post</button>
   <button onClick={() => handleUpdate.mutate(post.id)}> Update file</button>


```















