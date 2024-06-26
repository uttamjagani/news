const APIKEY = '9e2b8acd5bbb492bb5a18c32e86e44b3';

const Blog_container = document.getElementById('blog-container');

const searchFiled = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

const fetchRandomNews = async () => {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${APIKEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles; // Ensure correct key is accessed
    } catch (error) {
        console.log(error);
        return [];
    }
}

searchButton.addEventListener('click', async() => {
    const quary = searchFiled.value.trim()
    if (quary !== ""){
        try {
            const articals = await fetchNewsquary(quary)
            displayBox(articals)
        } catch (error) {
            console.log(error)
        }
    }
})

const fetchNewsquary = async(quary)=>{
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${quary}&apiKey=${APIKEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles; // Ensure correct key is accessed
    } catch (error) {
        console.log(error);
        return [];
    }
}

const displayBox = (articles) => {
    Blog_container.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('card');

        const img = document.createElement('img');
        img.src = article.urlToImage || 'default-image.jpg'; // Handle missing image
        img.alt = article.title;

        const title = document.createElement('h2');
        const truncTitle = article.title.length > 30
            ? article.title.slice(0, 30) + "...."
            : article.title;
        title.textContent = truncTitle;

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available'; // Handle missing description
        const truncDes = article.description.length > 120
            ? article.description.slice(0, 120) + "...."
            : article.description;
        title.textContent = truncDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank')
        })
        Blog_container.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBox(articles);
    } catch (error) {
        console.log(error);
    }
})();
