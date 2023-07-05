import { Divider } from 'primereact/divider'

const NewsItem = ({ title, description, author, url, urlToImage, isLastArticle, fontSize }) => {

    return (
        <a href={url} className="news-link" style={{ fontSize: fontSize }}>

            {
                !isLastArticle ?
                    <>
                        <img className="news-img" src={urlToImage} alt={url}/>
                        <div className="news-article-desc">
                            <h2 className="title">{title}</h2>
                            <p className="subtitle">{description}</p>
                            <p>{author}</p>
                        </div>
                        <Divider />
                    </>
                :
                    <>
                        <img className="news-img-alt" src={urlToImage} alt={url}/>
                        <div className="news-article-desc-alt">
                            <h2 className="title">{title}</h2>
                            <p className="subtitle">{description}</p>
                            <p>{author}</p>
                        </div>
                        
                    </>
            }
        </a>
    )
}

export default NewsItem;