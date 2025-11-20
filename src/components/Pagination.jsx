import React from 'react'

export default function Pagination({page, setPage, totalPages}){
  if(totalPages <= 1) return null
  const pages = []
  for(let i=1;i<=totalPages;i++) pages.push(i)
  return (
    <nav className="pagination">
      <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
      {pages.map(p=>(
        <button key={p} className={p===page? 'active' : ''} onClick={()=>setPage(p)}>{p}</button>
      ))}
      <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
    </nav>
  )
}
