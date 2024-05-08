const url = 'https://api.quotable.io/random';
let content;
let author;
const authors = [];

const getQuote = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    content = data.content;
    author = data.author;
    document.querySelector('.quote-body blockquote').innerText = content;
    document.querySelector('.quote-body span').innerHTML = author;
    authors.push(author);
}

const extractAuthors = () => {
    // Filter unique author names
    const uniqueAuthors = [...new Set(authors)];
    return uniqueAuthors;
}



const searchQuoteByAuthor = () => {
    const searchTerm = document.querySelector('#search-author').value;
    if (searchTerm) {
        const searchUrl = `https://api.quotable.io/random?author=${searchTerm}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                content = data.content;
                author = data.author;
                document.querySelector('.quote-body blockquote').innerText = content;
                document.querySelector('.quote-body span').innerHTML = author;
            })
            .catch(error => console.error(error));
    } else {
        alert('Please enter an author name to search');
    }
}

const showAuthors = () => {
    // Ensure that the authors array is populated before extracting authors
    getQuote(url); // This will populate the authors array before calling extractAuthors

    // Retrieve the list of unique authors
    const uniqueAuthors = extractAuthors();

    // Generate HTML content for the new page
    const authorsHTML = uniqueAuthors.map(author => `<div>${author}</div>`).join('');

    // Open a new window to display the authors
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>authors</title>
        </head>
        <body>
            <h1>Helps you to remember the famous authors</h1>
            <p style = "font-weight : bold; color : blue;">generate as more quotes you want by clicking on the new quote the new authors will be displayed here </p>
            ${authorsHTML}
        </body>
        </html>
    `);
}

getQuote(url); // Ensure that the initial quote is fetched when the page loads

// Event listeners for various buttons
document.querySelector('#new-quote').addEventListener('click', getQuote.bind(null, url));
document.querySelector('#search-btn').addEventListener('click', searchQuoteByAuthor);
document.querySelector('#show-authors').addEventListener('click', showAuthors);
