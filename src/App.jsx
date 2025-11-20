import React, { useEffect, useState, useMemo } from 'react'
import CompanyCard from './components/CompanyCard'
import Filters from './components/Filters'
import Pagination from './components/Pagination'

export default function App(){
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filters state
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All')
  const [industry, setIndustry] = useState('All')
  const [sort, setSort] = useState('name_asc')

  // pagination
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6

  useEffect(()=>{
    setLoading(true)
    fetch('/companies.json')
      .then(res => {
        if(!res.ok) throw new Error('Failed to load companies.json')
        return res.json()
      })
      .then(data => {
        setCompanies(data)
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  },[])

  // derive filter options
  const locations = useMemo(()=>['All', ...Array.from(new Set(companies.map(c=>c.location)))], [companies])
  const industries = useMemo(()=>['All', ...Array.from(new Set(companies.map(c=>c.industry)))], [companies])

  const filtered = useMemo(()=>{
    let list = companies.slice()
    if(search.trim()){
      const q = search.toLowerCase()
      list = list.filter(c => c.name.toLowerCase().includes(q) || (c.description && c.description.toLowerCase().includes(q)))
    }
    if(location !== 'All') list = list.filter(c=>c.location === location)
    if(industry !== 'All') list = list.filter(c=>c.industry === industry)

    // sort
    if(sort === 'name_asc') list.sort((a,b)=>a.name.localeCompare(b.name))
    if(sort === 'name_desc') list.sort((a,b)=>b.name.localeCompare(a.name))
    return list
  },[companies, search, location, industry, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  useEffect(()=>{ if(page>totalPages) setPage(1) },[totalPages])

  const paginated = useMemo(()=>{
    const start = (page-1)*PAGE_SIZE
    return filtered.slice(start, start+PAGE_SIZE)
  },[filtered, page])

  if(loading) return <div className="center"><h2>Loading companies...</h2></div>
  if(error) return <div className="center error"><h2>Error: {error}</h2></div>

  return (
    <div className="container">
      <header>
        <h1>Companies Directory</h1>
    
      </header>

      <Filters
        search={search} setSearch={setSearch}
        locations={locations} location={location} setLocation={setLocation}
        industries={industries} industry={industry} setIndustry={setIndustry}
        sort={sort} setSort={setSort}
      />

      <main>
        {filtered.length === 0 ? (
          <div className="center"><p>No companies match the selected filters.</p></div>
        ) : (
          <div className="grid">
            {paginated.map(c => <CompanyCard key={c.id} company={c} />)}
          </div>
        )}
      </main>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <footer>
        <small>Company Directories</small>
      </footer>
    </div>
  )
}
