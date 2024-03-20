
import react from 'react';
import styles from './article-item.module.scss';
import { IArticleResponse } from '../../../models/article-response-model';
import moment from 'moment';


type propsType = {
    data: IArticleResponse;
}
const ArticleItem = (props: propsType) => {


    return (
        <>
            <div className={styles.articleItem}>
                <div className={styles.image}>
                    <img src={props.data.urlToImage} />
                </div>
                <div className={styles.title}>{props.data.title}</div>
                <div className={styles.date}>{moment(props.data.publishedAt).format("YYYY/MM/DD hh:mm:ss")}</div>
                <div className={styles.date}>Author: {props.data.author}</div>
                <div className={styles.date}>Source: {props.data.source}</div>
                <div className={styles.date}>Category: {props.data.category}</div>
                <div className={styles.date}>Api source: {props.data.api}</div>

            </div>
        </>
    )
}

export default ArticleItem;