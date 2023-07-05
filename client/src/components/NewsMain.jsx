import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import NewsItem from "./NewsItem";

const NewsMain = ({ article }) => {

    return (
        <div className="news-main-container">
            <NewsItem title={article.title} description={article.description} author={article.author}
             url={article.url} urlToImage={article.urlToImage} fontSize={"16px"}/>
            <div className="news-subscribe-container">
                <div className="news-subscribe-content"> 
                    <h3 style={{ marginBottom: "10px" }}>Want to keep up to date with new content?</h3>
                    <p style={{ marginBottom: "10px" }}>Feel free to sign-up to the newsletter and get them sent to your inbox!</p>
                    {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "70%", height: "15%" }}> */}
                        <Button className="news-btn" label="Sign me up" />
                        {/* <InputText style={{ width: "80%" }} /> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default NewsMain;