import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/contentWrapper'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/movieCard'
import './style.css'


function SearchResult() {

    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(1)

    const { query } = useParams()

    const fetchInitialData = () => {
        setLoading(true)
        FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => setData(res))

        setPageNum((prev) => prev + 1)
        setLoading(false)
    }

    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])

    const fetchNextPageData = () => {
        FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...res.results]
                    })
                }
                else {
                    setData(res)
                }
            })
        setPageNum((prev) => prev + 1)
    }


    return (
        <div className='searchResultsPage min-vh-100'>
            {
                loading && <Spinner initial={true} />
            }
            {
                !loading && (
                    <ContentWrapper>
                        {
                            data?.results.length > 0 ?
                                <>
                                    <div className="pageTitle mb-3 text-white">
                                        {`Search ${data?.totalresults > 1 ? 'results' : 'result'}
                                         of '${query}'
                                        `}
                                    </div>
                                    <InfiniteScroll
                                        className='content'
                                        dataLength={data?.results?.length || []}
                                        next={fetchNextPageData}
                                        hasMore={pageNum <= data?.total_pages}
                                        loader={<Spinner />}
                                    >
                                        {data?.results.map((item, index) => {
                                            if (item.media_type === 'person') return;
                                            return (
                                                <MovieCard key={index} data={item} fromSearch={true} />
                                            )
                                        })}
                                    </InfiniteScroll>
                                </>
                                :
                                <span className='resultNotFound text-muted'>
                                    Sorry, Results not found
                                </span>
                        }
                    </ContentWrapper>
                )
            }
        </div>
    )
}

export default SearchResult