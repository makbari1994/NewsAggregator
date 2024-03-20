
import react, { useEffect, useState } from 'react';
import styles from './article-customize-feed.module.scss';
import { IArticleFeedRequest } from '../../../models/article-feed-request-model';
import { IArticleResponse } from '../../../models/article-response-model';
import { getFeedInfo } from '../../../utils/article-utils';
import { IArticleFeedResponse } from '../../../models/article-feed-response-model';


type propsType = {
    onCustomizeFeed: (e: IArticleFeedRequest) => void;
    articles: IArticleResponse[]
}

const ArticleCustomizeFeed = (props: propsType) => {

    const [source, setSource] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [feedsInfo, setFeedsInfo] = useState<IArticleFeedResponse>();


    useEffect(() => {
        const res = getFeedInfo(props.articles);
        setFeedsInfo({ ...res })
    }, [props.articles])


    const onCustomize = () => {
        const filterData = {
            category,
            source,
            author
        } as IArticleFeedRequest;
        props.onCustomizeFeed(filterData)
    }

    return (
        <>
            <div className={styles.articleCustomizeFeed}>
                <div className={styles.title}>Customize feed</div>
                <div className={styles.filterItems}>

                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Source</div>
                        <select value={source} onChange={(e) => setSource(e.target.value)} >
                            <option key='all' value={'all'}>All</option>

                            {feedsInfo?.sourceList.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Category</div>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} >
                            <option key='all' value={'all'}>All</option>
                            {feedsInfo?.categoryList.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Author</div>
                        <select value={author} onChange={(e) => setAuthor(e.target.value)} >
                            <option key='all' value={'all'}>All</option>

                            {feedsInfo?.authorList.map(item => {
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}></div>
                        <button type='button' onClick={onCustomize} >Customize</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ArticleCustomizeFeed;