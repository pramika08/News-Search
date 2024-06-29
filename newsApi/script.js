const apiKey="bbdf406fb7aa4f35adb2f13464519599";

 const blogcontainer=document.getElementById("blog-container")
 const searchField=document.getElementById('search-input')
 const searchButton=document.getElementById('search-button')

 async function randomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response =await fetch(apiUrl)
        const data=await response.json();
        return data.articles
    }
    catch(error){
        console.error("Error fetching random news",error)
        return []
    }
  } 

  async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response =await fetch(apiUrl)
        const data=await response.json();
        return data.articles
    }
    catch(error){
        console.error("Error fetching news by query",error)
        return [];
    }
  }

  searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim()
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("error fetching news by query",error)
        }
    }
  });

 

  function displayBlogs(articles){
    blogcontainer.innerHTML=""
    articles.forEach((article)=>{
        const blogCard=document.createElement("div")
        blogCard.classList.add("blog-card")
        const img=document.createElement("img")
        img.src = article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const truncatedTitle=article.title.length>30?article.title.slice(0,30)+"....":article.title;
        title.textContent=truncatedTitle;
        const description =document.createElement("p")
        const truncatedDes=article.description && article.description.length>150?article.description.slice(0,120)+"....":article.description;
        description.textContent=truncatedDes;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogcontainer.appendChild(blogCard)
    })
  }

  (async ()=>{
    try{
            const articles= await randomNews();
            displayBlogs(articles)
    }catch(error)
    {
        console.error("Error fetching random news",error)
    }
  })();