async function getData(searchQuery) {
  if (prevSearchQuery !== searchQuery) {
    prevSearchQuery = searchQuery;
    options.page = 1;
  }

  let response;

  try {
    response = await axios.get(
      `https://pixabay.com/api/?key=${options.key}&q=${searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${options.page}&per_page=${options.per_page}`
    );
  } catch {
    Notify.failure('Urgent. Lyolik, vse propalo!!!', {
      position: 'center-top',
      distance: '70px',
      timeout: 5000,
    });
    // const error = new Error('Urgent. Lyolik, vse propalo!!!');
    // console.dir(error.message);
  }

  options.page += 1;
  console.log(response);
  return response;
}
