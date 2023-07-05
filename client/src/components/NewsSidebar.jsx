import NewsItem from "./NewsItem"

const NewsSidebar = ({ articles }) => {

    return (
        <div className="news-sidebar-container">
            {
                articles.map((article, index) => (
                    (index !== articles.length - 1) ? 
                    <>
                        <NewsItem title={article.title} description={article.description} author={article.author}
                        url={article.url} urlToImage={article.urlToImage} isLastArticle={false} fontSize={"14px"} />
                    </>
                    :
                    <>
                        <NewsItem title={article.title} description={article.description} author={article.author}
                        url={article.url} urlToImage={article.urlToImage} isLastArticle={true} fontSize={"14px"} />
                    </>
                ))
            }
        </div>
    )
}

export default NewsSidebar;