module.exports = async (req, res) => {
    const params = new URLSearchParams(req.query)
    const visitorIp = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()
    if (visitorIp && !params.has('ipAddress') && !params.has('domain')) params.set('ipAddress', visitorIp)
    params.set('apiKey', process.env.IPIFY_API_KEY)
    const upstream = await fetch(`https://geo.ipify.org/api/v2/country,city?${params}`)
    res.status(upstream.status).json(await upstream.json())
}