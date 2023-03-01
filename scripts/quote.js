async function getQuote() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2c8172dc68msh62a0e487ffd7336p1d4f9fjsn9efadc4c62fe",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
    },
  };

  let response = await fetch(
    "https://quotes15.p.rapidapi.com/quotes/random/",
    options
  );

  if (response.ok) {
    let responseJson = await response.json();
    return {
      quote: responseJson.content,
      author: responseJson.originator.name,
    };
  } else {
    alert(`Error : ${response.status}`);
    return "";
  }
}

export { getQuote };
