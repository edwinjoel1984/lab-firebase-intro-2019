import React, { useEffect, useState } from 'react'
import { memeRef } from '../services/firebase'

export default function () {
    let [results, setResults] = useState([])
    let [list, setList] = useState([])
    useEffect(() => {
        setResults([])
        let unsubscribe = memeRef.onSnapshot(function (snap) {
            let memes = []
            snap.forEach(function (doc) {
                memes.push(doc.data())
            })
            setResults(memes)
            setList(memes)
        })

        return unsubscribe
    }, [])
    //methods
    function makeSearch(string) {
        //console.log("perss", string)
        let regex = new RegExp(string, 'i')
        let filtered = list.filter(r => regex.test(r.tags))
        setResults(filtered)
    }
    //
    return (
        <div>
            <section className="search">
                <input
                    onKeyPress={e => {
                        if (e.key !== "Enter") return
                        makeSearch(e.target.value)
                    }}
                    id="searching" placeholder="Search for Memes you love" type="text" />
                <img src="https://blog.airtable.com/content/images/2018/04/blockIconImages-2F3zZbh6x3QMSH6WqBjMGH_search-icon.png" alt="" />
            </section>
            <section id="results" className="results">
                {results.map((r, i) => {
                    return (
                        <figure key={i}>
                            <img alt="result" src={r.link} />
                        </figure>
                    )
                })}
            </section>
        </div>

    )
}