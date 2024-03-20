import react, { useState } from 'react';
import styles from './articles.module.scss';
import ArticleItem from './article-item/article-items';
import ArticleFilter from './article-filter/article-filter';
import { IArticleRequest } from '../../models/article-request-model';
import { getArticles } from '../../api/article-api';
import { IArticleResponse } from '../../models/article-response-model';
import ArticleCustomizeFeed from './article-customize-feed/article-customize-feed';
import { IArticleFeedResponse } from '../../models/article-feed-response-model';
import { IArticleFeedRequest } from '../../models/article-feed-request-model';

const Articles = () => {

    const [articles, setArticles] = useState<IArticleResponse[]>([])
    const [visibleArticles, setVisibleArticles] = useState<IArticleResponse[]>([])

    const [loader, setLoader] = useState<boolean>(false)

    const onFilter = async (params: IArticleRequest) => {
        setLoader(true)
        try {
            const res = await getArticles(params);
            setArticles([...res])
            setVisibleArticles([...res])
            setLoader(false)
        }
        catch (e) {
            console.log(e)
            setLoader(false)
            setArticles([])
        }

    }

    const onCustomizeFeed = (data: IArticleFeedRequest) => {
        setLoader(true)
        let res: IArticleResponse[] = JSON.parse(JSON.stringify(articles));
        if (data.source && data.source != 'all') {
            res = res.filter(a => a.source?.includes(data.source))
        }
        if (data.category && data.category != 'all') {
            res = res.filter(a => a.category?.includes(data.category))
        }
        if (data.author && data.author != 'all') {
            res = res.filter(a => a.author?.includes(data.author))
        }


        setTimeout(() => {
            setLoader(false)
            setVisibleArticles([...res])
        }, 500)

    }


    return (
        <>
            <div className={styles.articles}>

                <ArticleFilter onFilter={onFilter} />



                {
                    articles.length > 0 ? (
                        <ArticleCustomizeFeed articles={articles} onCustomizeFeed={onCustomizeFeed} />
                    ) : null
                }

                {loader ? (
                    <img className={styles.loader} src='./assets/loader.gif' />

                ) : null}

                <div className={styles.articleItems}>


                    {visibleArticles.map(item => {
                        return (
                            <ArticleItem key={item.url} data={item} />
                        )
                    })}

                </div>

            </div>
        </>
    )
}

export default Articles;