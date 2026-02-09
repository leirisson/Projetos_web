export type WebhookPayload = {
    id: string
    name: string
    email: string
}

export type WebhookResult = {
    ok: boolean
    status: number
    data?: unknown
    text?: string
}

export async function postWebhookApp(payload: WebhookPayload): Promise<WebhookResult> {
    const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
        const data = await res.json()
        return { ok: res.ok, status: res.status, data }
    }
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
}
