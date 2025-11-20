import React from 'react'

/**
 * CompanyCard with robust Contact button:
 * - Verifies common contact endpoints using HEAD requests when possible.
 * - If all candidates 404 or verification is blocked by CORS, opens a Google search:
 *     https://www.google.com/search?q=contact+site:example.com
 * - Fallback: mailto:hr@<hostname> or mailto based on company name.
 */
export default function CompanyCard({ company }) {
  const getOrigin = (website) => {
    if (!website) return null
    try {
      const u = new URL(website)
      return u.origin
    } catch (e) {
      try {
        const host = website.replace(/^https?:\/\//i, '').split('/')[0].trim()
        if (!host) return null
        return `https://${host}`
      } catch {
        return null
      }
    }
  }

  const origin = getOrigin(company.website)

  const contactCandidates = origin ? [
    `${origin}/contact`,
    `${origin}/contact-us`,
    `${origin}/contactus`,
    `${origin}/#contact`,
    `${origin}/contact-us/`,
    `${origin}/support/contact`,
  ] : []

  // Try to verify a candidate by doing a HEAD request.
  // Return the first candidate that responds with 2xx/3xx.
  const verifyCandidate = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      // When allowed by CORS, we can inspect status.
      if (res && res.ok) return true
      // treat 2xx-3xx as OK
      if (res && res.status >= 200 && res.status < 400) return true
      return false
    } catch (err) {
      // fetch threw — likely CORS or network. Signal that verification is blocked.
      throw err
    }
  }

  const fallbackSearch = (originUrl) => {
    if (!originUrl) {
      // fallback to search by company name
      const q = encodeURIComponent(`contact ${company.name}`)
      return `https://www.google.com/search?q=${q}`
    }
    try {
      const host = new URL(originUrl).hostname
      const q = encodeURIComponent(`contact site:${host}`)
      return `https://www.google.com/search?q=${q}`
    } catch {
      const q = encodeURIComponent(`contact ${company.name}`)
      return `https://www.google.com/search?q=${q}`
    }
  }

  const buildMailto = () => {
    if (company.website) {
      const hostLike = company.website.replace(/^https?:\/\//i, '').split('/')[0].trim()
      if (hostLike) return `mailto:hr@${hostLike}`
    }
    const fallbackEmail = `hr@${company.name.replace(/\s+/g, '').toLowerCase()}.com`
    return `mailto:${fallbackEmail}`
  }

  const handleContactClick = async (e) => {
    e.preventDefault()

    // If there are no origin-based candidates, open mailto or search
    if (!origin || contactCandidates.length === 0) {
      const mail = buildMailto()
      // prefer search first for discoverability (but you may prefer mailto)
      const searchUrl = fallbackSearch(origin)
      window.open(searchUrl, '_blank', 'noopener,noreferrer')
      return
    }

    // Try to verify candidates; if CORS blocks verification, open a search
    try {
      for (const c of contactCandidates) {
        try {
          const ok = await verifyCandidate(c)
          if (ok) {
            window.open(c, '_blank', 'noopener,noreferrer')
            return
          } else {
            // not OK (e.g., 404) — continue to next candidate
            continue
          }
        } catch (innerErr) {
          // verification threw — likely CORS. Use search fallback.
          const searchUrl = fallbackSearch(origin)
          window.open(searchUrl, '_blank', 'noopener,noreferrer')
          return
        }
      }

      // None of the candidates returned OK — open a search for contact page
      const searchUrl = fallbackSearch(origin)
      window.open(searchUrl, '_blank', 'noopener,noreferrer')
      return

    } catch (err) {
      // unexpected error — fallback to mailto
      const mail = buildMailto()
      window.open(mail, '_blank', 'noopener,noreferrer')
      return
    }
  }

  // Determine label (Email vs Contact)
  const contactLabel = origin ? 'Contact' : 'Email'
  const visitTitle = company.website ? `Visit ${company.name}` : `Open ${company.name}`

  return (
    <article className="card">
      <div className="card-body">
        <h3>{company.name}</h3>
        <p className="meta">{company.location} • {company.industry} • {company.size}</p>
        <p className="desc">{company.description}</p>
        <div className="card-actions">
          <a
            href={company.website || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn"
            title={visitTitle}
          >
            Visit
          </a>

          <a
            href="#contact"
            className="btn btn-outline"
            onClick={handleContactClick}
            title={`Open contact for ${company.name}`}
          >
            {contactLabel}
          </a>
        </div>
      </div>
    </article>
  )
}
