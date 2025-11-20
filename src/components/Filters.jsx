import React from 'react'

export default function Filters({
  search, setSearch,
  locations, location, setLocation,
  industries, industry, setIndustry,
  sort, setSort
}){
  return (
    <section className="filters">
      <div className="row">
        <input placeholder="Search by name or description..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={location} onChange={e=>setLocation(e.target.value)}>
          {locations.map(l=> <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={industry} onChange={e=>setIndustry(e.target.value)}>
          {industries.map(i=> <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="name_asc">Sort: Name (A → Z)</option>
          <option value="name_desc">Sort: Name (Z → A)</option>
        </select>
      </div>
    </section>
  )
}
