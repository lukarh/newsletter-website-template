import NewsItemMore from "./NewsItemMore";

const NewsMore = ({ articles }) => {

    return (
        <div className='news-more-container'>
            {
                articles.map((article, index) => (
                    <NewsItemMore title={article.title} description={article.description} author={article.author}
                     url={article.url} urlToImage={article.urlToImage} fontSize={"14px"} />
                ))
            }
        </div>
    )
}

export default NewsMore;