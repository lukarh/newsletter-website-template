const NewsItemMore = ({ title, description, url, urlToImage, fontSize }) => {

    return (
        <>
            <a className="news-link-alt" href={url} style={{ fontSize: fontSize }}>
                <div style={{ width: '30%' }}>
                    <img className="news-img-more-alt" src={urlToImage} alt={url} />
                </div>
                <div className="news-more-article-desc-alt">
                    <h2 className="title">{title}</h2>
                    <p className="desc">{description}</p>
                </div>
            </a>
        </>
    )
}

export default NewsItemMore