
import react, { useState } from 'react';
import styles from './article-filter.module.scss';
import DatePicker from "react-datepicker";
import { IArticleRequest } from '../../../models/article-request-model';


type propsType = {
    onFilter: (e: IArticleRequest) => void;
}
const ArticleFilter = (props: propsType) => {
    const [fromDate, setFromDate] = useState<Date | null>();
    const [toDate, setToDate] = useState<Date | null>();
    const [query, setQuery] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const onFilter = () => {
        const filterData = {
            category,
            fromDate,
            toDate,
            query,
            source,
        } as IArticleRequest;
        props.onFilter(filterData)
    }


    return (
        <>
            <div className={styles.articleFilter}>
                <div className={styles.title}>Filters</div>
                <div className={styles.filterItems}>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Keyword</div>
                        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Source</div>
                        <input type='text' value={source} onChange={(e) => setSource(e.target.value)} />
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>Category</div>
                        <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>From date</div>
                        <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                    </div>

                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}>To date</div>
                        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                    </div>

                    <div className={styles.filterItem}>
                        <div className={styles.filterTitle}></div>
                        <button type='button' onClick={onFilter} >Search</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ArticleFilter;